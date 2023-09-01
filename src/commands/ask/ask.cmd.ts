import { colors, openai, web as websearch } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { CommandExecute } from "$core/utils/handler/command";
import {
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  MessageComponentInteraction,
  TextChannel,
  ThreadChannel
} from "discord.js";
import { ask } from "./ask.config";
import { global } from "$core/utils/config/message/command";
import { limitString, userWithId } from "$core/utils/function";
import { QuestionIncludeAll, getQuestion, newQuestion, updateQuestion } from "$core/utils/data/question";
import { getPrompt } from "@bottlycorp/prompts";
import { simpleButton, simpleEmbed } from "$core/utils/embed";
import { buttonsBuilder, favoriteButton, premiumButton, qrCodeButton, regenerateButton, revealButton, usageButton } from "$core/utils/config/buttons";
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
  const model = command.options.getString("model", false) ?? "gpt-3.5-turbo";

  const channel = command.channel;
  const askedAt = DayJS().unix();

  if (model !== "gpt-3.5-turbo" && user.isPremium === false) {
    const premiumEmbed = simpleEmbed(translate(command.locale, global.exec.orGetPremiumGPT4), "premium");
    colors.error(userWithId(command.user) + " tried to use with a different model without being premium");
    command.editReply({ embeds: [premiumEmbed], components: [{ type: 1, components: [premiumButton(command)] }] });
    return;
  }

  const handleNotInTextChannel = (): void => {
    command.editReply(translate(command.locale, global.exec.notInATextChannel));
    colors.error(userWithId(command.user) + " tried to ask a question while not being in a text channel (thread or text channel)");
  };

  if (!(channel instanceof ThreadChannel) && !(channel instanceof TextChannel)) {
    handleNotInTextChannel();
    return;
  }

  const handleCooldown = (): void => {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, ask.exec.cooldown, { s: user.isPremium ? 5 : 10 }), "error")] });
    colors.error(userWithId(command.user) + " tried to ask a question but is in cooldown");
  };

  if (existAskCooldown(command.user.id)) {
    handleCooldown();
    return;
  }

  const embeds = [];
  embeds.push(simpleEmbed(translate(command.locale, web ? ask.exec.waintingWeb : ask.exec.waiting), "info"));
  if (context && web) embeds.push(simpleEmbed(translate(command.locale, ask.exec.warningWebContext), "error"));

  const message = await command.editReply({ embeds: embeds });
  setAskCooldown(command.user.id, user.isPremium ? 2500 : 5000);

  let answeredAt = 0;
  let answer = "";
  let url: string | undefined = undefined;
  let urls: string[] | null = null;
  let publicUrl = "ThisIsABlankUrlBecauseItIsNotYetGenerated";
  let question: QuestionIncludeAll;
  let favorited = false;
  let regenerated = 0;
  let regeneratedLocked = false;

  const messages: { content: string; role: "user" | "system" | "assistant" }[] = [];

  const handlePromptInContext = async(): Promise<void> => {
    const question = await getQuestion(context, command.user.id);
    if (!question) {
      command.editReply(translate(command.locale, ask.exec.error, { error: "Question provided in context does not exist" }));
      return;
    }

    messages.push({ content: question.question, role: "user" });
    messages.push({ content: question.answer, role: "assistant" });
  };

  const handleChatCompletion = async(regen = false): Promise<void> => {
    const response = await openai.createChatCompletion({
      messages,
      max_tokens: user.isPremium ? 3750 : 2500,
      model: model || "gpt-3.5-turbo",
      user: `${command.user.id}-${command.guild?.id}`
    });

    if (!response.data.choices[0].message) {
      command.editReply(translate(command.locale, ask.exec.error, { error: "No message in response" }));
      return;
    }

    if (!regen) {
      answer = response.data.choices[0].message?.content ?? "";
      answeredAt = DayJS().unix();
    }
  };

  const handleQuestionCreation = async(): Promise<void> => {
    const created = await newQuestion(command.user, {
      data: {
        answer: answer,
        channelName: channel.name,
        guildName: channel.guild.name,
        question: command.options.getString("prompt", true),
        createdAt: askedAt,
        repliedAt: answeredAt,
        webUrls: urls ?? [],
        user: { connect: { userId: user.userId } }
      }
    });

    await updateUser(command.user.id, { usages: { update: { usage: { decrement: 1 } } } });

    if (!created) {
      command.editReply(translate(command.locale, ask.exec.error, { error: "Question could not be created" }));
      return;
    }

    question = created;
  };

  if (!web) {
    messages.push({
      role: "system",
      content: translate(command.locale, getPrompt("default"), { lang: getLocale(command.locale) })
    });

    const context = command.options.getString("context", false);
    if (context) await handlePromptInContext();
    messages.push({ content: command.options.getString("prompt", true), role: "user" });
  }

  const handleRespond = async(regen = false): Promise<void> => {
    if (regen) command.editReply({ embeds: [simpleEmbed(translate(command.locale, ask.exec.regenerate), "info")], components:
      buttonsBuilder(
        url ?? null,
        command,
        true,
        null,
        revealButton(command),
        usageButton(command, user),
        favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
        regenerateButton(),
        qrCodeButton()
      )
    });

    try {
      if (web) {
        const dataWebSearch = await websearch.search(command.options.getString("prompt", true), 5, "active");

        answer = dataWebSearch.content;
        url = dataWebSearch.url ?? undefined;
        urls = dataWebSearch.urls ?? null;
        answeredAt = DayJS().unix();
      } else {
        await handleChatCompletion();
      }

      if (regen) updateQuestion({ where: { id: question.id }, data: { history: { push: answer } } });

      if (!regen) await handleQuestionCreation();

      command.editReply({
        embeds: [answerEmbed(command, answer, urls)],
        components: buttonsBuilder(
          url ?? null,
          command,
          false,
          null,
          revealButton(command),
          usageButton(command, user),
          favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
          regenerateButton().setDisabled(true),
          qrCodeButton()
        )
      });

      setTimeout(() => {
        command.editReply({
          embeds: [answerEmbed(command, answer, urls)],
          components: buttonsBuilder(
            url ?? null,
            command,
            false,
            null,
            revealButton(command),
            usageButton(command, user),
            favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
            regenerateButton().setDisabled(regeneratedLocked),
            qrCodeButton()
          )
        });
      }, web ? 3000 : 2500);
    } catch (error: any) {
      command.editReply(translate(command.locale, ask.exec.error, { error: error.message }));
      return;
    }
  };

  await handleRespond();

  const handleFavoriteButtonToggle = async(): Promise<void> => {
    command.editReply({ components: buttonsBuilder(
      url ?? null,
      command,
      false,
      null,
      revealButton(command),
      usageButton(command, user),
      favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary).setDisabled(true),
      regenerateButton().setDisabled(regeneratedLocked),
      qrCodeButton()
    ) });

    favorited = !favorited;
    await updateUser(user.userId, { questions: { update: { data: {
      isFavorite: favorited, favoriteAt: DayJS().unix()
    }, where: { id: question.id } } } });

    command.editReply({ components: buttonsBuilder(
      url ?? null,
      command,
      false,
      null,
      revealButton(command),
      usageButton(command, user),
      favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
      regenerateButton().setDisabled(regeneratedLocked),
      qrCodeButton()
    ) });
  };

  const handleQRCodeButtonClick = async(i: MessageComponentInteraction): Promise<void> => {
    if (publicUrl == "ThisIsABlankUrlBecauseItIsNotYetGenerated") {
      const { error } = await supabase.storage.from("qrcodes").upload(
        `${command.user.id}/${i.message.id}.png`,
        decode((await QRCode.toBuffer(
          translate(command.locale, ask.exec.qrCode, {
            question: limitString(command.options.getString("prompt", true), 256),
            lang: getLocale(command.locale),
            response: answer
          })
        )).toString("base64")),
        { contentType: "image/png" }
      );

      if (error) {
        command.editReply(translate(command.locale, ask.exec.error, { error: error.message }));
        return;
      }

      publicUrl = await supabase.storage.from("qrcodes").getPublicUrl(`${command.user.id}/${i.message.id}.png`).data.publicUrl;
      updateUser(user.userId, { questions: { update: { data: { qrCodeUrl: publicUrl }, where: { id: question.id } } } });
    }

    if (!publicUrl) {
      command.editReply(translate(command.locale, ask.exec.error, { error: "No public URL" }));
      colors.error(userWithId(command.user) + " tried to get a QR code but no public URL was returned");
      return;
    }

    command.editReply({
      embeds: [
        simpleEmbed(
          translate(command.locale, ask.exec.qrCodeDesc),
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
              embeds: [answerPublicEmbed(command, answer, command.options.getString("prompt", true), urls)],
              components: [{ type: 1, components: [simpleButton(translate(command.locale, ask.buttons.knowMore), ButtonStyle.Link, url)] }]
            }).catch(() => {
              command.editReply(translate(command.locale, ask.exec.error, {
                error: "An error occurred while revealing the answer, possibility is a permission error check permissions"
              }));
            });
          } else {
            channel.send({ embeds: [answerPublicEmbed(command, answer, command.options.getString("prompt", true), urls)] }).catch(() => {
              command.editReply(translate(command.locale, ask.exec.error, {
                error: "An error occurred while revealing the answer, possibility is a permission error check permissions"
              }));
            });
          }

          command.editReply({ embeds: [simpleEmbed(translate(command.locale, ask.buttons.revealed), "info", "")], components: [] });
        } catch (error) {
          colors.error(userWithId(command.user) + " tried to reveal the answer but an error occurred: " + error);
          command.editReply(
            translate(command.locale, global.exec.error, {
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
      case "regenerate":
        regenerated++;
        if (regenerated <= (user.isPremium ? 10 : 2)) await handleRespond(true);

        if (regenerated >= (user.isPremium ? 10 : 2)) {
          regeneratedLocked = true;
          command.editReply({ components: buttonsBuilder(
            url ?? null,
            command,
            false,
            null,
            revealButton(command),
            usageButton(command, user),
            favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
            regenerateButton().setDisabled(regeneratedLocked),
            qrCodeButton()
          ) });
          return;
        }
        break;
      case "return":
        command.editReply({
          embeds: [answerEmbed(command, answer, urls)],
          components: buttonsBuilder(
            url ?? null,
            command,
            false,
            null,
            revealButton(command),
            usageButton(command, user),
            favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
            regenerateButton().setDisabled(regeneratedLocked),
          )
        });
        break;
    }
  };

  message.createMessageComponentCollector({ filter: (i) => i.user.id === command.user.id }).on("collect", handleButtonCollect);
};

export const answerEmbed = (command: CommandInteraction, answer: string, links: string[] | null = null): EmbedBuilder => {
  let description = "";
  description += translate(command.locale, ask.exec.success, { response: answer });

  if (links) {
    description += "\n\n";
    description += translate(command.locale, ask.exec.linksTitle);
    description += "\n";
    for (const link of links) description += translate(command.locale, ask.exec.links, { title: link.split("/")[2], url: link });
  }

  return simpleEmbed(
    description,
    "info",
    "",
    { text: command.user.username, icon_url: command.user.displayAvatarURL(), timestamp: true }
  );
};

export const answerPublicEmbed = (command: CommandInteraction, answer: string, prompt: string, links: string[] | null = null): EmbedBuilder => {
  let description = "";
  description += `❔ ${limitString(prompt, 100)}\n\n`;
  description += translate(command.locale, ask.exec.success, { response: answer });

  if (links) {
    description += "\n\n";
    for (const link of links) {
      description += translate(command.locale, ask.exec.links, { title: link.split("/")[2], url: link });
    }
  }

  return simpleEmbed(
    description,
    "info",
    undefined,
    { text: command.user.username, icon_url: command.user.displayAvatarURL(), timestamp: true }
  );
};