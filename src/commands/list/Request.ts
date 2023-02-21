import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { getRequests } from "$core/utils/Request";
import { clearLineBreaks, limit, toString } from "$core/utils/Utils";
import { msg } from "$core/utils/Message";
import { simpleEmbed } from "$core/utils/Embed";

let center = "<:center:1077383962915242024>";
let left = "<:left:1077383963938660423>";
let right = "<:right:1077383961002647642>";

export default class RequestCommand extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("request")
    .setDescription("Watch an specific request of your asked questions")
    .addIntegerOption(option => option
      .setName("id")
      .setDescription("The request ID to view")
      .setRequired(true));

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    let request = command.options.getInteger("id", true);
    let history = await getRequests(command.user.id);

    if (request > history.length) {
      await command.reply({ embeds: [simpleEmbed("That request does not exist", "error")], ephemeral: true });
      return;
    }

    let description = `__Question__: ${history[request - 1].question}\n`;
    description += left + center + center + center + center + center + center + center + center +  center + center + right + "\n";
    description += `\n__Answer__: ` + clearLineBreaks(limit(toString(history[request - 1].answer), 1024, "..."), 2);

    const embed = simpleEmbed(description, "normal", msg("history_title"), {
      text: command.user.tag,
      iconURL: command.user.avatarURL() as string,
      timestamp: true
    });
  
    await command.reply({ embeds: [embed], components: [{ type: 1, components: [{
      type: 2, style: 5, label: "View the message", url: history[request - 1].messageLink
    }] }] });
  }
}