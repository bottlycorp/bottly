import { request } from "./request.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(request.config.name["en-US"])
  .setNameLocalizations(request.config.name)
  .setDescription(request.config.description["en-US"])
  .setDescriptionLocalizations(request.config.description)
  .addStringOption(new SlashCommandStringOption()
    .setName(request.config.options.question.name["en-US"])
    .setDescription(request.config.options.question.description["en-US"])
    .setDescriptionLocalizations(request.config.options.question.description)
    .setAutocomplete(true)
    .setRequired(true));