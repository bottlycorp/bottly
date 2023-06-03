import { favorites } from "./favorites.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(favorites.name["en-US"])
  .setDescription(favorites.description["en-US"])
  .setDescriptionLocalizations(favorites.description)
  .setDMPermission(false)
  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(favorites.options.page.name["en-US"])
    .setDescription(favorites.options.page.description["en-US"])
    .setDescriptionLocalizations(favorites.options.page.description)
    .setMinValue(1))
  .addIntegerOption(new SlashCommandIntegerOption()
    .setName(favorites.options.per.name["en-US"])
    .setDescription(favorites.options.per.description["en-US"])
    .setDescriptionLocalizations(favorites.options.per.description)
    .setMinValue(5)
    .setMaxValue(20));