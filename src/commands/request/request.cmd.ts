import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { getQuestion, isQuestionExist } from "$core/utils/data/question";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { request } from "./request.config";
import { DayJS } from "$core/utils/day-js";

export const execute: CommandExecute = async(command, user) => {
  const questions = user.questions;
  const question = command.options.getString(request.config.options.question.name["en-US"], true) ?? 1;

  if (questions == null) {
    command.editReply({ content: "You have no questions" });
    colors.info("User has no questions");
    return;
  }

  const questionExist = await isQuestionExist(question, user.userId);

  if (!questionExist) {
    command.editReply({
      embeds: [
        simpleEmbed(translate(command.locale, request.config.exec.thisQuestionDoesNotExist), "error", "", {
          text: command.user.username,
          icon_url: command.user.avatarURL() ?? undefined,
          timestamp: true
        })
      ]
    });

    colors.error("Question does not exist");
    return;
  }

  const data = await getQuestion(question, user.userId);

  if (data == null) {
    command.editReply({
      embeds: [
        simpleEmbed(translate(command.locale, request.config.exec.thisQuestionDoesNotExist), "error", "", {
          text: command.user.username,
          icon_url: command.user.avatarURL() ?? undefined,
          timestamp: true
        })
      ]
    });

    colors.error("Question is null");
    return;
  }

  const timestamp = DayJS((data.repliedAt * 1000)).diff(DayJS((data.createdAt * 1000)), "second");

  command.editReply({
    embeds: [
      simpleEmbed(translate(command.locale, request.config.exec.question, {
        date: data.createdAt,
        date2: data.repliedAt,
        time: timestamp,
        channel: data.channelName || "Not defined",
        guild: data.guildName || "Not defined",
        question: data.question,
        answer: data.answer
      }), "info", "", {
        text: command.user.username,
        icon_url: command.user.avatarURL() ?? undefined,
        timestamp: true
      })
    ]
  });
};