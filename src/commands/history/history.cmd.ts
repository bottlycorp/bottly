import { MAX_USE_IN_MONTH, colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { UserIncludeAll } from "$core/utils/data/user";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonStyle, CommandInteraction, TextChannel } from "discord.js";
import { history } from "./history.config";
import { simpleEmbed } from "$core/utils/embed";
import { ask } from "../ask/ask.config";
import { ButtonBuilder } from "@discordjs/builders";

export const execute: CommandExecute = async(command: CommandInteraction, channel: TextChannel, user: UserIncludeAll | null) => {

  const questions = user?.questions;

  if (questions == null) {
    command.reply({
      content: "You have no questions",
      ephemeral: true
    });

    colors.info("User has no questions");
    return;
  }

  let lines = "";
  for (let i = 0; i < questions.length; i++) {
    lines += translate(command.locale, history.config.exec.success.line, {
      index: i + 1,
      question: questions[i].question,
      timestamp: questions[i].createdAt
    });
  }

  lines += "\n" + translate(command.locale, history.config.exec.success.notPremiumLine, {
    left: 3
  }) + "\n";

  lines += translate(command.locale, history.config.exec.success.settings) + "\n";
  lines += translate(command.locale, history.config.exec.success.statsLine, {
    count: questions.length,
    total: 301
  });

  const usageButton = new ButtonBuilder()
    .setCustomId("usage")
    .setLabel(translate(command.locale, ask.config.exec.buttons.usage, {
      left: 3,
      max: MAX_USE_IN_MONTH
    }))
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true)
    .setEmoji({ name: "⛽" });

  command.reply({
    embeds: [
      simpleEmbed(lines, "info", "", {
        text: translate(command.locale, history.config.exec.success.footer, { page: 1, total: 1 }),
        icon_url: command.user.avatarURL() || undefined,
        timestamp: true
      })
    ],
    components: [{ type: 1, components: [usageButton] }],
    ephemeral: true
  });
};