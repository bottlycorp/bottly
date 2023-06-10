import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { findCommand } from "$core/utils/handler/command/command";
import { SelectMenuBuilder } from "@discordjs/builders";
import { list } from "../list.config";
import { limitString } from "$core/utils/function";
import { addQuestionToList, createList } from "$core/utils/data/list";

export const execute: CommandExecute = async(command, user) => {
  const name = command.options.getString("name", true);

  if (user.lists.find(list => list.name === name)) {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["list-create"]["already-exists"], { name: name }), "error")] });
    return;
  }

  await createList(user, name);
  const questions = user.questions
    .filter(question => !question.listId)
    .map(question => ({
      label: limitString(question.question, 60),
      value: question.id,
      description: limitString(question.answer, 60)
    }));

  if (questions.length === 0) {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["list-create"]["no-questions"], {
      cmdAsk: await findCommand("ask")
    }), "error")] });
    return;
  }

  const select = new SelectMenuBuilder()
    .setCustomId("choose-question")
    .setPlaceholder(translate(command.locale, list.exec["list-create"]["select-choose-placeholder"], { name: name }))
    .setMinValues(1)
    .setMaxValues(user.questions.length - user.questions.filter(question => question.listId).length)
    .addOptions(questions);

  const message = await command.editReply({
    embeds: [simpleEmbed(translate(command.locale, list.exec["list-create"]["created"], {
      name: name,
      cmdListAdd: await findCommand("list", "add")
    }), "success")],
    components: [{ type: 1, components: [select] }]
  });

  const collector = message.createMessageComponentCollector({ filter: (interaction) => interaction.user.id === user.userId, time: 60000 });

  collector.on("collect", async(interaction) => {
    if (interaction.customId !== "choose-question") return;
    if (!interaction.isAnySelectMenu()) return;

    const questionIds = interaction.values;
    await addQuestionToList(user, name, questionIds);

    await interaction.update({
      embeds: [simpleEmbed(translate(command.locale, list.exec["list-create"]["added"], { name: name, count: questionIds.length }), "success")],
      components: []
    });
  });
};