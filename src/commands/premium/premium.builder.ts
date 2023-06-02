import { premium } from "./premium.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(premium.config.name["en-US"])
  .setDescription(premium.config.description["en-US"])
  .setDescriptionLocalizations(premium.config.description)
  .setDMPermission(false);