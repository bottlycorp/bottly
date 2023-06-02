import { favorites } from "./favorites.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(favorites.config.name["en-US"])
  .setDescription(favorites.config.description["en-US"])
  .setDescriptionLocalizations(favorites.config.description)
  .setDMPermission(false)
  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(favorites.config.options.page.name["en-US"])
    .setDescription(favorites.config.options.page.description["en-US"])
    .setDescriptionLocalizations(favorites.config.options.page.description)
    .setMinValue(1))
  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(favorites.config.options.per.name["en-US"])
    .setDescription(favorites.config.options.per.description["en-US"])
    .setDescriptionLocalizations(favorites.config.options.per.description)
    .setMinValue(5)
    .setMaxValue(20));