import { MAX_USE_IN_MONTH, colors, openai } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { newQuestion } from "$core/utils/data/question";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonBuilder, ButtonStyle, CacheType, CommandInteraction, CommandInteractionOption, TextChannel } from "discord.js";
import { ask, models } from "./ask.config";
import { DayJS } from "$core/utils/day-js";

export const execute: CommandExecute = async(command: CommandInteraction, channel: TextChannel) => {
  const question: CommandInteractionOption<CacheType> = command.options.get(ask.config.options.question.name["en-US"], true);
  const value: string | number | boolean | undefined = question.value;

  if (typeof value !== "string") {
    command.reply({
      embeds: [simpleEmbed(translate(command.locale, ask.config.exec.error, {
        error: "Value is not a string"
      }), "error")], ephemeral: true
    });

    colors.error("Value is not a string");
    return;
  }

  command.deferReply({ ephemeral: true });

  const usageButton = new ButtonBuilder()
    .setCustomId("usage")
    .setLabel(translate(command.locale, ask.config.exec.buttons.usage, {
      left: 3,
      max: MAX_USE_IN_MONTH
    }))
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true)
    .setEmoji("⛽");
  const revealButton = new ButtonBuilder()
    .setCustomId("reveal")
    .setLabel(translate(command.locale, ask.config.exec.buttons.reveal))
    .setStyle(ButtonStyle.Primary);

  const askedAt = DayJS().unix();
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
      embeds: [simpleEmbed(translate(command.locale, ask.config.exec.error, {
        error: error.message
      }), "error")]
    });
  }).then(async(response) => {
    if (response) {
      const repliedAt = DayJS().unix();

      command.editReply({
        embeds: [simpleEmbed(translate(command.locale, ask.config.exec.success, {
          response: response?.data.choices[0].message?.content ?? "No response"
        }), "info")],
        components: [{ type: 1, components: [revealButton, usageButton] }]
      });

      await newQuestion(command.user.id, {
        data: {
          question: value,
          answer: response?.data.choices[0].message?.content ?? "No response",
          createdAt: askedAt,
          repliedAt: repliedAt,
          user: {
            connect: {
              userId: command.user.id
            }
          }
        }
      });

      const collector = channel.createMessageComponentCollector({
        filter: (interaction) => interaction.user.id === command.user.id,
        time: 5000
      }).on("collect", async(interaction) => {
        if (interaction.customId === "reveal") {
          interaction.update({
            components: [{ type: 1, components: [revealButton.setDisabled(true), usageButton] }]
          });

          channel.send({
            embeds: [
              simpleEmbed(
                translate(
                  command.locale,
                  ask.config.exec.buttons.reveal_text,
                  {
                    question: value,
                    locale: command.locale,
                    response: response?.data.choices[0].message?.content ?? "No response"
                  }
                ), "info", "", {
                  text: command.user.username,
                  icon_url: command.user.avatarURL() ?? undefined,
                  timestamp: true
                }
              )
            ]
          });

          collector.stop("Revealed");
        }
      }).on("end", () => {
        if (collector.endReason !== "Revealed") {
          command.editReply({ components: [{ type: 1, components: [revealButton.setDisabled(true), usageButton] }] });
        }
      });
    }
  });
};