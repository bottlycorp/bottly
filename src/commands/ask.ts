import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder, CommandInteraction, CacheType } from "discord.js"
import { Command } from "../types";
import { chatWithAI } from "../utils/OpenAI";

const command : Command = {
  command: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask the GPT-3 AI a question and receive a quick and accurate answer!")
    .addStringOption(option => option.setName("question").setDescription("The question you want to ask").setRequired(true)),
  
    execute: async interaction => {
      interaction.deferReply()
      
      let question = interaction.options.get("question")?.value as string;
      let answer = await chatWithAI(question);

      const embed = new EmbedBuilder()
        .setTitle("Response to your question")
        .setDescription("Q: **" + question + "**" + answer)
        .setColor("#4353fc")
        .setTimestamp()
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL()
        })

      let buttons = [{
        type: 2,
        style: 1,
        label: "Open a thread",
        custom_id: "open_thread"
      }]
  
      if (interaction.channel?.type === ChannelType.PublicThread || interaction.channel?.type === ChannelType.PrivateThread) {
        buttons = []
        interaction.editReply({ embeds: [embed] })
      } else {
        interaction.editReply({ embeds: [embed], components: [{ type: 1, components: buttons }] })
      }
  
      interaction.client.on("interactionCreate", async (interaction : any) => {
        if (interaction.isButton()) {
          if (interaction.customId === "open_thread") {
            let channel = interaction.channel as TextChannel
            let thread = await channel.threads.create({
              name: "Thread of " + interaction.user.username,
              autoArchiveDuration: 60,
              type: ChannelType.PublicThread,
              reason: "Channel for the question:" + question
            })
  
            let close = [{
              type: 2,
              style: 4,
              label: "Close thread",
              custom_id: "close_thread"
            }]
  
            await thread.send({ embeds: [embed], components: [{ type: 1, components: close }] })
          }
        }
      })
    },
    cooldown: 10
}

export default command