import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { support } from "./support.config";

export const execute: CommandExecute = async(command) => {
  const embedImage = simpleEmbed("", "info");
  embedImage.setImage("https://cdn.discordapp.com/attachments/927843710669062204/1106514543829590097/Group_18.png");
  const embedText = simpleEmbed(support.config.exec.link, "info", translate(command.locale, support.config.exec.embedTitle));

  command.editReply({ embeds: [embedImage, embedText]});
};