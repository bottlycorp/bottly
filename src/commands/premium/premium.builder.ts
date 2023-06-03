import { premium } from "./premium.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(premium.name["en-US"])
  .setDescription(premium.description["en-US"])
  .setDescriptionLocalizations(premium.description)
  .setDMPermission(false);