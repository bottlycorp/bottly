import { openai } from "$core/client";
import { existDiscussion, getDiscussion } from "$core/utils/data/discussion";
import { limitString } from "$core/utils/function";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { Message, ThreadChannel } from "discord.js";

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

  thread.sendTyping();
  const answered = false;

  const interval = setInterval(async() => {
    if (answered) {
      clearInterval(interval);
      return;
    }

    thread.sendTyping();
  }, 5000);

  if (!await existDiscussion(threadId)) return;

  const discussion = await getDiscussion(threadId);
  if (discussion == null) {
    clearInterval(interval);
    message.delete();
    return;
  }

  if (discussion.active === false) {
    clearInterval(interval);
    message.delete();
    thread.setLocked(true);
    return;
  }

  if (discussion?.userId !== message.author.id) {
    clearInterval(interval);
    message.delete();
    return;
  }

  await openai.createChatCompletion({
    messages: [{ content: message.content, role: "user" }],
    model: "gpt-3.5-turbo",
    max_tokens: 4000
  }).catch((error: Error) => {
    clearInterval(interval);
    console.error(error);
    message.reply("An error occured while trying to reply to your message");
  }).then((response) => {
    const answer = response?.data.choices[0].message?.content;
    if (answer == null) {
      message.reply("An error occured while trying to reply to your message");
      return;

    }

    clearInterval(interval);
    thread.send(limitString(answer, 2000));
  });

  if (discussion?.title === "default") {
    await openai.createCompletion({
      prompt: `What is context of this text: "${limitString(message.content, 50)}" in 60 characters or less, in the same language as the text`,
      max_tokens: 4000,
      temperature: 0.4,
      model: "text-davinci-003"
    }).catch((error: Error) => {
      clearInterval(interval);
      console.error(error);
      message.reply("An error occured while trying to resume your message");
    }).then((response) => {
      const answer = response?.data.choices[0].text;
      if (answer == null) {
        message.reply("An error occured while trying to resume your message");
        return;
      }

      thread.setName(limitString(answer, 50));
    });
  }
};