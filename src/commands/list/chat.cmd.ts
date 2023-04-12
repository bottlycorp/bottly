import { chat } from "$resources/messages.json";
import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  SlashCommandBuilder,
  SlashCommandStringOption,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";
import "dotenv/config";
import { prisma } from "$core/utils/prisma";
import { checkUser } from "$core/utils/user";
import { ChatContextOptions } from "$core/utils/models";
import Command from "$core/commands/command";
import Client from "$core/client";
import { simpleEmbed } from "$core/utils/embed";
import { getLang } from "$core/utils/message";

export default class Ask extends Command {

  public readonly guildOnly = false;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("chat")
    .setDescription(chat.command.description["en-US"])
    .setDescriptionLocalizations({ fr: chat.command.description.fr })
    .addStringOption(new SlashCommandStringOption()
      .setName("context")
      .setDescription(chat.command.options.context["en-US"])
      .setDescriptionLocalizations({ fr: chat.command.options.context.fr })
      .addChoices(...ChatContextOptions.map(c => ({ name: c.name, value: c.value, name_localizations: { fr: c.name_localizations.fr } }))))
    .setDMPermission(false);

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    Client.instance.colors.log("Chat used by " + command.user.tag + " (" + command.user.id + ")");
    const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    if (!command.guild) return;

    const member = await command.guild?.members.fetch(process.env.CLIENT_ID ?? "010101");
    if (
      !member.permissions.has("SendMessages")
      || !member.permissions.has("ManageMessages")
      || !member.permissions.has("EmbedLinks")
      || !member.permissions.has("CreatePublicThreads")
      || !member.permissions.has("SendMessagesInThreads")
    ) {
      await command.reply({ embeds: [simpleEmbed(chat.errors.permissions[getLang(command.locale)], "error", { f: command.user })], ephemeral: true });
      return;
    }

    await checkUser(command.user.id);

    await prisma.thread.create({
      data: {
        modalId: randomId,
        userId: command.user.id,
        guildId: command.guild.id,
        threadId: randomId, // Temporary data, will be updated when the thread is created
        context: command.options.getString("context", false) ?? "default"
      }
    });

    await prisma.stats.create({
      data: {
        userId: command.user.id,
        guildId: command.guild.id,
        type: "chat"
      }
    });

    const modal = new ModalBuilder()
      .setCustomId(randomId)
      .setTitle("Start a conversation")
      .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder()
          .setCustomId("content")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setMinLength(10)
          .setLabel("The question do you want to ask")
          .setPlaceholder("What is the 49.3 ? #France"))
      );

    await command.showModal(modal);
  }

}