import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  MessageContextMenuCommandInteraction,
  TextChannel
} from "discord.js";
import { contexts, ask } from "$resources/messages.json";
import Context from "$core/contexts/context";
import Client from "$core/client";
import { getLang, msg } from "$core/utils/message";
import logger from "$core/utils/logger";
import { prisma } from "$core/utils/prisma";

export default class They extends Context {

  public guildOnly = true;

  public readonly context = new ContextMenuCommandBuilder()
    .setName(contexts.question.title["en-US"])
    .setDMPermission(false)
    .setNameLocalizations({ fr: contexts.question.title.fr })
    .setType(ApplicationCommandType.Message);

  public async execute(interaction: MessageContextMenuCommandInteraction) : Promise<void> {
    if (interaction.isMessageContextMenuCommand()) {
      const channel = interaction.channel;
      if (!(channel instanceof TextChannel)) return;
      await interaction.deferReply({ ephemeral: true });

      const { locale, targetMessage } = interaction;

      await interaction.editReply({ content: contexts.question.messages.success.answering[getLang(locale)] });

      const response = await Client.instance.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ content: msg(contexts.config.question[getLang(locale)], [targetMessage.content]), role: "user" }],
        max_tokens: 1500,
        temperature: 0.9
      });

      if (response.data.choices[0].message?.content) {
        logger.context(targetMessage.content);

        await prisma.stats.create({
          data: {
            type: "contextQuestion",
            guildId: interaction.guildId ?? "DM",
            userId: interaction.user.id ?? "DM"
          }
        });

        await interaction.editReply({ content: response.data.choices[0].message?.content });
        return;
      }

      await interaction.editReply({ content: ask.errors.error[getLang(locale)] });
    }
  }

}