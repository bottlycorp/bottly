import { translate } from "$core/utils/config/message/message.util";
import { simpleButton, simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { privacy } from "./privacy.config";
import { ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

export const execute: CommandExecute = async(command, user) => {
  const autoDelete = user.privacy?.autoDelete;
  const collectChat = user.privacy?.collectChat;

  const embed = simpleEmbed(
    translate(command.locale, privacy.config.exec.embed.description),
    "info",
    translate(command.locale, privacy.config.exec.embed.title),
    { text: command.user.username, icon_url: command.user.avatarURL() ?? undefined, timestamp: true }
  );

  const autoDeleteButton: ButtonBuilder = simpleButton(
    undefined, autoDelete ? ButtonStyle.Secondary : ButtonStyle.Primary, "auto-delete", false, { animated: false, name: "💾" }
  );

  const collectChatButton: ButtonBuilder = simpleButton(
    undefined, collectChat ? ButtonStyle.Secondary : ButtonStyle.Primary, "collect-chat", false, { animated: false, name: "🔥" }
  );

  const deleteButton: ButtonBuilder = simpleButton(undefined, ButtonStyle.Danger, "delete", false, { animated: false, name: "🗑️" });

  const buttons: ButtonBuilder[] = [autoDeleteButton, collectChatButton, deleteButton];
  command.editReply({ embeds: [embed], components: [{ type: 1, components: buttons }] });
};