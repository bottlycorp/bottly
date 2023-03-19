import { getUsageButton, simpleEmbed } from "$core/utils/Embed";
import { limit, msg, getLang } from "$core/utils/Message";
import { createThread } from "$core/utils/Thread";
import { checkUser, getUser, isPremium } from "$core/utils/User";
import { chat } from "$resources/messages.json";
import { TextChannel, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Client from "$core/Client";
import Command from "$core/commands/Command";
import dayjs from "dayjs";
import { prisma } from "$core/utils/Prisma";

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
    const question = command.options.getString("question", true);
    await command.deferReply({ ephemeral: true });
    await checkUser(command.user.id);
    const user = await getUser(command.user.id);
    const isPremiumUser = isPremium(user);

    if (!isPremiumUser) {
      if (user.chatUsage <= 0) {
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

    const member = await channel.guild.members.fetch(command.user.id);
    if (channel.permissionsFor(member).has("ManageMessages")) {
      await command.editReply({ content: "I need the permission to manage messages, for delete optionals messages." });
      return;
    }

    const response = await Client.instance.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1500,
      temperature: 0.9,
      messages: [{ content: question, name: "User", role: "user" }]
    });

    const thread = await channel.threads.create({ name: limit(question, 50, "..."), autoArchiveDuration: 60, reason: "Chat with the bot" });
    thread.members.add(command.user.id);

    const responseText = response.data.choices[0].message?.content;
    thread.send(msg(chat.command.messages.started[getLang(command.locale)], [question]));
    thread.send(responseText ?? "An communication error with OpenAI has occured.");

    await prisma.stats.create({
      data: {
        createdAt: dayjs().toDate(),
        guildId: command.guild?.id ?? "DM",
        userId: command.user.id,
        type: "chat"
      }
    });

    await createThread(thread.id, {
      userId: command.user.id,
      guildId: command.guildId ?? "",
      messages: [{ content: question, role: "user" }]
    });

    if (isPremiumUser) {
      await command.editReply({
        content: `Your chat has been created: ${thread}`
      });
    } else {
      const user = await prisma.user.update({
        where: { id: command.user.id },
        data: { chatUsage: { decrement: 1 } }
      });

      await command.editReply({
        content: `Your chat has been created: ${thread}`,
        components: [{ type: 1, components: [getUsageButton(user.chatUsage)] }]
      });
    }
  }

}