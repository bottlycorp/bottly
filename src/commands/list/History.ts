import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { getRequests } from "$core/utils/Request";
import dayjs from "dayjs";
import { clearLineBreaks, limit, toString } from "$core/utils/Utils";

export default class HistoryCommand extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("history")
    .setDescription("Watch your history of questions")
    .addIntegerOption(option => option
      .setName("request")
      .setDescription("The request to view")
      .setRequired(false));

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    let request = command.options.getInteger("request", false);
    let history = await getRequests(command.user.id);

    if (!request) {
      const embed = new EmbedBuilder()
        .setTitle("History")
        .setColor("#4353fc")
        .setTimestamp()
        .setFooter({ text: command.user.tag, iconURL: command.user.avatarURL() as string })
  
      let description = "You have not asked any questions yet, use the </ask:1077289203441864805> command to ask one."
        
      if (history.length > 0) {
        description = "Here is your history of questions:\n";
  
        for (let i = 0; i < history.length; i++) {
          const question = limit(toString(history[i].question), 25, "...");
          let date = dayjs(history[i].createdAt).format("DD/MM/YYYY HH:mm:ss");
  
          description += `**${i + 1}.** [${question}](${history[i].messageLink}) - ${date}\n`;
        }
      }
      embed.setDescription(description);
  
      await command.reply({ embeds: [embed] });
    } else {
      if (request > history.length) {
        await command.reply({ content: "That request does not exist" });
        return;
      }

      let description = "Here is the question you asked:\n";
      description += `» **${toString(history[request - 1].question)}**\n\n`;

      description += `Here is the answer to your question:\n`;
      description += `» ` + clearLineBreaks(limit(toString(history[request - 1].answer), 1024, "..."));

      const embed = new EmbedBuilder()
        .setTitle("History")
        .setDescription(description)
        .setColor("#4353fc")
        .setTimestamp()
        .setFooter({ text: command.user.tag, iconURL: command.user.avatarURL() as string })
  
      await command.reply({ embeds: [embed] });
    }
  }
}