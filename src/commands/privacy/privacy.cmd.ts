import { translate } from "$core/utils/config/message/message.util";
import { getMaxUsage, updateUser } from "$core/utils/data/user";
import { simpleButton, simpleEmbed } from "$core/utils/embed";
import { delay } from "$core/utils/function";
import { CommandExecute } from "$core/utils/handler/command";
import { prisma } from "$core/utils/prisma";
import { privacy } from "./privacy.config";
import { ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

export const execute: CommandExecute = async(command, user) => {
  let autoDelete = user.privacy?.autoDelete;
  let collectChat = user.privacy?.collectChat;

  const embed = simpleEmbed(
    translate(command.locale, privacy.exec.embed.description),
    "info",
    translate(command.locale, privacy.exec.embed.title),
    { text: command.user.username, icon_url: command.user.avatarURL() ?? undefined, timestamp: true }
  );

  const autoDeleteButton: ButtonBuilder = simpleButton(
    undefined, autoDelete ? ButtonStyle.Primary : ButtonStyle.Secondary, "auto-delete", false, { animated: false, name: "🔥" }
  );

  const collectChatButton: ButtonBuilder = simpleButton(
    undefined, collectChat ? ButtonStyle.Primary : ButtonStyle.Secondary, "collect-chat", false, { animated: false, name: "💾" }
  );

  const deleteButton: ButtonBuilder = simpleButton(undefined, ButtonStyle.Danger, "delete", false, { animated: false, name: "🗑️" });
  const yesButton: ButtonBuilder = simpleButton(undefined, ButtonStyle.Secondary, "yes", false, { animated: false, name: "✅" });
  const returnButton: ButtonBuilder = simpleButton(undefined, ButtonStyle.Secondary, "return", false, { animated: false, name: "❌" });
  const returnButton2: ButtonBuilder = simpleButton(undefined, ButtonStyle.Secondary, "return2", false, { animated: false, name: "↩️" });

  const message = command.editReply({ embeds: [embed], components: [{ type: 1, components: [collectChatButton, autoDeleteButton, deleteButton] }] });

  const collector = (await message).createMessageComponentCollector({ time: 60000 });

  collector.on("collect", async(interaction) => {
    interaction.deferUpdate();

    switch (interaction.customId) {
      case "auto-delete":
        autoDelete = !autoDelete;
        break;
      case "collect-chat":
        collectChat = !collectChat;
        break;
    }

    await delay(1000);

    if (interaction.customId == "delete") {
      await interaction.editReply({ embeds: [simpleEmbed(
        translate(command.locale, privacy.exec.deleteEmbed.description),
        "error",
        translate(command.locale, privacy.exec.deleteEmbed.title),
        { text: command.user.username, icon_url: command.user.avatarURL() ?? undefined, timestamp: true }
      )], components: [{ type: 1, components: [yesButton, returnButton] }] });
      return;
    } else if (interaction.customId == "yes") {
      await prisma.discussion.deleteMany({ where: { userId: user.userId } });
      await prisma.question.deleteMany({ where: { userId: user.userId } });
      await prisma.tips.update({ where: { userId: user.userId }, data: { chatPremiumSaveIt: true } });

      await interaction.editReply({ embeds: [simpleEmbed(
        translate(command.locale, privacy.exec.deleted.description, {
          username: command.user.username,
          usage: user.usages?.usage ?? 5,
          usageMax: getMaxUsage(user)
        }),
        "error",
        translate(command.locale, privacy.exec.deleted.title),
        { text: command.user.username, icon_url: command.user.avatarURL() ?? undefined, timestamp: true }
      )], components: [{ type: 1, components: [returnButton2] }] });
      return;
    } else if (interaction.customId == "return2" || interaction.customId == "return") {
      interaction.editReply({ embeds: [embed], components: [{ type: 1, components: [
        collectChatButton.setStyle(collectChat ? ButtonStyle.Primary : ButtonStyle.Secondary),
        autoDeleteButton.setStyle(autoDelete ? ButtonStyle.Primary : ButtonStyle.Secondary),
        deleteButton
      ] }] });
      return;
    }

    updateUser(user.userId, {
      privacy: {
        update: {
          autoDelete: autoDelete,
          collectChat: collectChat
        }
      }
    });

    await interaction.editReply({ components: [{ type: 1, components: [
      collectChatButton.setStyle(collectChat ? ButtonStyle.Primary : ButtonStyle.Secondary),
      autoDeleteButton.setStyle(autoDelete ? ButtonStyle.Primary : ButtonStyle.Secondary),
      deleteButton
    ] }] });
  });
};