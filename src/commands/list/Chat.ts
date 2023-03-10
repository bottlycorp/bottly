import Client from "$core/Client";
import Command from "$core/commands/Command";
import { chat } from "$resources/messages.json";
import { TextChannel, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export default class Ask extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("chat")
    .setDescription(chat.command.description["en-US"])
    .setDescriptionLocalizations({ fr: chat.command.description.fr })
    .addStringOption(new SlashCommandStringOption()
      .setName("question")
      .setDescription(chat.command.options.question["en-US"])
      .setDescriptionLocalizations({ fr: chat.command.options.question.fr })
      .setRequired(true));

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.deferReply({ ephemeral: true });
    const question = command.options.getString("question", true);

    const channel = command.channel;
    if (!(channel instanceof TextChannel)) return;

    const thread = await channel.threads.create({
      name: `Chat with ${command.user.username}`,
      autoArchiveDuration: 60,
      reason: "Chat with the bot"
    });

    await thread.members.add(command.user.id);

    const response = await Client.instance.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1500,
      temperature: 0.9,
      messages: [{ content: question, name: "User", role: "user" }]
    });

    thread.send(response.data.choices[0].message?.content ?? "I don't know what to say...");

    await command.editReply({
      content: `Your chat has been created: ${thread}`
    });
  }

}