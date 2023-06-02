import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonBuilder } from "@discordjs/builders";
import { support } from "./support.config";
import { ButtonStyle } from "discord.js";

export const execute: CommandExecute = async(command) => {
  const embedImage = simpleEmbed("", "info");
  embedImage.setImage(translate(command.locale, support.imgs));
  const embedText = simpleEmbed(
    translate(command.locale, support.exec.embed.description),
    "info",
    translate(command.locale, support.exec.embed.title)
  );

  const button = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel(translate(command.locale, support.buttons.join))
    .setURL("https://discord.gg/tFUJHr2htA");

  command.editReply({
    embeds: [embedImage, embedText],
    components: [{ type: 1, components: [button] }]
  });
};