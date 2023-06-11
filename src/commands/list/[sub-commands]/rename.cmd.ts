import { translate } from "$core/utils/config/message/message.util";
import { renameList } from "$core/utils/data/list";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { list } from "../list.config";

export const execute: CommandExecute = async(command, user) => {
  const name = command.options.getString("name", true);
  const newName = command.options.getString("new-name", true);

  const selected = user.lists.find((list) => list.id === name);
  if (selected == null) {
    command.editReply({
      embeds: [simpleEmbed(translate(command.locale, list.exec["rename"]["not-found"], {
        name: name
      }), "error")]
    });
    return;
  }

  if (user.lists.find((list) => list.name === newName)) {
    command.editReply({
      embeds: [simpleEmbed(translate(command.locale, list.exec["rename"]["already-exists"], {
        name: selected.name,
        newName: newName
      }), "error")]
    });
    return;
  }

  await renameList(selected.id, newName);
  command.editReply({
    embeds: [simpleEmbed(translate(command.locale, list.exec["rename"]["renamed"], {
      name: selected.name,
      newName: newName
    }), "success")]
  });
};