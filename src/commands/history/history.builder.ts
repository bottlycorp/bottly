import { history } from "./history.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(history.config.name["en-US"])
  .setNameLocalizations(history.config.name)
  .setDescription(history.config.description["en-US"])

  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(history.config.options.page.name["en-US"])
    .setNameLocalizations(history.config.options.page.name)
    .setDescription(history.config.options.page.description["en-US"])
    .setDescriptionLocalizations(history.config.options.page.description))
  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(history.config.options.per.name["en-US"])
    .setNameLocalizations(history.config.options.per.name)
    .setDescription(history.config.options.per.description["en-US"])
    .setDescriptionLocalizations(history.config.options.per.description)
    .setMinValue(5)
    .setMaxValue(20));