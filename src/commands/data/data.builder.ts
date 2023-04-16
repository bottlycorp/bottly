import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";
import { data } from "./data.config";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(data.config.name["en-US"])
  .setNameLocalizations(data.config.name)
  .setDescription(data.config.description["en-US"])
  .setDescriptionLocalizations(data.config.description);