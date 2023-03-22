import { Message, MessageType } from "discord.js";
import { checkThread, getThread, updateThread } from "$core/utils/Thread";
import Event from "$core/events/Event";
import Client from "$core/Client";
import { formatLinks } from "$core/utils/Message";

export default class ChatListener extends Event {

  constructor() {
    super("messageCreate", false);
  }

  public async execute(message: Message): Promise<void> {
    if (!await checkThread(message.channel.id)) return;
    const thread = await getThread(message.channel.id);

    if (message.mentions.users.size > 0) return;
    if (message.content.startsWith(".")) return;

    if (!thread) return;
    if (thread.active && message.author.id !== Client.instance.user?.id) {
      message.delete();
      return;
    }

    const channel = message.channel;
    if (!channel.isThread() || message.type !== MessageType.Default || !await checkThread(channel.id)) return;

    if (message.author.bot && message.author.id !== Client.instance.user?.id) {
      message.delete();
      return;
    }

    if (message.author.id !== thread?.userId && message.author.id !== Client.instance.user?.id) {
      message.delete();
      return;
    }

    if (message.author.bot) return;
    channel.sendTyping();

    await updateThread(channel.id, { active: true });

    thread.messages.push({ content: message.content, role: "user" });

    const response = await Client.instance.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: thread.messages,
      max_tokens: 1500,
      temperature: 0.9
    });

    await updateThread(channel.id, { messages: thread.messages });

    if (!response.data.choices[0].message?.content) {
      await message.reply(formatLinks("An error has occurred, or no response was found"));
      return;
    }

    if (response.data.choices[0].message?.content?.length > 1500) {
      const firstMessage = response.data.choices[0].message?.content?.slice(0, 1500);
      const secondMessage = response.data.choices[0].message?.content?.slice(1500, response.data.choices[0].message?.content?.length);

      await message.reply(formatLinks(firstMessage ?? "An error has occurred, or no response was found")).then(() => {
        message.reply(formatLinks(secondMessage ?? "An error has occurred, or no response was found"));
        updateThread(channel.id, { active: false });
      });
      return;
    }

    await message.reply(formatLinks(response.data.choices[0].message?.content)).then(() => {
      updateThread(channel.id, { active: false });
    });
  }

}