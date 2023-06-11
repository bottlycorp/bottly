import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { findCommand } from "$core/utils/handler/command/command";
import { list } from "../list.config";

export const execute: CommandExecute = async(command, user) => {
  const name = command.options.getString("name", true);

  if (!user.lists.find(list => list.id === name)) {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, list.exec["not-found"], {
      name: name,
      cmdListCreate: await findCommand("list", "create")
    }), "error")] });
    return;
  }
};