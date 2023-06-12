import { ask } from "./ask.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(ask.name["en-US"])
  .setDescription(ask.description["en-US"])
  .setDescriptionLocalizations(ask.description)
  .setDMPermission(false)
  .addStringOption(new SlashCommandStringOption()
    .setName("prompt")
    .setDescription(ask.options.prompt.description["en-US"])
    .setDescriptionLocalizations(ask.options.prompt.description)
    .setRequired(true)
    .setMaxLength(500))
  .addStringOption(new SlashCommandStringOption()
    .setName("context")
    .setDescription(ask.options.context.description["en-US"])
    .setDescriptionLocalizations(ask.options.context.description)
    .setRequired(false)
    .setAutocomplete(true))
  .addStringOption(new SlashCommandStringOption()
    .setName("lang")
    .setDescription(ask.options.lang.description["en-US"])
    .setDescriptionLocalizations(ask.options.lang.description)
    .setRequired(false)
    .setAutocomplete(true))
  .addBooleanOption(new SlashCommandBooleanOption()
    .setName("web")
    .setDescription(ask.options.web.description["en-US"])
    .setDescriptionLocalizations(ask.options.web.description)
    .setRequired(false));