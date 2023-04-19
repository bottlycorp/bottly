import { ask } from "./ask.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(ask.config.name["en-US"])
  .setNameLocalizations(ask.config.name)
  .setDescription(ask.config.description["en-US"])
  .setDescriptionLocalizations(ask.config.description)
  .addStringOption(new SlashCommandStringOption()
    .setName("prompt")
    .setDescription(ask.config.options.prompt.description["en-US"])
    .setRequired(true))
  .addStringOption(new SlashCommandStringOption()
    .setName("context")
    .setDescription(ask.config.options.context.description["en-US"])
    .setRequired(false)
    .setAutocomplete(true));