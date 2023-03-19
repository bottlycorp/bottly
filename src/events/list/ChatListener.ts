import { Message, MessageType } from "discord.js";
import { checkThread, getThread, updateThread } from "$core/utils/Thread";
import Event from "$core/events/Event";
import Client from "$core/Client";

export default class ChatListener extends Event {

  constructor() {
    super("messageCreate", false);
  }

  public async execute(message: Message): Promise<void> {
    if (!await checkThread(message.channel.id)) return;
    if (message.author.bot) return;

    const channel = message.channel;
    if (!channel.isThread() || message.type !== MessageType.Default || !await checkThread(channel.id)) return;

    const chat = await getThread(channel.id);
    if (chat.active || chat.userId !== message.author.id) {
      try {
        message.delete();
      } catch (error) {
        channel.send("I don't have permission to delete messages, please contact the administrator of the server");
      }
      return;
    }

    await channel.sendTyping();
    await updateThread(channel.id, {
      active: true
    });

    chat.messages.push({ content: message.content, role: "user" });

    if (message.content) {
      try {
        const response = await Client.instance.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          max_tokens: 1500,
          temperature: 0.9,
          messages: chat.messages
        });

        if (response.data.choices[0].message?.content) {
          const content = response.data.choices[0].message.content;

          chat.messages.push({ content: content, role: "assistant" });
          await updateThread(channel.id, chat);
          await channel.send(content);
        }
      } catch (error) {
        console.error(error);
        channel.send("An error occurred while processing your request, please try again later");
      }
    } else {
      try {
        message.delete();
      } catch (error) {
        channel.send("I don't have permission to delete messages, please contact the administrator of the server");
      }
      return;
    }
  }

}