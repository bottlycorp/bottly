import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { getRequests } from "$core/utils/Request";
import { limit } from "$core/utils/Utils";
import { msg } from "$core/utils/Message";
import { clearHistoryButton } from "$core/utils/Buttons";
import { simpleEmbed } from "$core/utils/Embed";

export default class HistoryCommand extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("history")
    .setNameLocalizations({
      fr: "historique",
      "en-US": "history"
    })
    .setDescription("Watch your history of questions")
    .setDescriptionLocalizations({
      fr: "Voir votre historique de questions",
      "en-US": "Watch your history of questions"
    })
    .addIntegerOption(option => option
      .setName("page")
      .setDescription("The page to view")
      .setDescriptionLocalizations({
        fr: "La page à voir"
      })
      .setRequired(false))
    .addBooleanOption(option => option
      .setName("public")
      .setDescription("Set your history as public")
      .setDescriptionLocalizations({
        fr: "Rendre le message qui affiche votre historique en public"
      })
      .setRequired(false));

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    let ephemeral = (command.options.getBoolean("public", false) ?? false) == false ? true : false;

    await command.deferReply({ ephemeral: ephemeral });
    let history = await getRequests(command.user.id);
    let pageOption = command.options.getInteger("page", false) || 1;

    let description = msg("history_empty", [], command.locale);

    if (history.length > 0) {
      description = msg("history_description", [], command.locale);

      for (let i = (pageOption - 1) * 10; i < pageOption * 10 && i < history.length; i++) {
        const question = history[i];
        description += msg("history_line", [i + 1, limit(question.question, 40, "..."), question.messageLink, question.createdAt], command.locale);
      }
    }

    description += msg("history_footer", [], command.locale);

    let buttons = [];
    if (history.length > 0) buttons.push(clearHistoryButton);

    const embed = simpleEmbed(description, "normal", msg("history_title", [], command.locale), {
      text: `Page ${pageOption}/${Math.ceil(history.length / 10)}`,
      iconURL: command.user.avatarURL() as string,
      timestamp: true
    });

    if (buttons.length > 0) await command.editReply({ embeds: [embed], components: [{ type: 1, components: buttons }] });
    else await command.editReply({ embeds: [embed] });
  }
}