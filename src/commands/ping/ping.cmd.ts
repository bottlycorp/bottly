import { commands } from "$core/utils/config/message/command";
import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";

export const execute: CommandExecute = async(command) => {
  command.reply({
    embeds: [simpleEmbed(translate(commands.ping.exec.success, {
      timestamp: Date.now() - command.createdTimestamp
    }))],
    ephemeral: true
  });
};