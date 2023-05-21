import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { support } from "./learn.config";

export const execute: CommandExecute = async(command) => {
  const embedImage = simpleEmbed(undefined, "info", undefined, undefined, undefined, translate(command.locale, support.config.imgs));
  const embedText = simpleEmbed(
    translate(command.locale, support.config.exec.embed.description),
    "info",
    translate(command.locale, support.config.exec.embed.title)
  );

  command.editReply({
    embeds: [embedImage, embedText]
  });
};