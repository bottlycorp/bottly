import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { simpleEmbed } from "$core/utils/Embed";

export default class LangCommand extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("lang")
    .setNameLocalizations({
      fr: "langue"
    })
    .setDescription("Change the language of the bot (user)")
    .setDescriptionLocalizations({
      fr: "Change la langue du bot (pour l'utilisateur)"
    })
    .addStringOption(option => option
      .setName("lang")
      .setNameLocalizations({
        fr: "langue"
      })
      .setDescription("The language you want to use")
      .setDescriptionLocalizations({
        fr: "La langue que vous voulez utiliser"
      })
      .setRequired(true)
      .addChoices(
        { name: "🇫🇷 French", value: "fr", name_localizations: { fr: "🇫🇷 Français" } },
        { name: "🇺🇸 English", value: "en", name_localizations: { fr: "🇺🇸 Anglais" } },
      ));

  public async execute(interaction: ChatInputCommandInteraction) {
    const lang = interaction.options.getString("lang", true);
    await interaction.reply({ embeds: [simpleEmbed("This command is not yet available", "error")], ephemeral: true });
  }
}