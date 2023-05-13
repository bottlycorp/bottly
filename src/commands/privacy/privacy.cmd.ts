import { translate } from "$core/utils/config/message/message.util";
import { updateUser } from "$core/utils/data/user";
import { simpleButton, simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { privacy } from "./privacy.config";
import { ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

export const execute: CommandExecute = async(command, user) => {
  let autoDelete = user.privacy?.autoDelete;
  let collectChat = user.privacy?.collectChat;

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

  const message = command.editReply({ embeds: [embed], components: [{ type: 1, components: [autoDeleteButton, collectChatButton, deleteButton] }] });

  const collector = (await message).createMessageComponentCollector({ time: 60000 });

  collector.on("collect", async(interaction) => {
    switch (interaction.customId) {
      case "auto-delete":
        autoDelete = !autoDelete;
        break;
      case "collect-chat":
        collectChat = !collectChat;
        break;
    }

    await updateUser(user.userId, { privacy: { update: {
      autoDelete,
      collectChat
    } } });

    await updateUser(user.userId, {
      privacy: {
        update: {
          autoDelete,
          collectChat
        }
      }
    });

    await interaction.update({ embeds: [embed] });
  });
};