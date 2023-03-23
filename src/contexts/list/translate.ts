import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  MessageContextMenuCommandInteraction,
  TextChannel,
  ComponentType
} from "discord.js";
import { contexts } from "$resources/messages.json";
import { SelectMenuBuilder } from "@discordjs/builders";
import { Locales } from "$core/utils/models.utils";
import Client from "$core/lient";
import { getLang } from "$core/utils/message.utils";
import Context from "$core/contexts/context";

export default class They extends Context {

  public guildOnly = true;

  public readonly context = new ContextMenuCommandBuilder()
    .setName(contexts.translate.title["en-US"])
    .setDMPermission(false)
    .setNameLocalizations({ fr: contexts.translate.title.fr })
    .setType(ApplicationCommandType.Message);

  public async execute(interaction: MessageContextMenuCommandInteraction) : Promise<void> {
    if (interaction.isMessageContextMenuCommand()) {
      const channel = interaction.channel;
      if (!(channel instanceof TextChannel)) return;

      const message = interaction.targetMessage.content;
      const options: { label: string, value: string }[] = [];

      for (const locale in Locales) {
        options.push({ label: Locales[locale].name, value: Locales[locale].longValue });
      }

      const select = new SelectMenuBuilder()
        .setCustomId("choose_language")
        .setPlaceholder(contexts.config.translate.select[getLang(interaction.locale)])
        .setOptions(options);

      await interaction.deferReply({ ephemeral: true });
      await interaction.editReply({
        components: [{ type: 1, components: [select] }]
      });

      const collector = channel.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 10000000
      });

      collector.on("collect", async(interaction) => {
        if (interaction.customId === "choose_language") {
          await interaction.deferUpdate();
          const language = interaction.values[0];

          const translated = await Client.instance.openai.createChatCompletion({
            messages: [{ content: "Translate the message \"" + message + "\" in " + language, role: "user" }],
            model: "gpt-3.5-turbo",
            max_tokens: 1500,
            temperature: 0.9
          });

          if (translated.data.choices[0].message?.content) {
            await interaction.editReply({ content: translated.data.choices[0].message.content, components: [] });
            collector.stop();
          }

          await interaction.editReply({ content: "An error occured while translating the message", components: [] });
          collector.stop();
        }
      });
    }
  }

}