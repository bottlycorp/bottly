import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { getRequests } from "$core/utils/Request";
import { clearLineBreaks, limit, toString } from "$core/utils/Utils";
import { msg } from "$core/utils/Message";
import { simpleEmbed } from "$core/utils/Embed";
import { Lang, Request } from "$core/utils/types";

let center = "<:center:1077383962915242024>";
let left = "<:left:1077383963938660423>";
let right = "<:right:1077383961002647642>";

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

  public async execute(command: ChatInputCommandInteraction, lang: Lang) : Promise<void> {
    let request = command.options.getInteger("id", true);
    let history = await getRequests(command.user.id);

    if (request > history.length) {
      await command.reply({ embeds: [simpleEmbed("That request does not exist", "error", lang)], ephemeral: true });
      return;
    }

    let requested: Request = history[request - 1];

    let description = "Cette question a été posé le <t:" + requested.createdAt + ":F> et a été envoyé dans le salon `#" + requested.channelName + "`, du serveur `" + requested.guildName + "`.\n\n";
    description += `:grey_question:  ${history[request - 1].question}\n`;
    description += `\n:robot: ` + clearLineBreaks(limit(toString(history[request - 1].answer), 1024, "..."), 2);

    const embed = simpleEmbed(description, "normal", msg("request_title", [request], lang), {
      text: command.user.tag,
      iconURL: command.user.avatarURL() as string,
      timestamp: true
    });
  
    await command.reply({ embeds: [embed], components: [{ type: 1, components: [{
      type: 2, style: 5, label: "View the message", url: history[request - 1].messageLink
    }] }] });
  }
}