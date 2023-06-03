import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { roadmap } from "./roadmap.config";
import { findCommand } from "$core/utils/handler/command/command";

export const execute: CommandExecute = async(command) => {
  const embed = simpleEmbed(undefined, "info", translate(command.locale, roadmap.exec.embedTitle), {
    text: command.user.username,
    icon_url: command.user.displayAvatarURL() ?? undefined,
    timestamp: true
  });

  let description = "";
  description += translate(command.locale, roadmap.exec.june, {
    cmdAsk: await findCommand("ask"),
    cmdChat: await findCommand("chat", "talk")
  });
  description += "\n\n" + translate(command.locale, roadmap.exec.priorityText);

  embed.setDescription(description);
  command.editReply({ embeds: [embed] });
};