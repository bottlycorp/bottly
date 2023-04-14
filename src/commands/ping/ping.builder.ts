import { commands } from "$core/utils/config/message/command";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(commands.ping.name["en-US"])
  .setNameLocalizations(commands.ping.name)
  .setDescription(commands.ping.description["en-US"])
  .setDescriptionLocalizations(commands.ping.description);