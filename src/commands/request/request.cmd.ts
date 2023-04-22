import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { isQuestionExist } from "$core/utils/data/question";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { request } from "./request.config";

export const execute: CommandExecute = async(command, channel, user) => {
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
    return;
  }
};