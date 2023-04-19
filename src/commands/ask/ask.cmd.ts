import { colors, openai } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { newQuestion } from "$core/utils/data/question";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { CacheType, CommandInteractionOption } from "discord.js";
import { ask } from "./ask.config";
import { DayJS } from "$core/utils/day-js";
import { getPrompt } from "@bottlycorp/prompts";
import { updateUser } from "$core/utils/data/user";
import { Prompts } from "@bottlycorp/prompts/build/prompt.type";
import { revealButton, usageButton } from "$core/utils/config/buttons";
import { global } from "$core/utils/config/message/command";

export const execute: CommandExecute = async(command, channel, user) => {
  const question: CommandInteractionOption<CacheType> = command.options.get(ask.config.options.prompt.name["en-US"], true);
  const context: CommandInteractionOption<CacheType> | null = command.options.get(ask.config.options.context.name["en-US"], false);
  const value: string | number | boolean | undefined = question.value;

  if (typeof value !== "string") {
    command.editReply({
      embeds: [simpleEmbed(translate(command.locale, ask.config.exec.error, { error: "Value is not a string" }), "error")]
    });

    colors.error("Value is not a string");
    return;
  }

  // define the unix day-1 timestamp
  const askedAt = DayJS().unix();
  await openai.createChatCompletion({
    messages: [
      { role: "system", content: translate(command.locale, getPrompt(context?.value as Prompts), {
        user: command.user.username
      }) },
      { role: "user", content: value }
    ],
    max_tokens: 2500,
    top_p: 0.5,
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
        components: [{ type: 1, components: [
          revealButton(command),
          usageButton(command, user)
        ] }]
      });

      await newQuestion(command.user, {
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

      await updateUser(command.user.id, { usages: { update: { usage: { decrement: 1 } } } });

      let seconds = 15;
      const interval = setInterval(() => {
        seconds--;
        command.editReply({
          components: [{ type: 1, components: [
            revealButton(command).setLabel(translate(command.locale, global.config.exec.buttons.reveal) + ` (${seconds}s)`),
            usageButton(command, user)
          ] }]
        });

        if (seconds == 0) {
          command.editReply({
            components: [{
              type: 1,
              components: [
                revealButton(command).setDisabled(true).setLabel(translate(command.locale, global.config.exec.buttons.reveal)),
                usageButton(command, user)
              ] }]
          });
          clearInterval(interval);
        }
      }, 1000);

      const collector = channel.createMessageComponentCollector({
        filter: (interaction) => interaction.user.id === command.user.id,
        time: 17000
      }).on("collect", async(interaction) => {
        if (interaction.customId === "reveal") {
          interaction.update({ components: [{ type: 1, components: [
            revealButton(command).setDisabled(true),
            usageButton(command, user)
          ] }] });

          channel.send({
            embeds: [
              simpleEmbed(translate(command.locale, global.config.exec.buttons.reveal_text, {
                question: value,
                locale: command.locale,
                response: response?.data.choices[0].message?.content ?? "No response"
              }), "info", "", {
                text: command.user.username,
                icon_url: command.user.avatarURL() ?? undefined,
                timestamp: true
              })
            ]
          });

          collector.stop("Revealed");
        }
      }).on("end", () => {
        if (collector.endReason !== "Revealed") {
          command.editReply({ components: [{ type: 1, components: [
            revealButton(command).setDisabled(true),
            usageButton(command, user)
          ] }] });

          clearInterval(interval);
        } else {
          clearInterval(interval);
          command.editReply({ components: [{ type: 1, components: [
            revealButton(command).setDisabled(true),
            usageButton(command, user)
          ] }] });
        }
      });
    }
  }).catch((error: Error) => {
    colors.error(error.message);
    command.editReply({
      embeds: [simpleEmbed(translate(command.locale, ask.config.exec.error, {
        error: error.message
      }), "error")]
    });
  });
};