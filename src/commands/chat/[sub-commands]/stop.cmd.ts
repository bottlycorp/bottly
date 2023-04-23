import { CommandExecute } from "$core/utils/handler/command";

export const execute: CommandExecute = async(command) => {
  command.editReply("Stop, world!");
};