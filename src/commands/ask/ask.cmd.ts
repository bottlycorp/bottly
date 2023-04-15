import {  colors, openai } from "$core/client";
import { commands, models } from "$core/utils/config/message/command";
import { translate } from "$core/utils/config/message/message.util";
import { newQuestion } from "$core/utils/data/question";
import { userExist } from "$core/utils/data/user";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonBuilder, ButtonStyle, CacheType, Channel, CommandInteraction, CommandInteractionOption, TextChannel } from "discord.js";

export const execute: CommandExecute = async(command: CommandInteraction) => {
  const question: CommandInteractionOption<CacheType> = command.options.get(commands.ask.options.question.name["en-US"], true);
  const value: string | number | boolean | undefined = question.value;
  const guild = command.guild;
  await userExist(command.user);

  if (!guild) {
    command.reply({
      embeds: [simpleEmbed(translate(command.locale, commands.ask.exec.error, {
        error: "Execute the command in a guild"
      }), "error")], ephemeral: true
    });

    colors.error("Execute the command in a guild");
    return;
  }

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

  const askedAt = new Date();
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
  }).then(async(response) => {
    if (response) {
      const repliedAt = new Date();

      command.editReply({
        embeds: [simpleEmbed(translate(command.locale, commands.ask.exec.success, {
          response: response?.data.choices[0].message?.content ?? "No response"
        }), "info")],
        components: [{ type: 1, components: [revealButton] }]
      });

      await newQuestion(command.user.id, {
        question: value,
        answer: response?.data.choices[0].message?.content ?? "No response",
        askedAt: askedAt,
        repliedAt: repliedAt,
        channel: channel,
        server: guild,
        context: "Not implemented yet",
        user: command.user
      });

      channel.createMessageComponentCollector({
        filter: (interaction) => interaction.user.id === command.user.id,
        time: 5000
      }).on("collect", async(interaction) => {
        if (interaction.customId === "reveal") {
          interaction.update({
            components: [{ type: 1, components: [revealButton.setDisabled(true)] }]
          });

          channel.send({
            embeds: [simpleEmbed(translate(command.locale, commands.ask.exec.buttons.reveal_text, {
              question: value,
              locale: command.locale,
              response: response?.data.choices[0].message?.content ?? "No response"
            }), "info", "", {
              text: command.user.username,
              icon_url: command.user.avatarURL() ?? undefined,
              timestamp: true
            })]
          });
        }
      }).on("end", () => {
        command.editReply({ components: [{ type: 1, components: [revealButton.setDisabled(true)] }] });
      });
    }
  });
};