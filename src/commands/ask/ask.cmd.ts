import { colors, openai, web as websearch } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonInteraction, ButtonStyle, CommandInteraction, MessageComponentInteraction, TextChannel, ThreadChannel } from "discord.js";
import { ask } from "./ask.config";
import { global } from "$core/utils/config/message/command";
import { limitString, userWithId } from "$core/utils/function";
import { QuestionIncludeAll, getQuestion, newQuestion } from "$core/utils/data/question";
import { getPrompt } from "@bottlycorp/prompts";
import { simpleButton, simpleEmbed } from "$core/utils/embed";
import { buttonsBuilder, favoriteButton, qrCodeButton, revealButton, usageButton } from "$core/utils/config/buttons";
import { updateUser } from "$core/utils/data/user";
import { DayJS } from "$core/utils/day-js";
import { supabase } from "$core/utils/supabase";
import { getLocale } from "$core/utils/locale";
import { decode } from "base64-arraybuffer";
import { EmbedBuilder } from "@discordjs/builders";
import { existAskCooldown, setAskCooldown } from "$core/utils/cache";
import QRCode from "qrcode";

export const execute: CommandExecute = async(command, user) => {
  const web = command.options.getBoolean("web", false) ?? false;
  const context = command.options.getString("context", false) ?? "";

  const channel = command.channel;
  const askedAt = DayJS().unix();

  const handleNotInTextChannel = (): void => {
    command.editReply(translate(command.locale, global.config.exec.notInATextChannel));
    colors.error(userWithId(command.user) + " tried to ask a question while not being in a text channel (thread or text channel)");
  };

  if (!(channel instanceof ThreadChannel) && !(channel instanceof TextChannel)) {
    handleNotInTextChannel();
    return;
  }

  const handleCooldown = (): void => {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, ask.config.exec.cooldown, { s: user.isPremium ? 5 : 10 }), "error")] });
    colors.error(userWithId(command.user) + " tried to ask a question but is in cooldown");
  };

  if (existAskCooldown(command.user.id)) {
    handleCooldown();
    return;
  }

  const message = await command.editReply({ embeds: [simpleEmbed(translate(command.locale, web
    ? ask.config.exec.waintingWeb
    : ask.config.exec.waiting),
  "info")] });
  setAskCooldown(command.user.id, user.isPremium ? 2500 : 5000);

  let repliedAt: number = DayJS().unix();
  let answer = "";
  let url: string | undefined = undefined;
  let publicUrl = "ThisIsABlankUrlBecauseItIsNotYetGenerated";
  let question: QuestionIncludeAll;
  let favorited = false;

  const messages: { content: string; role: "user" | "system" | "assistant" }[] = [];

  const handlePromptInContext = async(): Promise<void> => {
    const question = await getQuestion(context, command.user.id);
    if (!question) {
      command.editReply(translate(command.locale, ask.config.exec.error, { error: "Question provided in context does not exist" }));
      return;
    }

    messages.push({ content: question.question, role: "user" });
    messages.push({ content: question.answer, role: "assistant" });
  };

  const handleChatCompletion = async(): Promise<void> => {
    const response = await openai.createChatCompletion({
      messages,
      max_tokens: user.isPremium ? 3750 : 2500,
      model: "gpt-3.5-turbo",
      user: `${command.user.id}-${command.guild?.id}`
    });

    if (!response.data.choices[0].message) {
      command.editReply(translate(command.locale, ask.config.exec.error, { error: "No message in response" }));
      return;
    }

    answer = response.data.choices[0].message?.content;
  };

  const handleQuestionCreation = async(): Promise<void> => {
    const created = await newQuestion(command.user, {
      data: {
        answer: answer,
        channelName: channel.name,
        guildName: channel.guild.name,
        question: command.options.getString("prompt", true),
        createdAt: askedAt,
        repliedAt: repliedAt,
        webUsed: web,
        webUrl: web ? (url ?? undefined) : undefined,
        user: { connect: { userId: user.userId } }
      }
    });

    if (!created) {
      command.editReply(translate(command.locale, ask.config.exec.error, { error: "Question could not be created" }));
      return;
    }

    question = created;
  };

  if (!web) {
    messages.push({ role: "system", content: translate(command.locale, getPrompt("default"), { lang: getLocale(command.locale) }) });

    const context = command.options.getString("context", false);
    if (context) {
      await handlePromptInContext();
    }

    messages.push({ content: command.options.getString("prompt", true), role: "user" });
  }

  try {
    if (web) {
      const dataWebSearch = await websearch.search(command.options.getString("prompt", true));
      answer = dataWebSearch.content;
      url = dataWebSearch.url ?? undefined;

    } else {
      await handleChatCompletion();
    }

    repliedAt = DayJS().unix();
    await handleQuestionCreation();

    command.editReply({
      embeds: [answerEmbed(command, answer)],
      components: [{
        type: 1,
        components: buttonsBuilder(
          url ?? null,
          command,
          revealButton(command),
          usageButton(command, user),
          favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
          qrCodeButton()
        )
      }]
    });
  } catch (error: any) {
    command.editReply(translate(command.locale, ask.config.exec.error, { error: error.message }));
    return;
  }

  const handleFavoriteButtonToggle = async(): Promise<void> => {
    command.editReply({ components: [{ type: 1, components: buttonsBuilder(
      url ?? null,
      command,
      revealButton(command),
      usageButton(command, user),
      favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary).setDisabled(true),
      qrCodeButton()
    ) }] });

    favorited = !favorited;
    await updateUser(user.userId, { questions: { update: { data: {
      isFavorite: favorited, favoriteAt: DayJS().unix()
    }, where: { id: question.id } } } });

    command.editReply({ components: [{ type: 1, components: buttonsBuilder(
      url ?? null,
      command,
      revealButton(command),
      usageButton(command, user),
      favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
      qrCodeButton()
    ) }] });
  };

  const handleQRCodeButtonClick = async(i: MessageComponentInteraction): Promise<void> => {
    if (publicUrl == "ThisIsABlankUrlBecauseItIsNotYetGenerated") {
      const { error } = await supabase.storage.from("qrcodes").upload(
        `${command.user.id}/${i.message.id}.png`,
        decode((await QRCode.toBuffer(
          translate(command.locale, ask.config.exec.qrCode, {
            question: limitString(command.options.getString("prompt", true), 256),
            lang: getLocale(command.locale),
            response: answer
          })
        )).toString("base64")),
        { contentType: "image/png" }
      );

      if (error) {
        command.editReply(translate(command.locale, ask.config.exec.error, { error: error.message }));
        return;
      }

      publicUrl = await supabase.storage.from("qrcodes").getPublicUrl(`${command.user.id}/${i.message.id}.png`).data.publicUrl;
      updateUser(user.userId, { questions: { update: { data: { qrCodeUrl: publicUrl }, where: { id: question.id } } } });
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
  };

  const handleButtonCollect = async(interaction: ButtonInteraction): Promise<void> => {
    interaction.deferUpdate();

    switch (interaction.customId) {
      case "reveal":
        try {
          if (web && url) {
            channel.send({
              embeds: [answerPublicEmbed(command, answer, command.options.getString("prompt", true))],
              components: [{ type: 1, components: [simpleButton(translate(command.locale, ask.config.buttons.knowMore), ButtonStyle.Link, url)] }]
            });
          } else {
            channel.send({ embeds: [answerPublicEmbed(command, answer, command.options.getString("prompt", true))] });
          }

          command.editReply({ embeds: [simpleEmbed(translate(command.locale, ask.config.buttons.revealed), "info", "")], components: [] });
        } catch (error) {
          colors.error(userWithId(command.user) + " tried to reveal the answer but an error occurred: " + error);
          command.editReply(
            translate(command.locale, global.config.exec.error, {
              error: "An error occurred while revealing the answer, possibility is a permission error check permissions"
            })
          );
        }
        break;
      case "favorite":
        await handleFavoriteButtonToggle();
        break;
      case "qrcode":
        await handleQRCodeButtonClick(interaction);
        break;
      case "return":
        command.editReply({
          embeds: [answerEmbed(command, answer)],
          components: [{
            type: 1,
            components: buttonsBuilder(
              url ?? null,
              command,
              revealButton(command),
              usageButton(command, user),
              favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
              qrCodeButton()
            )
          }]
        });
        break;
    }
  };

  message.createMessageComponentCollector({ filter: (i) => i.user.id === command.user.id }).on("collect", handleButtonCollect);
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
    translate(command.locale, global.config.exec.revealed_text, { response: answer, question: limitString(prompt, 100) }),
    "info",
    undefined,
    { text: command.user.username, icon_url: command.user.displayAvatarURL(), timestamp: true }
  );
};