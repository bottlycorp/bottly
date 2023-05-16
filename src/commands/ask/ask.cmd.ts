import { colors, openai } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonStyle, CommandInteraction, TextChannel, ThreadChannel } from "discord.js";
import { ask } from "./ask.config";
import { global } from "$core/utils/config/message/command";
import { limitString, userWithId } from "$core/utils/function";
import { getQuestion, newQuestion } from "$core/utils/data/question";
import { getPrompt } from "@bottlycorp/prompts";
import { simpleButton, simpleEmbed } from "$core/utils/embed";
import { favoriteButton, qrCodeButton, revealButton, usageButton } from "$core/utils/config/buttons";
import { updateUser } from "$core/utils/data/user";
import { DayJS } from "$core/utils/day-js";
import QRCode from "qrcode";
import { supabase } from "$core/utils/supabase";
import { getLocale } from "$core/utils/locale";
import { decode } from "base64-arraybuffer";
import { EmbedBuilder } from "@discordjs/builders";

export const execute: CommandExecute = async(command, user) => {
  const channel = command.channel;
  const askedAt = DayJS().unix();
  if (!(channel instanceof ThreadChannel) && !(channel instanceof TextChannel)) {
    command.editReply(translate(command.locale, global.config.exec.notInATextChannel));
    colors.error(userWithId(command.user) + " tried to ask a question while not being in a text channel (thread or text channel)");
    return;
  }

  const message = await command.editReply(translate(command.locale, ask.config.exec.waiting));

  let answer: string;
  const messages: { content: string; role: "user" | "system" | "assistant" }[] = [];
  messages.push({ role: "system", content: translate(command.locale, getPrompt("default")) });

  const context = command.options.getString("context", false);
  if (context) {
    const question = await getQuestion(context, command.user.id);
    if (!question) {
      command.editReply(translate(command.locale, ask.config.exec.error, { error: "Question provided in context does not exist" }));
      return;
    }

    messages.push({ content: question.question, role: "user" });
    messages.push({ content: question.answer, role: "assistant" });
  }

  messages.push({ content: command.options.getString("prompt", true), role: "user" });

  let repliedAt: number = DayJS().unix();
  try {
    const response = await openai.createChatCompletion({
      messages,
      max_tokens: 2500,
      model: "gpt-3.5-turbo",
      user: user.userId
    });

    if (!response.data.choices[0].message) {
      command.editReply(translate(command.locale, ask.config.exec.error, { error: "No message in response" }));
      return;
    }

    answer = response.data.choices[0].message?.content;
    repliedAt = DayJS().unix();
  } catch (error: any) {
    command.editReply(translate(command.locale, ask.config.exec.error, { error: error.message }));
    return;
  }

  command.editReply({
    content: "",
    embeds: [answerEmbed(command, answer)],
    components: [{
      type: 1,
      components: [revealButton(command), usageButton(command, user), favoriteButton(), qrCodeButton()]
    }]
  });

  const question = await newQuestion(command.user, {
    data: {
      answer: answer,
      channelName: channel.name,
      guildName: channel.guild.name,
      question: command.options.getString("prompt", true),
      createdAt: askedAt,
      repliedAt: repliedAt,
      user: { connect: { userId: user.userId } }
    }
  }).catch((error) => {
    command.editReply(translate(command.locale, ask.config.exec.error, { error: error.message }));
    colors.error(userWithId(command.user) + " tried to ask a question but an error occured: " + error.message);
    return;
  });

  setTimeout(() => {
    command.editReply({ components: [{ type: 1, components: [
      revealButton(command).setDisabled(true),
      usageButton(command, user),
      favoriteButton().setDisabled(true),
      qrCodeButton().setDisabled(true)
    ] }] });
  }, 60000);

  let favorited = false;

  if (!question) {
    command.editReply(translate(command.locale, global.config.exec.error, { error: "Question does not exist" }));
    return;
  }

  let publicUrl = "ThisIsABlankUrlBecauseItIsNotYetGenerated";

  (await message).createMessageComponentCollector({ filter: (i) => i.user.id === command.user.id }).on("collect", async(i) => {
    i.deferUpdate();
    if (i.customId === "reveal") {
      channel.send({ embeds: [answerPublicEmbed(command, answer, command.options.getString("prompt", true))] });
      command.editReply({ embeds: [simpleEmbed(translate(command.locale, global.config.exec.buttons.revealed), "info", "")], components: [] });
    } else if (i.customId === "favorite") {
      updateUser(user.userId, { questions: { update: { data: { isFavorite: favorited, favoriteAt: DayJS().unix() }, where: { id: question.id } } } });

      favorited = !favorited;
      command.editReply({ components: [{ type: 1, components: [
        revealButton(command),
        usageButton(command, user),
        favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
        qrCodeButton()
      ] }] });
    } else if (i.customId === "qrcode") {
      if (publicUrl == "ThisIsABlankUrlBecauseItIsNotYetGenerated") {
        const { error } = await supabase.storage
          .from("qrcodes")
          .upload(`${command.user.id}/${i.message.id}.png`, decode((await QRCode.toBuffer(
            translate(command.locale, ask.config.exec.qrCode, {
              question: limitString(command.options.getString("prompt", true), 256),
              lang: getLocale(command.locale),
              response: answer
            })
          )).toString("base64")), {
            contentType: "image/png"
          });

        if (error) {
          command.editReply(translate(command.locale, ask.config.exec.error, { error: error.message }));
          return;
        }

        publicUrl = await supabase.storage.from("qrcodes").getPublicUrl(`${command.user.id}/${i.message.id}.png`).data.publicUrl;
        updateUser(user.userId, { questions: { update: { data: { qrCodeUrl: publicUrl }, where: { id: question.id } } } });
        console.log("cc", publicUrl);
      }

      if (!publicUrl) {
        command.editReply(translate(command.locale, ask.config.exec.error, { error: "No public URL" }));
        colors.error(userWithId(command.user) + " tried to get a QR code but no public URL was returned");
        return;
      }

      command.editReply({
        embeds: [
          simpleEmbed(
            translate(command.locale, ask.config.exec.qrCodeDesc),
            "info",
            undefined,
            { text: command.user.username, icon_url: command.user.displayAvatarURL(), timestamp: true },
            "",
            publicUrl
          )
        ],
        components: [{ type: 1, components: [simpleButton(undefined, ButtonStyle.Primary, "return", false, { name: "🔙" })] }]
      });
    } else if (i.customId === "return") {
      command.editReply({
        embeds: [answerEmbed(command, answer)],
        components: [{ type: 1, components: [
          revealButton(command),
          usageButton(command, user),
          favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
          qrCodeButton()
        ] }]
      });
    }
  });
};

export const answerEmbed = (command: CommandInteraction, answer: string): EmbedBuilder => {
  return simpleEmbed(
    translate(command.locale, ask.config.exec.success, { response: answer }),
    "info",
    "",
    { text: command.user.username, icon_url: command.user.displayAvatarURL(), timestamp: true }
  );
};

export const answerPublicEmbed = (command: CommandInteraction, answer: string, prompt: string): EmbedBuilder => {
  return simpleEmbed(
    translate(command.locale, global.config.exec.buttons.reveal_text, { response: answer, question: limitString(prompt, 100) }),
    "info",
    undefined,
    { text: command.user.username, icon_url: command.user.displayAvatarURL(), timestamp: true }
  );
};