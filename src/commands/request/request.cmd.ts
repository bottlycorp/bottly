import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { getQuestion, isQuestionExist } from "$core/utils/data/question";
import { simpleButton, simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { request } from "./request.config";
import { DayJS } from "$core/utils/day-js";
import { favoriteButton } from "$core/utils/config/buttons";
import { ButtonStyle, CommandInteraction } from "discord.js";
import { updateUser } from "$core/utils/data/user";
import { EmbedBuilder } from "@discordjs/builders";
import { Prisma } from "@prisma/client";

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
  let favorite = data.isFavorite;

  const components = [];
  if (data.webUrls.length > 0) {
    components.push(simpleButton(translate(command.locale, request.config.buttons.knowMore), ButtonStyle.Link, data.webUrls[0]));
  }

  components.push(favoriteButton().setStyle(data.isFavorite ? ButtonStyle.Primary : ButtonStyle.Secondary));

  const message = await command.editReply({
    embeds: [embed(command, data, timestamp)],
    components: [{
      type: 1,
      components: components
    }]
  });

  const collector = message.createMessageComponentCollector({ filter: (i) => i.user.id === command.user.id });

  collector.on("collect", async(interaction) => {
    interaction.deferUpdate();
    if (interaction.customId !== "favorite") return; // Wtf but ok :D
    const components = [];
    if (data.webUrls.length > 0) {
      components.push(simpleButton(translate(command.locale, request.config.buttons.knowMore), ButtonStyle.Link, data.webUrls[0]));
    }

    components.push(favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary).setDisabled(true));

    favorite = !favorite;
    command.editReply({ components: [{ type: 1, components: components }] });

    await updateUser(user.userId, { questions: { update: { data: { isFavorite: favorite, favoriteAt: DayJS().unix() }, where: { id: data.id } } } });
    const dataUpdated = await getQuestion(question, user.userId);
    if (dataUpdated == null) return;

    // remove the last component
    components.pop();
    components.push(favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary).setDisabled(false));

    command.editReply({
      embeds: [embed(command, dataUpdated, timestamp)],
      components: [{
        type: 1,
        components: components
      }]
    });
  });
};

export const embed = (
  command: CommandInteraction,
  data: Prisma.QuestionGetPayload<{include: { user: false } }>,
  answerTime: number
): EmbedBuilder => {
  let description = "";
  description += translate(command.locale, request.config.exec.question, {
    date: data.createdAt,
    date2: data.repliedAt,
    time: answerTime,
    channel: data.channelName || "Not defined",
    guild: data.guildName || "Not defined",
    question: data.question,
    answer: data.answer,
    favoriteLine: data.isFavorite ? translate(command.locale, request.config.exec.favoriteLine, {
      date: data.favoriteAt
    }) : ""
  });

  if (data.webUrls.length > 0) {
    description += "\n\n";
    for (const link of data.webUrls) description += translate(command.locale, request.config.exec.links, { title: link.split("/")[2], url: link });
  }

  return simpleEmbed(description, "info", "", {
    text: command.user.username,
    icon_url: command.user.avatarURL() ?? undefined,
    timestamp: true
  }, data.qrCodeUrl || undefined);
};