import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { getRequests } from "$core/utils/Request";
import { limit, toString } from "$core/utils/Utils";
import { msg } from "$core/utils/Message";
import { Lang } from "$core/utils/types";

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
    });

  public async execute(command: ChatInputCommandInteraction, lang: Lang) : Promise<void> {
    await command.deferReply();
    let history = await getRequests(command.user.id);

    const embed = new EmbedBuilder()
      .setTitle(msg("history_title", [], lang))
      .setColor("#4353fc")
      .setTimestamp()
      .setFooter({ text: `Page 1 of ${Math.ceil(history.length / 10)}`, iconURL: command.user.avatarURL() as string })

    let description = msg("history_empty", [], lang);
        
    if (history.length > 0) {
      description = msg("history_description", [], lang);
      
      for (let i = 0; i < history.length; i++) {
        const question = limit(history[i].question, lang === "fr_FR" ? 40 : 25, "...");
  
        description += msg("history_line", [i + 1, question, history[i].messageLink, history[i].createdAt], lang);
      }
    }

    description += msg("history_footer", [], lang);
    embed.setDescription(description);
  
    await command.editReply({ embeds: [embed] });
  }
}