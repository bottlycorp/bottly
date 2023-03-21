import { simpleEmbed } from "$core/utils/Embed";
import { prisma } from "$core/utils/Prisma";
import { Interaction, TextChannel, ThreadChannel } from "discord.js";
import { chat } from "$resources/messages.json";
import Event from "$core/events/Event";
import { formatLinks, getLang, limit, msg } from "$core/utils/Message";
import { getUser } from "$core/utils/User";
import Client from "$core/Client";

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
        embeds: [simpleEmbed("Vous ne pouvez pas utiliser cette commande dans ce type de salon", "error", { f: interaction.user })],
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
      interaction.reply({ embeds: [simpleEmbed("Une erreur c'est produite", "error", { f: interaction.user })] });
      return;
    }

    const content = interaction.fields.getTextInputValue("content");

    const threadChannel = await channel.threads.create({
      name: limit(content, 50, "..."),
      autoArchiveDuration: 1440,
      reason: "Create a conversation for the user"
    });


    const response = await Client.instance.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ content: content, role: "user" }],
      max_tokens: 1500,
      temperature: 0.9
    });

    let answer: string;
    if (response.data.choices[0].message?.content) answer = response.data.choices[0].message.content;
    else answer = chat.errors.openai[getLang(interaction.locale)];

    // this.create(threadChannel, content, customId, interaction.user.id, interaction.locale, answer);

    await interaction.reply({
      embeds: [simpleEmbed(answer, "success", { f: interaction.user })]
    });

  }

  public create = async(thread: ThreadChannel, content: string, customId: string, userId: string, locale: string, answer?: string): Promise<void> => {
    // await prisma.thread.updateMany({ where: { modalId: customId }, data: { threadId: thread.id } });
    // await prisma.user.update({ where: { id: userId }, data: { chatUsage: { decrement: 1 } } });

    const messages = [
      msg(chat.messages.started[getLang(locale)], [content]),
      formatLinks(answer ?? chat.errors.openai[getLang(locale)])
    ];

    for (const message of messages) {
      console.log(message);
    }
  };

}