import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { findCommand } from "$core/utils/handler/command/command";
import { list } from "../list.config";

export const execute: CommandExecute = async(command, user) => {
  if (user.lists.length === 0) {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["no-lists"], {
      cmdListNew: await findCommand("list", "create"),
      cmdListAdd: await findCommand("list", "add")
    }), "error")] });
    return;
  }
};