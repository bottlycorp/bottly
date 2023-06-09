import { CommandExecute } from "$core/utils/handler/command";

export const execute: CommandExecute = async(command) => {
  const name = command.options.getString("name", true);
  const question = command.options.getString("question", true);
  console.log(name);
  console.log(question);
};