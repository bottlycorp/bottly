import { CommandExecute } from "$core/utils/handler/command";
import { CommandInteraction, TextChannel } from "discord.js";

export const execute: CommandExecute = async() => {
  console.log("Hello World!");
};