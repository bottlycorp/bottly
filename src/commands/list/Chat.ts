import { simpleEmbed } from "$core/utils/Embed";
import { limit, msg, getLang } from "$core/utils/Message";
import { createThread } from "$core/utils/Thread";
import { checkUser, getUser, isPremium } from "$core/utils/User";
import { chat } from "$resources/messages.json";
import { TextChannel, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Client from "$core/Client";
import Command from "$core/commands/Command";

export default class Ask extends Command {

  public readonly guildOnly = false;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("chat")
    .setDescription(chat.command.description["en-US"])
    .setDescriptionLocalizations({ fr: chat.command.description.fr })
    .addStringOption(new SlashCommandStringOption()
      .setName("question")
      .setDescription(chat.command.options.question["en-US"])
      .setDescriptionLocalizations({ fr: chat.command.options.question.fr })
      .setRequired(true))
    .addStringOption(new SlashCommandStringOption()
      .setName("title")
      .setDescription(chat.command.options.title["en-US"])
      .setDescriptionLocalizations({ fr: chat.command.options.title.fr })
      .setRequired(false))
    .setDMPermission(false);

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.deferReply({ ephemeral: true });
    const question = command.options.getString("question", true);
    await checkUser(command.user.id);
    const user = await getUser(command.user.id);
    const isPremiumUser = isPremium(user);

    if (!isPremiumUser) {
      if ((await getUser(command.user.id)).askUsage == 0) {
        command.editReply({
          embeds: [simpleEmbed(chat.errors.trial[getLang(command.locale)], "error", { f: command.user })]
        });
        return;
      }
    }

    const channel = command.channel;
    if (!(channel instanceof TextChannel)) {
      await command.editReply({ content: "You must execute this command in a text channel." });
      return;
    }

    const thread = await channel.threads.create({
      name: limit(question, 50, "..."),
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

    await thread.sendTyping();

    const responseText = response.data.choices[0].message?.content ?? "I don't know what to say...";
    thread.send(msg(chat.command.messages.started[getLang(command.locale)], [question]));
    thread.send(responseText);

    await createThread(thread.id, {
      userId: command.user.id,
      guildId: command.guildId ?? "",
      messages: [{ content: question, role: "user" }]
    });

    await command.editReply({
      content: `Your chat has been created: ${thread}`
    });
  }

}