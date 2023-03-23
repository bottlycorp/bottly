import { simpleEmbed } from "$core/utils/embed";
import { prisma } from "$core/utils/prisma";
import { Interaction, TextChannel, ThreadChannel } from "discord.js";
import { chat } from "$resources/messages.json";
import { formatLinks, getLang, limit, msg } from "$core/utils/message";
import { getUser } from "$core/utils/user";
import { updateThread } from "$core/utils/thread";
import Event from "$core/events/event";
import Client from "$core/client";

export default class RequestAutocomplete extends Event {

  constructor() {
    super("interactionCreate", false);
  }

  public async execute(interaction: Interaction): Promise<void> {
    if (!interaction.isModalSubmit()) return;
    const { customId } = interaction;

    if (!interaction.guild) return;

    const member = await interaction.guild.members.fetch(process.env.CLIENT_ID ?? "010101");
    if (!member.permissions.has("CreatePublicThreads") || !member.permissions.has("SendMessages") || !member.permissions.has("ManageMessages")) {
      await interaction.reply({ embeds: [simpleEmbed(chat.errors.permissions[getLang(interaction.locale)], "error", { f: interaction.user })] });
      return;
    }

    const channel = interaction.channel;
    if (!(channel instanceof TextChannel)) {
      await interaction.reply({
        embeds: [simpleEmbed(chat.errors.channel[getLang(interaction.locale)], "error", { f: interaction.user })],
        ephemeral: true
      });
      return;
    }

    const user = await getUser(interaction.user.id);

    if (user.chatUsage <= 0) {
      await interaction.reply({ embeds: [simpleEmbed(chat.errors.trial[getLang(interaction.locale)], "error", { f: interaction.user })] });
      return;
    }

    const thread = await prisma.thread.findFirst({ where: { modalId: customId } });

    if (!thread) {
      interaction.reply({ embeds: [simpleEmbed(chat.errors.thread[getLang(interaction.locale)], "error", { f: interaction.user })] });
      return;
    }

    const content = interaction.fields.getTextInputValue("content");

    await interaction.reply({
      content: chat.messages.creating[getLang(interaction.locale)],
      ephemeral: true
    });

    await Client.instance.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ content: content, role: "user" }],
      max_tokens: 1500,
      temperature: 0.9
    }).then(async response => {
      let answer: string;
      if (response.data.choices[0].message?.content) answer = response.data.choices[0].message.content;
      else answer = chat.errors.openai[getLang(interaction.locale)];

      const threadChannel = await channel.threads.create({
        name: limit(content, 50, "..."),
        autoArchiveDuration: 1440,
        reason: "Create a conversation for the user"
      }).catch(async() => {
        await interaction.editReply({
          content: chat.errors.creating[getLang(interaction.locale)]
        });
      });

      if (!threadChannel) return;

      this.create(threadChannel, content, customId, interaction.user.id, interaction.locale, answer);

      await interaction.editReply({
        content: msg(chat.messages.created[getLang(interaction.locale)], [threadChannel.id])
      });
    }).catch(async() => {
      await interaction.editReply({
        content: chat.errors.response[getLang(interaction.locale)]
      });
    });

  }

  public create = async(thread: ThreadChannel, content: string, customId: string, userId: string, locale: string, answer?: string): Promise<void> => {
    await prisma.thread.updateMany({ where: { modalId: customId }, data: { threadId: thread.id } });
    await prisma.user.update({ where: { id: userId }, data: { chatUsage: { decrement: 1 } } });

    if (!answer) answer = chat.errors.openai[getLang(locale)];

    const messages = [
      msg(chat.messages.started[getLang(locale)], [content]),
      formatLinks(answer ?? chat.errors.openai[getLang(locale)])
    ];

    const msgs = [];
    msgs.push(
      { content: content, role: "user" },
      { content: formatLinks(answer ?? chat.errors.openai[getLang(locale)]), role: "assistant" }
    );

    // @ts-ignore
    await updateThread(thread.id, { messages: msgs });

    if (answer.length >= 1999) {
      const firstMessage = answer.slice(0, 1500);
      const secondMessage = answer.slice(1599, answer.length);

      thread.send(messages[0]).then((m) => {
        m.reply(firstMessage);
        m.reply(secondMessage);
      });
      return;
    }

    thread.send(messages[0]).then((m) => {
      m.reply(messages[1]);
    });
  };

}