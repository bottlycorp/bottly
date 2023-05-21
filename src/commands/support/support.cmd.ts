import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonBuilder } from "@discordjs/builders";
import { support } from "./support.config";
import { ButtonStyle } from "discord.js";

export const execute: CommandExecute = async(command) => {
  const embedImage = simpleEmbed("", "info");
  embedImage.setImage(translate(command.locale, support.config.imgs));
  const embedText = simpleEmbed(
    translate(command.locale, support.config.exec.link),
    "info",
    translate(command.locale, support.config.exec.embedTitle)
  );

  const button = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Join")
    .setURL("https://discord.gg/tFUJHr2htA")
    .setEmoji({ name: "🔗" });

  command.editReply({
    embeds: [embedImage, embedText],
    components: [{ type: 1, components: [button] }]
  });
};