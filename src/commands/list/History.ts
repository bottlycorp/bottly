import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { getRequests } from "$core/utils/Request";
import { limit, toString } from "$core/utils/Utils";
import { msg } from "$core/utils/Message";

export default class HistoryCommand extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("history")
    .setDescription("Watch your history of questions");

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    let history = await getRequests(command.user.id);

    const embed = new EmbedBuilder()
      .setTitle(msg("history_title"))
      .setColor("#4353fc")
      .setTimestamp()
      .setFooter({ text: `Page 1 of ${Math.ceil(history.length / 10)}`, iconURL: command.user.avatarURL() as string })

    let description = msg("history_empty", []);
        
    if (history.length > 0) {
      description = msg("history_description")
      
      for (let i = 0; i < history.length; i++) {
        const question = limit(toString(history[i].question), 25, "...");
  
        description += msg("history_line", [i + 1, question, history[i].messageLink, history[i].createdAt])
      }
    }

    description += msg("history_footer", []);
    embed.setDescription(description);
  
    await command.reply({ embeds: [embed] });
  }
}