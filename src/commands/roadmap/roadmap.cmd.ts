import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { roadmap } from "./roadmap.config";
import { TextChannel } from "discord.js";
import { userWithId } from "$core/utils/function";
import { global } from "$core/utils/config/message/command";
import { findCommand } from "$core/utils/handler/command/command";

export const execute: CommandExecute = async(command) => {
  const channel = command.channel;
  if (!(channel instanceof TextChannel)) {
    command.editReply(translate(command.locale, global.config.exec.notInATextChannel));

    colors.error(userWithId(command.user) + " tried to get the roadmap while not being in a text channel");
    return;
  }

  const embed = simpleEmbed("cc", "info", translate(command.locale, roadmap.config.exec.embedTitle), {
    text: command.user.username,
    icon_url: command.user.displayAvatarURL() ?? undefined,
    timestamp: true
  });

  let description = "";
  description += translate(command.locale, roadmap.config.exec.may);
  description += "\n\n";
  description += translate(command.locale, roadmap.config.exec.june, {
    cmdAsk: await findCommand("ask"),
    cmdChat: await findCommand("chat", "talk")
  });
  description += "\n\n" + translate(command.locale, roadmap.config.exec.priorityText);

  embed.setDescription(description);

  command.editReply({ embeds: [embed] });
};