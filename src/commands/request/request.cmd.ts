import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { getQuestion, isQuestionExist } from "$core/utils/data/question";
import { simpleButton, simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { request } from "./request.config";
import { DayJS } from "$core/utils/day-js";
import { RowConfig, buttonsBuilder, favoriteButton } from "$core/utils/config/buttons";
import { ButtonStyle, CommandInteraction } from "discord.js";
import { updateUser } from "$core/utils/data/user";
import { ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { Prisma } from "@prisma/client";

export const execute: CommandExecute = async(command, user) => {
  const questions = user.questions;
  const rowConfig: RowConfig = { row1max: 2, row2max: 5, row3max: 5, row4max: 5, row5max: 5 };
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

  const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
  const buttons: ButtonBuilder[] = [];

  if (data.history.length == 0) {
    for (let i = 0; i < (user.isPremium ? 5 : 3); i++) {
      console.log(i);
      buttons.push(simpleButton(undefined, ButtonStyle.Secondary, `p${i}`, true, { name: emojis[i] }));
    }
  } else {
    for (let i = 0; i < (user.isPremium ? 5 : 3); i++) {
      buttons.push(simpleButton(undefined, ButtonStyle.Secondary, `p${i}`, data.history.length >= i ? false : true, { name: emojis[i] }));
    }
  }

  const timestamp = DayJS((data.repliedAt * 1000)).diff(DayJS((data.createdAt * 1000)), "second");
  let favorite = data.isFavorite;

  let webUrl: string | null = null;
  if (data.webUrls.length > 0) webUrl = data.webUrls[0];

  const message = await command.editReply({
    embeds: [embed(command, data, timestamp)],
    components: buttonsBuilder(
      webUrl, command, false, rowConfig, favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary), ...buttons
    )
  });

  const collector = message.createMessageComponentCollector({ filter: (i) => i.user.id === command.user.id });
  let dataUpdated: Prisma.QuestionGetPayload<{include: { user: false } }> | null = null;

  collector.on("collect", async(interaction) => {
    interaction.deferUpdate();

    switch (interaction.customId) {
      case "favorite":
        favorite = !favorite;

        command.editReply({
          embeds: [embed(command, data, timestamp)],
          components: buttonsBuilder(
            webUrl, command, true, rowConfig, favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary), ...buttons
          )
        });

        await updateUser(user.userId, {
          questions: {
            update: {
              where: { id: data.id },
              data: { isFavorite: favorite, favoriteAt: DayJS().unix() }
            }
          }
        });

        dataUpdated = await getQuestion(question, user.userId);
        if (dataUpdated == null) return;

        command.editReply({
          embeds: [embed(command, dataUpdated, timestamp)],
          components: buttonsBuilder(
            webUrl, command, false, rowConfig, favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary), ...buttons
          )
        });
        break;
    }
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
    description += translate(command.locale, request.config.exec.linksTitle);
    description += "\n";
    for (const link of data.webUrls) description += translate(command.locale, request.config.exec.links, { title: link.split("/")[2], url: link });
  }

  return simpleEmbed(description, "info", "", {
    text: command.user.username,
    icon_url: command.user.avatarURL() ?? undefined,
    timestamp: true
  }, data.qrCodeUrl || undefined);
};