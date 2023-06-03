import { history } from "./history.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(history.name["en-US"])
  .setDescription(history.description["en-US"])
  .setDescriptionLocalizations(history.description)
  .setDMPermission(false)
  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(history.options.page.name["en-US"])
    .setDescription(history.options.page.description["en-US"])
    .setDescriptionLocalizations(history.options.page.description)
    .setMinValue(1))
  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(history.options.per.name["en-US"])
    .setDescription(history.options.per.description["en-US"])
    .setDescriptionLocalizations(history.options.per.description)
    .setMinValue(5)
    .setMaxValue(20));