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
import { favoriteButton, premiumButton, qrCodeButton, regenerateButton, regenerationButton, revealButton,
  usageButton } from "$core/utils/config/buttons";
import { updateUser } from "$core/utils/data/user";
import { DayJS } from "$core/utils/day-js";
import QRCode from "qrcode";
import { supabase } from "$core/utils/supabase";
import { getLocale } from "$core/utils/locale";
import { decode } from "base64-arraybuffer";
import { EmbedBuilder } from "@discordjs/builders";
import { existAskCooldown, setAskCooldown } from "$core/utils/cache";

export const execute: CommandExecute = async(command, user) => {
  const channel = command.channel;
  const askedAt = DayJS().unix();
  if (!(channel instanceof ThreadChannel) && !(channel instanceof TextChannel)) {
    command.editReply(translate(command.locale, global.config.exec.notInATextChannel));
    colors.error(userWithId(command.user) + " tried to ask a question while not being in a text channel (thread or text channel)");
    return;
  }


  if (existAskCooldown(command.user.id)) {
    command.editReply(translate(command.locale, ask.config.exec.cooldown, { s: user.isPremium ? 5 : 10 }));
    return;
  }

  const message = await command.editReply({ embeds: [simpleEmbed(translate(command.locale, ask.config.exec.waiting), "info")] });
  setAskCooldown(command.user.id, user.isPremium ? 2500 : 5000);

  let answer: string;
  const messages: { content: string; role: "user" | "system" | "assistant" }[] = [];

  messages.push({ role: "system", content: translate(command.locale, getPrompt("default"), {
    lang: getLocale(command.locale)
  }) });

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
      max_tokens: user.isPremium ? 3750 : 2500,
      model: "gpt-3.5-turbo",
      user: `${command.user.id}-${command.guild?.id}`
    });

    if (!response.data.choices[0].message) {
      command.editReply(translate(command.locale, ask.config.exec.error, { error: "No message in response" }));
      return;
    }

    answer = response.data.choices[0].message?.content;
    repliedAt = DayJS().unix();
  } catch (error: any) {
    command.editReply(translate(command.locale, ask.config.exec.error, { error: error.message }));
    colors.error(userWithId(command.user) + " tried to ask a question but an error occured: " + error.message);
    return;
  }

  command.editReply({
    embeds: [answerEmbed(command, answer)],
    components: [{
      type: 1,
      components: [revealButton(command), usageButton(command, user), favoriteButton(), regenerateButton(), qrCodeButton()]
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

  updateUser(user.userId, { usages: { update: { usage: { decrement: 1 } } } });

  let favorited = false;
  let regenerated = 0;
  let publicUrl = "ThisIsABlankUrlBecauseItIsNotYetGenerated";

  setTimeout(() => {
    command.editReply({ components: [{ type: 1, components: [
      revealButton(command).setDisabled(true),
      usageButton(command, user),
      favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary).setDisabled(true),
      regenerateButton().setDisabled(true),
      qrCodeButton().setDisabled(true)
    ] }] });
  }, 60000);

  if (!question) {
    command.editReply(translate(command.locale, global.config.exec.error, { error: "Question does not exist" }));
    return;
  }

  (await message).createMessageComponentCollector({ filter: (i) => i.user.id === command.user.id }).on("collect", async(i) => {
    i.deferUpdate();
    if (i.customId === "reveal") {
      try {
        channel.send({ embeds: [answerPublicEmbed(command, answer, command.options.getString("prompt", true))] });
        command.editReply({ embeds: [simpleEmbed(translate(command.locale, ask.config.buttons.revealed), "info", "")], components: [] });
      } catch (error) {
        colors.error(userWithId(command.user) + " tried to reveal the answer but an error occured: " + error);
        command.editReply(translate(command.locale, global.config.exec.error, {
          error: "An error occured while revealing the answer, possibility is a permission error check permissions"
        }));
      }
    } else if (i.customId === "favorite") {
      command.editReply({ components: [{ type: 1, components: [
        revealButton(command),
        usageButton(command, user),
        favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary).setDisabled(true),
        regenerateButton(),
        qrCodeButton()
      ] }] });

      favorited = !favorited;
      await updateUser(user.userId, {
        questions: { update: { data: { isFavorite: favorited, favoriteAt: DayJS().unix() }, where: { id: question.id } } }
      });

      command.editReply({ components: [{ type: 1, components: [
        revealButton(command),
        usageButton(command, user),
        favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary).setDisabled(false),
        regenerateButton(),
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
          regenerateButton(),
          qrCodeButton()
        ] }]
      });
    } else if (i.customId === "regenerate") {
      if (!user.isPremium && (user.usages?.usage && user.usages?.usage <= 0)) {
        const embed = simpleEmbed(translate(i.locale, global.config.exec.noMoreUsages, { unix: DayJS().endOf("day").unix() }), "error");
        const premiumEmbed = simpleEmbed(translate(i.locale, global.config.exec.orGetPremium), "premium");

        const embeds: EmbedBuilder[] = [embed];
        const components = [{ type: 1, components: [premiumButton(i)] }];
        if (!user.isPremium) embeds.push(premiumEmbed);

        i.editReply({ embeds });
        if (!user.isPremium) i.editReply({ components });

        colors.error(`${userWithId(i.user)} tried to regenerate a question but has no usages left`);
        return;
      }

      if (regenerated >= 5 && !user.isPremium) {
        command.editReply(translate(command.locale, ask.config.exec.regenerated_max, { max: 5, maxPremium: 10 }));
        return;
      }

      if (regenerated >= 10 && user.isPremium) {
        command.editReply(translate(command.locale, ask.config.exec.regenerated_max_premium, { max: 10 }));
        return;
      }

      command.editReply({ embeds: [simpleEmbed(translate(command.locale, ask.config.exec.regenerate), "info", "")], components: [
        { type: 1, components: [regenerationButton(i)] }
      ] });

      regenerated++;

      const regeneratedText = await openai.createChatCompletion({
        messages: [
          ...messages,
          { role: "user", content: command.options.getString("prompt", true) }
        ],
        max_tokens: user.isPremium ? 3750 : 2500,
        model: "gpt-3.5-turbo",
        user: user.userId
      }).catch((e) => {
        command.editReply(translate(command.locale, ask.config.exec.error, { error: e.message }));
        colors.error(`${userWithId(command.user)} tried to regenerate a question but got an error: ${e.message}`);
        return;
      });

      if (!regeneratedText) return;

      if (!regeneratedText.data.choices[0].message) {
        command.editReply(translate(command.locale, ask.config.exec.error, { error: "No message in response" }));
        return;
      }

      answer = regeneratedText.data.choices[0].message?.content;
      command.editReply({ embeds: [answerEmbed(command, answer)] });

      setTimeout(async() => {
        command.editReply({ components: [{ type: 1, components: [
          revealButton(command),
          usageButton(
            command,
            user.isPremium ? user : await updateUser(user.userId, { usages: { update: { usage: { decrement: 1 } } } }),
            user.isPremium ? true : false
          ),
          favoriteButton().setStyle(favorited ? ButtonStyle.Primary : ButtonStyle.Secondary),
          regenerateButton(),
          qrCodeButton()
        ] }] });
      }, 1000);
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
    translate(command.locale, global.config.exec.revealed_text, { response: answer, question: limitString(prompt, 100) }),
    "info",
    undefined,
    { text: command.user.username, icon_url: command.user.displayAvatarURL(), timestamp: true }
  );
};