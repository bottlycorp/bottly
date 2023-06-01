import { learn } from "./learn.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(learn.config.name["en-US"])
  .setDescription(learn.config.description["en-US"])
  .setDescriptionLocalizations(learn.config.description);