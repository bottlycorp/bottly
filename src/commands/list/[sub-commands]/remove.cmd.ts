import { translate } from "$core/utils/config/message/message.util";
import { removeQuestionFromList } from "$core/utils/data/list";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { findCommand } from "$core/utils/handler/command/command";
import { list } from "../list.config";

export const execute: CommandExecute = async(command, user) => {
  const name = command.options.getString("name", true);
  const questionToRemove = command.options.getString("question", true);

  if (questionToRemove === "undefined") {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["need-choose-list"]), "error")] });
    return;
  }

  if (!user.lists.find(list => list.id === name)) {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["not-found"], {
      name: name,
      cmdListCreate: await findCommand("list", "create")
    }), "error")] });
    return;
  }

  const listFocused = user.lists.find(list => list.id === name);
  if (!listFocused) return; // This is just to make TS happy :D

  const questions = user.questions.filter(question => question.listId === name);
  if (!questions.find(question => question.id == questionToRemove)) {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["question-not-exist"], {
      question: questionToRemove,
      list: listFocused.name
    }), "error")] });
    return;
  }

  const question = questions.find(question => question.id == questionToRemove);
  if (!question) return; // idem (lol. funny comment) :D

  await removeQuestionFromList(listFocused.id, [question.id]);

  command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["list-removed"], {
    question: question.question,
    name: listFocused.name
  }), "success")] });
};