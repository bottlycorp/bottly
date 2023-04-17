import { MAX_USE_IN_MONTH, colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonStyle } from "discord.js";
import { history } from "./history.config";
import { simpleEmbed } from "$core/utils/embed";
import { ask } from "../ask/ask.config";
import { ButtonBuilder } from "@discordjs/builders";
import { getQuestions } from "$core/utils/data/question";
import { limitString } from "$core/utils/function";

export const execute: CommandExecute = async(command, channel, user) => {
  command.deferReply({ ephemeral: true });

  const questions = await getQuestions(command.user.id);
  const valuePage: number = command.options.getInteger(history.config.options.page.name["en-US"], false) ?? 1;
  const perPage: number = command.options.getInteger(history.config.options.per.name["en-US"], false) ?? 10;

  if (questions == null) {
    command.editReply({ content: "You have no questions" });
    colors.info("User has no questions");
    return;
  }

  let lines = "";
  for (let i = (valuePage - 1) * perPage; i < valuePage * perPage && i < questions.length; i++) {
    lines += translate(command.locale, history.config.exec.success.line, {
      index: i + 1,
      question: limitString(questions[i].question, 40),
      timestamp: questions[i].createdAt
    });
  }

  lines += "\n" + translate(command.locale, history.config.exec.success.notPremiumLine, {
    left: user?.usages?.cmdAsk ?? 0
  }) + "\n";

  lines += translate(command.locale, history.config.exec.success.settings) + "\n";
  lines += translate(command.locale, history.config.exec.success.statsLine, {
    count: 10, // TODO: Store the month count
    total: questions.length
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

  command.editReply({
    embeds: [
      simpleEmbed(lines, "info", "", {
        text: translate(command.locale, history.config.exec.success.footer, {
          page: valuePage,
          total: Math.ceil(questions.length / perPage),
          per: perPage
        }),
        icon_url: command.user.avatarURL() || undefined,
        timestamp: true
      })
    ],
    components: [{ type: 1, components: [usageButton] }]
  });
};