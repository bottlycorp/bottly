import { CommandExecute } from "$core/utils/handler/command";

export const execute: CommandExecute = async(command) => {
  const name = command.options.getString("name", true);
  const newName = command.options.getString("new-name", true);
  console.log(name);
  console.log(newName);
};