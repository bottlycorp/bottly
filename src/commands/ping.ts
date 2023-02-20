import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { Command } from "../types";

const command : Command = {
    command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot's ping")
    ,
    execute: interaction => {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: "MRC License"})
                .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
                .setColor("Blue")
            ]
        })
    },
    cooldown: 10
}

export default command