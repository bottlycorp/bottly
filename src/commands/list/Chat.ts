import { chat } from "$resources/messages.json";
import Command from "$core/commands/Command";
import { ActionRowBuilder, ChatInputCommandInteraction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import "dotenv/config";
import { prisma } from "$core/utils/Prisma";
import { checkUser } from "$core/utils/User";

export default class Ask extends Command {

  public readonly guildOnly = false;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("chat")
    .setDescription(chat.command.description["en-US"])
    .setDescriptionLocalizations({ fr: chat.command.description.fr })
    .setDMPermission(false);

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    if (!command.guild) return;

    await checkUser(command.user.id);

    await prisma.thread.create({
      data: {
        modalId: randomId,
        userId: command.user.id,
        guildId: command.guild.id,
        threadId: randomId // Temporary data, will be updated when the thread is created
      }
    });

    const modal = new ModalBuilder()
      .setCustomId(randomId)
      .setTitle("Démarrez une conversation")
      .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder()
          .setCustomId("content")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setMinLength(10)
          .setLabel("La question initiale de la conversation")
          .setPlaceholder("Qu'es ce que le 49.3"))
      );

    await command.showModal(modal);
  }

}