import { history } from "./history.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(history.config.name["en-US"])
  .setDescription(history.config.description["en-US"])
  .setDescriptionLocalizations(history.config.description)
  .setDMPermission(false)
  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(history.config.options.page.name["en-US"])
    .setDescription(history.config.options.page.description["en-US"])
    .setDescriptionLocalizations(history.config.options.page.description)
    .setMinValue(1))
  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(history.config.options.per.name["en-US"])
    .setDescription(history.config.options.per.description["en-US"])
    .setDescriptionLocalizations(history.config.options.per.description)
    .setMinValue(5)
    .setMaxValue(20));