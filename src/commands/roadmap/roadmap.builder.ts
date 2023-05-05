import { roadmap } from "./roadmap.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(roadmap.config.name["en-US"])
  .setDescription(roadmap.config.description["en-US"])
  .setDescriptionLocalizations(roadmap.config.description);