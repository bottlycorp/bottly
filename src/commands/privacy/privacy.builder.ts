import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";
import { privacy } from "./privacy.config";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(privacy.name["en-US"])
  .setDescription(privacy.description["en-US"])
  .setDescriptionLocalizations(privacy.description)
  .setDMPermission(false);