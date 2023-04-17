import { history } from "./history.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(history.config.name["en-US"])
  .setNameLocalizations(history.config.name)
  .setDescription(history.config.description["en-US"]);