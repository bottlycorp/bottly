import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { getRequests } from "$core/utils/Request";
import { clearLineBreaks, limit, toString } from "$core/utils/Utils";
import { contexts, msg } from "$core/utils/Message";
import { simpleEmbed } from "$core/utils/Embed";
import { Request } from "$core/utils/types";

export default class RequestCommand extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("request")
    .setNameLocalizations({
      fr: "requete",
      "en-US": "request"
    })
    .setDescription("Watch an specific request of your asked questions")
    .setDescriptionLocalizations({
      fr: "Voir une requête spécifique de vos questions posées",
      "en-US": "Watch an specific request of your asked questions"
    })
    .addIntegerOption(option => option
      .setName("id")
      .setDescription("The request ID to view")
      .setDescriptionLocalizations({
        fr: "L'ID de la requête à voir",
        "en-US": "The request ID to view"
      })
      .setRequired(true));

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    let request = command.options.getInteger("id", true);
    let history = await getRequests(command.user.id);

    if (request > history.length) {
      await command.reply({ embeds: [simpleEmbed("That request does not exist", "error")], ephemeral: true });
      return;
    }

    let requested: Request = history[request - 1];
    let context = contexts[parseInt(requested.options.context)];

    const embed = simpleEmbed(msg("history_request_content", [
      requested.createdAt,
      requested.channelName,
      requested.guildName,
      requested.question,
      context[command.locale] ?? context["en-US"],
      requested.options.lang ?? "Unknown",
      clearLineBreaks(limit(toString(requested.answer), 1024, "..."), 2)
    ], command.locale), "normal", msg("request_title", [
      request
    ], command.locale), {
      text: command.user.tag,
      iconURL: command.user.avatarURL() as string,
      timestamp: true
    });
  
    await command.reply({ embeds: [embed], components: [{ type: 1, components: [{
      type: 2, style: 5, label: "Go", url: requested.messageLink
    }] }] });
  }
}