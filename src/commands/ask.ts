import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { Command } from "../types";
import { chatWithAI } from "../utils/OpenAI";

const command : Command = {
  command: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Shows the bot's ping")
    .addStringOption(option => option.setName("question").setDescription("The question you want to ask").setRequired(true)),
  
    execute: async interaction => {
      interaction.deferReply()
      
      let question = interaction.options.get("question")?.value as string;
      let answer = await chatWithAI(question);

      const embed = new EmbedBuilder()
        .setTitle("Réponse à votre question")
        .setDescription("Q: **" + question + "**" + answer)
        .setColor("#4353fc")
        .setTimestamp()
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL()
        })

      interaction.editReply({ embeds: [embed] })
    },
    cooldown: 10
}

export default command