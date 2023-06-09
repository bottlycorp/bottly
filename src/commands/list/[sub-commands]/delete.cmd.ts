import { CommandExecute } from "$core/utils/handler/command";

export const execute: CommandExecute = async(command) => {
  const name = command.options.getString("name", true);
  console.log(name);
};