import { ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Command from "$core/commands/Command";
import Client from "$core/Client";
import { ActionRowBuilder, ButtonBuilder, SlashCommandIntegerOption } from "@discordjs/builders";
import { simpleEmbed } from "$core/utils/Embed";

export default class HistoryCommand extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("conceptart")
    .setDescription("Generate a concept art image from a prompt")
      .addStringOption(new SlashCommandStringOption()
      .setName("prompt")
      .setDescription("The text to generate the image from")
      .setRequired(true))
    .addStringOption(new SlashCommandStringOption()
      .setName("size")
      .setDescription("The size of the image, default is 1024x1024")
      .setRequired(false)
      .addChoices(
        { name: "256x256", value: "256x256" },
        { name: "512x512", value: "512x512" },
        { name: "1024x1024", value: "1024x1024" },
      ))
    .addIntegerOption(new SlashCommandIntegerOption()
      .setName("views")
      .setDescription("The number of points of view to generate")
      .setRequired(false)
      .setMinValue(1)
      .setMaxValue(6));

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    await command.deferReply();
    let usageLeft = 0;

    // if (usageLeft <= 0) {
    //   command.editReply({
    //     embeds: [simpleEmbed("You have reached your limit of requests for this month, please subscribe to the Premium version of the bot to increase the limit to 500 per months", "error")]
    //   });
    //   return;
    // }

    let que = "A pencil sketch of "
    let environment = "";
    if (command.options.getString("environment", false) != null) {
      environment = `in a ${command.options.getString("environment", false)} environment`;
    }

    environment += command.options.getString("prompt", true);
    que += environment;

    if (command.options.getInteger("points_view", false) != null) {
      que += " with " + command.options.getInteger("points_view", false) + " points of view";
    }

    const response = await Client.instance.openai.createImage({
      prompt: que,
      n: 1,
      size: command.options.getString("size", false) ?? "1024x1024"
    })

    console.log(que);
    

    const row = {
      type: 1,
      components: [
        {
          type: 2,
          style: ButtonStyle.Primary,
          label: "Generate another image",
          custom_id: "imagine"
        }
      ]
    }

    if (response.data.data[0].url != null) {
      const likeButton = { type: 2, style: ButtonStyle.Secondary, disabled: true, emoji: "❤️", custom_id: "like" }
      const refreshButton = { type: 2, style: ButtonStyle.Secondary, disabled: true, emoji: "🔄", custom_id: "refresh" }
      const usagesLeft = {
        type: 2,
        style: ButtonStyle.Secondary,
        disabled: true,
        label: `⛽ 8/50 (monthly)`,
        custom_id: "usage"
      }
  
      await command.editReply({
        content: response.data.data[0].url,
        components: [{ type: 1, components: [likeButton, refreshButton, usagesLeft] }]
      });
    } else {
      await command.editReply({
        embeds: [ simpleEmbed("An error occured while generating the image, please try again later.", "error") ]
      });
    }
  }
}