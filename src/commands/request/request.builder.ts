import { request } from "./request.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(request.name["en-US"])
  .setDescription(request.description["en-US"])
  .setDescriptionLocalizations(request.description)
  .setDMPermission(false)
  .addStringOption(new SlashCommandStringOption()
    .setName(request.options.question.name["en-US"])
    .setDescription(request.options.question.description["en-US"])
    .setDescriptionLocalizations(request.options.question.description)
    .setAutocomplete(true)
    .setRequired(true));