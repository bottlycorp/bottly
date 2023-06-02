import { roadmap } from "./roadmap.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(roadmap.name["en-US"])
  .setDescription(roadmap.description["en-US"])
  .setDescriptionLocalizations(roadmap.description)
  .setDMPermission(false);