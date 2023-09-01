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
  const question = command.options.getString(request.options.question.name["en-US"], true) ?? 1;

  if (questions == null) {
    command.editReply({ content: "You have no questions" });
    colors.info("User has no questions");
    return;
  }

  const questionExist = await isQuestionExist(question, user.userId);

  if (!questionExist) {
    command.editReply({
      embeds: [
        simpleEmbed(translate(command.locale, request.exec.thisQuestionDoesNotExist), "error", "", {
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
        simpleEmbed(translate(command.locale, request.exec.thisQuestionDoesNotExist), "error", "", {
          text: command.user.username,
          icon_url: command.user.avatarURL() ?? undefined,
          timestamp: true
        })
      ]
    });


    colors.error("Question is null");
    return;
  }

  let rowConfig: RowConfig | null = null;
  let inInitialResponse = true;
  let actualPage = 0;

  if (data?.webUrls.length > 0) rowConfig = { row1max: 3, row2max: 5, row3max: 5, row4max: 5, row5max: 5 };
  else rowConfig = { row1max: 2, row2max: 5, row3max: 5, row4max: 5, row5max: 5 };

  const updateButtons = (): ButtonBuilder[] => {
    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    const buttons: ButtonBuilder[] = [];

    buttons.push(simpleButton(undefined, ButtonStyle.Secondary, "initial", inInitialResponse, { name: "📄" }));

    if (data.history.length == 0) {
      for (let i = 0; i < (user.isPremium ? 10 : 2); i++) {
        buttons.push(simpleButton(undefined, ButtonStyle.Secondary, `p${i + 1}`, true, { name: emojis[i] }));
      }

      return buttons;
    }

    for (let i = 0; i < (user.isPremium ? 10 : 2); i++) {
      buttons.push(simpleButton(
        undefined,
        ButtonStyle.Secondary,
        `p${i + 1}`,
        data.history[i] == null ? true : ((!inInitialResponse && actualPage == i + 1) ? true : false),
        { name: emojis[i] }
      ));
    }

    return buttons;
  };

  const timestamp = DayJS((data.repliedAt * 1000)).diff(DayJS((data.createdAt * 1000)), "second");
  let favorite = data.isFavorite;

  let webUrl: string | null = null;
  if (data.webUrls.length > 0) webUrl = data.webUrls[0];

  const message = await command.editReply({
    embeds: [embed(command, data, timestamp, actualPage, favorite)],
    components: buttonsBuilder(
      webUrl, command, false, rowConfig, favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary), ...updateButtons()
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
          embeds: [embed(command, data, timestamp, actualPage, favorite)],
          components: buttonsBuilder(
            webUrl, command, true, rowConfig, favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary), ...updateButtons()
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
          embeds: [embed(command, dataUpdated, timestamp, actualPage, favorite)],
          components: buttonsBuilder(
            webUrl, command, false, rowConfig, favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary), ...updateButtons()
          )
        });
        break;
      case "initial":
        inInitialResponse = true;
        actualPage = 0;

        command.editReply({
          embeds: [embed(command, data, timestamp, actualPage, favorite)],
          components: buttonsBuilder(
            webUrl, command, false, rowConfig, favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary), ...updateButtons()
          )
        });
        break;
      case "p1":
      case "p2":
      case "p3":
      case "p4":
      case "p5":
      case "p6":
      case "p7":
      case "p8":
      case "p9":
      case "p10":
        inInitialResponse = false;
        actualPage = parseInt(interaction.customId.replace("p", ""));

        command.editReply({
          embeds: [embed(command, data, timestamp, actualPage, favorite)],
          components: buttonsBuilder(
            webUrl, command, false, rowConfig, favoriteButton().setStyle(favorite ? ButtonStyle.Primary : ButtonStyle.Secondary), ...updateButtons()
          )
        });
        break;
    }
  });
};

export const embed = (
  command: CommandInteraction,
  data: Prisma.QuestionGetPayload<{include: { user: false } }>,
  answerTime: number,
  page = 0,
  favorite = false
): EmbedBuilder => {
  let description = "";
  description += translate(command.locale, request.exec.question, {
    date: data.createdAt,
    date2: data.repliedAt,
    time: answerTime,
    channel: data.channelName || "Not defined",
    guild: data.guildName || "Not defined",
    question: data.question,
    answer: page == 0 ? data.answer : data.history[page - 1] ?? data.answer,
    favoriteLine: favorite ? translate(command.locale, request.exec.favoriteLine, {
      date: data.favoriteAt
    }) : "",
    regeneratedManyTimes: data.history.length > 0 ? translate(command.locale, request.exec.regeneratedManyTimes, {
      times: data.history.length
    }) : ""
  });

  if (data.webUrls.length > 0) {
    description += "\n\n";
    description += translate(command.locale, request.exec.linksTitle);
    description += "\n";
    for (const link of data.webUrls) description += translate(command.locale, request.exec.links, { title: link.split("/")[2], url: link });
  }

  return simpleEmbed(description, "info", "", {
    text: command.user.username,
    icon_url: command.user.avatarURL() ?? undefined,
    timestamp: true
  }, data.qrCodeUrl || undefined);
};