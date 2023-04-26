import { openai } from "$core/client";
import { deleteCache, existCache, setCache } from "$core/utils/cache";
import { global } from "$core/utils/config/message/command";
import { translate } from "$core/utils/config/message/message.util";
import { existDiscussion, getDiscussion, updateDiscussion } from "$core/utils/data/discussion";
import { updateUser } from "$core/utils/data/user";
import { DayJS } from "$core/utils/day-js";
import { simpleEmbed } from "$core/utils/embed";
import { limitString } from "$core/utils/function";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { getTokens } from "$core/utils/tokenizer";
import { Locale, Message, ThreadChannel } from "discord.js";

export const enableInDev: EnableInDev = true;

export const event: EventName = "messageCreate";

export const execute: EventExecute<"messageCreate"> = async(message: Message) => {
  if (!message.inGuild()) return;
  if (!message.channel.isThread()) return;
  if (message.content.startsWith(".")) return;
  if (message.mentions.users.size > 0) return;
  if (message.author.bot) return;

  const thread = message.channel as ThreadChannel;
  const threadId = thread.id;

  if (!await existDiscussion(threadId)) return;

  const discussion = await getDiscussion(threadId);
  if (discussion == null) {
    message.delete();
    return;
  }

  if (discussion.active === false) {
    message.delete();
    thread.setLocked(true);
    return;
  }

  if (discussion.writing == true || discussion?.userId !== message.author.id) {
    message.delete();
    return;
  }

  await updateDiscussion(thread.id, {
    lastMessageAt: DayJS().unix(),
    writing: true,
    messages: {
      create: {
        message: message.content,
        isBot: false
      }
    }
  });

  if (existCache(message.author.id)) {
    message.delete();
    return;
  }

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
  const messages: {
    content: string;
    role: "user" | "system" | "assistant";
  }[] = [];

  discussion.messages.forEach(msg => {
    tokens += getTokens(msg.message);
    messages.push({
      content: msg.message,
      role: msg.isBot ? "assistant" : "user"
    });
  });

  messages.push({
    content: message.content,
    role: "user"
  });

  await openai.createChatCompletion({
    messages: messages,
    model: "gpt-3.5-turbo",
    max_tokens: tokens + 100,
    stream: true
  }).catch((error: Error) => {
    clearInterval(interval);
    console.error(error);
    message.reply({ embeds: [simpleEmbed(translate(Locale.EnglishUS, global.config.exec.error, { error: error.message }), "error")] });
    deleteCache(message.author.id);
  }).then(async(response) => {
    const answer = response?.data.choices[0].message?.content;
    if (answer == null) {
      message.reply({ embeds: [simpleEmbed(translate(Locale.EnglishUS, global.config.exec.error, {  error: "No answer" }), "error")] });
      return;
    }

    clearInterval(interval);
    await updateDiscussion(thread.id, { lastMessageAt: DayJS().unix(), writing: false, messages: { create: { message: answer, isBot: true } } });
    await updateUser(message.author.id, { usages: { update: { usage: { decrement: 1 } } } });
    deleteCache(message.author.id);
    thread.send(limitString(answer, 2000)); // TODO: If the message is too long, split it in multiple messages
  });

  if (discussion?.title === "default") {
    await openai.createChatCompletion({
      messages: [
        { role: "system",
          content: [
            "Make me a title from the text in the language of the message without specifying it in the title.",
            "Without writing anything other than the answer, without any text."
          ].join(" ")
        },
        { content: message.content, role: "user" }
      ],
      max_tokens: 4000,
      temperature: 0.4,
      model: "gpt-3.5-turbo"
    }).catch((error: Error) => {
      console.error(error);
      message.reply("An error occured while trying to resume your message");
    }).then(async(response) => {
      const answer = response?.data.choices[0].message?.content;
      if (answer == null) {
        message.reply("An error occured while trying to resume your message");
        return;
      }

      if (await updateDiscussion(thread.id, { title: limitString(answer, 50) })) {
        thread.setName(limitString(answer, 50));
      } else {
        message.reply("An error occured while trying to resume your message");
      }
    });
  }
};