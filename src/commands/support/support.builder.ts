import { support } from "./support.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(support.config.name["en-US"])
  .setDescription(support.config.description["en-US"])
  .setDescriptionLocalizations(support.config.description);