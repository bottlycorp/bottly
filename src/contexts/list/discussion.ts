import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  UserContextMenuCommandInteraction,
  MessageContextMenuCommandInteraction,
  TextChannel,
  ComponentType
} from "discord.js";
import { contexts } from "$resources/messages.json";
import { getLang, msg } from "$core/utils/message";
import { simpleEmbed } from "$core/utils/embed";
import Context from "$core/contexts/context";
import Client from "$core/client";
import { SelectMenuBuilder } from "@discordjs/builders";
import logger from "$core/utils/logger";
import { prisma } from "$core/utils/prisma";

interface IMessage {
  content: string;
  username?: string;
}

export default class They extends Context {

  public guildOnly = false;

  public readonly context = new ContextMenuCommandBuilder()
    .setName(contexts.discussion.title["en-US"])
    .setDMPermission(false)
    .setNameLocalizations({ fr: contexts.discussion.title.fr })
    .setType(ApplicationCommandType.Message);

  public async execute(interaction: MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction) : Promise<void> {
    if (interaction.isMessageContextMenuCommand()) {
      const channel = interaction.channel;
      if (!(channel instanceof TextChannel)) return;

      await interaction.deferReply({ ephemeral: true });

      const { locale, user } = interaction;

      const select = new SelectMenuBuilder()
        .setCustomId("select_" + interaction.targetId)
        .setOptions([
          { label: "10 messages", value: "10" },
          { label: "20 messages", value: "20" },
          { label: "30 messages", value: "30" },
          { label: "40 messages", value: "40" },
          { label: "50 messages", value: "50" },
          { label: "60 messages", value: "60" }
        ])
        .setPlaceholder("Select a number of messages");

      const collector = channel.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 10000000
      });

      await interaction.editReply({
        components: [{ type: 1, components: [select] }]
      });

      const messages: IMessage[] = [];
      collector.on("collect", async(i) => {
        if (i.customId === "select_" + interaction.targetId) {
          await i.deferUpdate();

          const message = await channel.messages.fetch({ limit: parseInt(i.values[0]) });

          interaction.editReply({
            content: msg(contexts.discussion.messages.success.analyzing[getLang(locale)], [i.values[0]]),
            components: []
          });

          if (!message) return;

          for (const msg of message.values()) {
            if (msg.author.bot || msg.content.length === 0 || msg.system) continue;
            messages.push({ content: msg.content, username: msg.author.username });
          }

          let conver = contexts.discussion.messages.success["context-ask"][getLang(locale)];
          for (const msg of messages) {
            conver += msg.username + " : " + msg.content;
          }

          const response = await Client.instance.openai.createCompletion({
            prompt: conver,
            model: "text-davinci-003",
            max_tokens: 1500,
            temperature: 0.9
          });

          if (response.data.choices[0].text) {
            logger.context("Conversation context generated.");

            await prisma.stats.create({
              data: {
                type: "contextDiscussion",
                guildId: interaction.guildId ?? "DM",
                userId: interaction.user.id ?? "DM"
              }
            });

            await interaction.editReply(response.data.choices[0].text);
            collector.stop();
            return;
          }

          await interaction.editReply({ embeds: [simpleEmbed(contexts.discussion.messages.errors.error[getLang(locale)], "error", { f: user })] });
          collector.stop();
        }
      });
    }
  }

}