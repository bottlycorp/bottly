import { translate } from "$core/utils/config/message/message.util";
import { addQuestionToList } from "$core/utils/data/list";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { findCommand } from "$core/utils/handler/command/command";
import { list } from "../list.config";

export const execute: CommandExecute = async(command, user) => {
  const name = command.options.getString("name", true);
  const questionToAdd = command.options.getString("question", true);

  if (questionToAdd === "undefined") {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["need-choose-list"]), "error")] });
    return;
  }

  const listExists = user.lists.find(list => list.id === name);
  if (!listExists) {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["not-found"], {
      name: name,
      cmdListCreate: await findCommand("list", "create")
    }), "error")] });
    return;
  }

  const question = user.questions.find(question => question.id === questionToAdd && question.listId == null);
  if (!question) {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["add"]["not-found"], {
      question: questionToAdd
    }), "error")] });
    return;
  }

  await addQuestionToList(listExists.id, [question.id]);

  command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["list-added"], {
    question: question.question,
    name: listExists.name
  }), "success")] });
};