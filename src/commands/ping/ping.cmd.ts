import { commands } from "$core/utils/config/message/command";
import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { CommandInteraction } from "discord.js";

export const execute: CommandExecute = async(command: CommandInteraction) => {
  command.reply({
    embeds: [simpleEmbed(translate(command.locale, commands.ping.exec.success, {
      timestamp: Date.now() - command.createdTimestamp
    }))],
    ephemeral: true
  });
};