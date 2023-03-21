import { simpleEmbed } from "$core/utils/Embed";
import { prisma } from "$core/utils/Prisma";
import { Interaction, TextChannel, ThreadChannel } from "discord.js";
import { chat } from "$resources/messages.json";
import Event from "$core/events/Event";
import { formatLinks, getLang, limit, msg } from "$core/utils/Message";
import { getUser } from "$core/utils/User";
import Client from "$core/Client";
import { updateThread } from "$core/utils/Thread";

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

    await interaction.reply({
      content: "<a:typing:1087703097498931290> Votre conversation est en cours de création",
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
          content: ":thermometer_face: Quelque chose ne c'est pas passé comme prévu lors de la création du salon, réesseyez plus tard"
          + "et si le problème persiste vérifier que le robot à les permissions nécessaire, ou contactez le support"
        });
      });

      if (!threadChannel) return;

      this.create(threadChannel, content, customId, interaction.user.id, interaction.locale, answer);

      await interaction.editReply({
        content: ":kissing: Votre conversation a été créee avec succès, vous pouvez la retrouver dans le salon <#" + threadChannel.id + ">"
      });
    }).catch(async() => {
      await interaction.editReply({
        content: ":head_bandage: Quelque chose ne c'est pas passé comme prévu, réesseyez plus tard et si le problème persiste, contactez le support"
      });
    });

  }

  public create = async(thread: ThreadChannel, content: string, customId: string, userId: string, locale: string, answer?: string): Promise<void> => {
    await prisma.thread.updateMany({ where: { modalId: customId }, data: { threadId: thread.id } });
    await prisma.user.update({ where: { id: userId }, data: { chatUsage: { decrement: 1 } } });

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

    thread.send(messages[0]).then((m) => {
      m.reply(messages[1]);
    });
  };

}