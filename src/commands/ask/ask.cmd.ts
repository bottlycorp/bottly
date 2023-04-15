import {  colors, openai } from "$core/client";
import { commands, models } from "$core/utils/config/message/command";
import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonBuilder, ButtonStyle, CacheType, Channel, CommandInteraction, CommandInteractionOption, TextChannel } from "discord.js";

export const execute: CommandExecute = async(command: CommandInteraction) => {
  const question: CommandInteractionOption<CacheType> = command.options.get(commands.ask.options.question.name["en-US"], true);
  const value: string | number | boolean | undefined = question.value;

  if (typeof value !== "string") {
    command.reply({
      embeds: [simpleEmbed(translate(command.locale, commands.ask.exec.error, {
        error: "Value is not a string"
      }), "error")], ephemeral: true
    });

    colors.error("Value is not a string");
    return;
  }

  const channel: Channel | null = await command.client.channels.fetch(command.channelId);

  if (!channel || !(channel instanceof TextChannel)) {
    command.reply({
      embeds: [simpleEmbed(translate(command.locale, commands.ask.exec.error, {
        error: "Execute the command in a text based channel"
      }), "error")], ephemeral: true
    });

    colors.error("Execute the command in a text based channel");
    return;
  }

  command.deferReply({ ephemeral: true });

  const revealButton = new ButtonBuilder()
    .setCustomId("reveal")
    .setLabel(translate(command.locale, commands.ask.exec.buttons.reveal))
    .setStyle(ButtonStyle.Primary);
  const translateButton = new ButtonBuilder()
    .setCustomId("translate")
    .setLabel(translate(command.locale, commands.ask.exec.buttons.translate))
    .setStyle(ButtonStyle.Primary);

  await openai.createChatCompletion({
    messages: [{
      content: translate(command.locale, models, {
        user: command.user.username,
        locale: command.locale,
        question: value
      }),
      role: "user"
    }],
    max_tokens: 1500,
    model: "gpt-3.5-turbo"
  }).catch((error: Error) => {
    command.editReply({
      embeds: [simpleEmbed(translate(command.locale, commands.ask.exec.error, {
        error: error.message
      }), "error")]
    });
  }).then((response) => {
    if (response) {
      command.editReply({
        embeds: [simpleEmbed(translate(command.locale, commands.ask.exec.success, {
          response: response?.data.choices[0].message?.content ?? "No response"
        }), "success")],
        components: [{ type: 1, components: [revealButton, translateButton] }]
      });
    }
  });
};