import { ask } from "./ask.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(ask.config.name["en-US"])
  .setDescription(ask.config.description["en-US"])
  .setDescriptionLocalizations(ask.config.description)
  .addStringOption(new SlashCommandStringOption()
    .setName("prompt")
    .setDescription(ask.config.options.prompt.description["en-US"])
    .setDescriptionLocalizations(ask.config.options.prompt.description)
    .setRequired(true))
  .addStringOption(new SlashCommandStringOption()
    .setName("context")
    .setDescription(ask.config.options.context.description["en-US"])
    .setDescriptionLocalizations(ask.config.options.context.description)
    .setRequired(false)
    .setAutocomplete(true))
  .addStringOption(new SlashCommandStringOption()
    .setName("lang")
    .setDescription(ask.config.options.lang.description["en-US"])
    .setDescriptionLocalizations(ask.config.options.lang.description)
    .setRequired(false)
    .setAutocomplete(true));