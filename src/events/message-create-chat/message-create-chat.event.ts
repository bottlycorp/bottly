import { colors, openai } from "$core/client";
import { chat } from "$core/commands/chat/chat.config";
import { deleteCache, existCache, setCache } from "$core/utils/cache";
import { global } from "$core/utils/config/message/command";
import { separate, translate } from "$core/utils/config/message/message.util";
import { getDiscussion, updateDiscussion } from "$core/utils/data/discussion";
import { DayJS } from "$core/utils/day-js";
import { simpleEmbed } from "$core/utils/embed";
import { limitString, userWithId } from "$core/utils/function";
import { EnableInDev } from "$core/utils/handler";
import { findCommand } from "$core/utils/handler/command/command";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { toLocale } from "$core/utils/locale";
import { getTokens } from "$core/utils/tokenizer";
import { Role } from "@prisma/client";
import { Message, ThreadChannel } from "discord.js";
import { CreateChatCompletionResponse } from "openai";

export const enableInDev: EnableInDev = true;

export const event: EventName = "messageCreate";

const systemContext = [
  "Tu doit génerer un titre à propos du premier paragraphe/texte suivant (ci-dessous) dans la langue {LANG}, sans inclure autre chose que",
  "ce titre. Tu écrit seulement le titre et aucun autre texte, et ne pas mettre ta réponse entre guillemets"
].join(" ");

export const execute: EventExecute<"messageCreate"> = async(message: Message) => {
  if (!message.inGuild()) return;
  if (!message.channel.isThread()) return;
  if (message.content.startsWith(".")) return;
  if (message.mentions.users.size > 0) return;
  if (message.author.bot) return;

  const thread = message.channel as ThreadChannel;
  const threadId = thread.id;

  const discussion = await getDiscussion(threadId);
  if (!discussion) return;
  const firstMessage: boolean = discussion.firstMessageAt == 0;
  const user = discussion?.user;
  if (!user) return;

  if (discussion.active === false) {
    message.delete().catch((err: Error) => {
      colors.error(err.message);
      message.reply({ embeds: [simpleEmbed(translate(toLocale(user.locale), global.exec.error, { error: err.message }), "error")] });
    });
    thread.setLocked(true);
    return;
  }

  if (discussion.writing == true || discussion?.userId !== message.author.id) {
    message.delete().catch((err: Error) => {
      colors.error(err.message);
      message.reply({ embeds: [simpleEmbed(translate(toLocale(user.locale), global.exec.error, { error: err.message }), "error")] });
    });
    return;
  }

  if (existCache(message.author.id)) {
    message.delete().catch((err: Error) => {
      colors.error(err.message);
      message.reply({ embeds: [simpleEmbed(translate(toLocale(user.locale), global.exec.error, { error: err.message }), "error")] });
    });
    return;
  }

  if (user.usages?.usage == 0) {
    message.reply({
      embeds: [
        simpleEmbed(translate(toLocale(user.locale), global.exec.noMoreUsages), "error"),
        simpleEmbed(translate(toLocale(user.locale), chat.exec.downloadCommand, {
          chatDownload: await findCommand("chat", "download")
        }), "premium", "")
      ]
    });

    colors.error(`${userWithId(message.author)} tried to speak in a thread but he has no more usages`);
    await updateDiscussion(thread.id, { writing: false });
    return;
  }

  updateDiscussion(thread.id, {
    lastMessageAt: DayJS().unix(),
    firstMessageAt: firstMessage ? DayJS().unix() : discussion.firstMessageAt,
    writing: true,
    messages: {
      create: {
        createdAt: DayJS().unix(),
        message: message.content, role: "user",
        tokens: getTokens(message.content),
        userId: user.userId
      }
    },
    count: { increment: 1 }
  });

  setCache(message.author.id, true);
  thread.sendTyping();
  const answered = false;

  const interval = setInterval(async() => {
    if (answered) {
      clearInterval(interval);
      return;
    }

    thread.sendTyping();
  }, 5000);

  let tokens = 0;
  const messages: { content: string; role: "user" | "system" | "assistant" }[] = [];

  discussion.messages.forEach(msg => {
    if (user.isPremium) tokens += Math.round(msg.tokens * 1.5);
    else tokens += msg.tokens;
    messages.push({ content: msg.message, role: msg.role === "bot" ? "assistant" : msg.role });
  });

  messages.push({
    content: message.content,
    role: Role.user
  });

  if (firstMessage) {
    tokens += Math.round((getTokens(message.content) + 200) * (user.isPremium ? 1.5 : 1));
  }

  colors.info(`${userWithId(message.author)} is speaking in a thread: ${limitString(message.content, 50)}`);

  await openai.createChatCompletion({
    messages: messages,
    model: "gpt-3.5-turbo",
    user: user.userId,
    max_tokens: tokens
  }).catch(async(error: Error) => {
    clearInterval(interval);
    deleteCache(message.author.id);
    await updateDiscussion(thread.id, { writing: false });
    colors.error(error.message);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const errorType = error?.response?.data?.error?.type;
    console.log(errorType);
    if (errorType !== "requests") {
      clearInterval(interval);
      deleteCache(message.author.id);
      await updateDiscussion(thread.id, { writing: false, active: false });
      thread.setLocked(true);

      message.reply({ embeds: [
        simpleEmbed(translate(toLocale(user.locale), global.exec.error, {
          error: translate(toLocale(user.locale), global.exec.errorTooLong)
        }), "error")
      ] });
      return;
    }
  }).then(async(response): Promise<CreateChatCompletionResponse | undefined> => {
    clearInterval(interval);

    const answer = response?.data?.choices[0]?.message?.content;
    if (answer == null) return;

    deleteCache(message.author.id);
    separate(answer).texts.forEach(async(msg) => {
      thread.send(msg);
    });

    await updateDiscussion(thread.id, {
      lastMessageAt: DayJS().unix(),
      writing: false,
      messages: {
        create: {
          createdAt: DayJS().unix(),
          tokens: getTokens(answer),
          message: answer,
          role: Role.bot,
          userId: user.userId
        }
      },
      count: { increment: 1 },
      user: { update: { usages: { update: { usage: { decrement: 1 } } } } }
    }).catch(async(error: Error) => {
      await updateDiscussion(thread.id, { writing: false });
      colors.error(error.message);
    });
  });

  if (discussion?.title === "default") {
    await openai.createChatCompletion({
      messages: [{ role: "system", content: systemContext.replace("{LANG}", user.locale) }, { content: message.content, role: "user" }],
      max_tokens: getTokens(systemContext) + getTokens(message.content),
      temperature: 0.4,
      model: "gpt-3.5-turbo"
    }).catch(async(error: Error) => {
      await updateDiscussion(thread.id, { writing: false });
      message.reply("An error occured while trying to resume your message");
      colors.error(error.message);
    }).then(async(response) => {
      const answer = response?.data.choices[0].message?.content;
      if (answer == null) {
        message.reply("An error occured while trying to resume your message");
        return;
      }

      if (await updateDiscussion(thread.id, { title: answer })) {
        thread.setName(limitString(answer, 95));
      } else {
        message.reply("An error occured while trying to resume your message");
      }
    });
  }
};