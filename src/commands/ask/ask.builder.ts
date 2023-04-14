import { commands } from "$core/utils/config/message/command";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(commands.ask.name["en-US"])
  .setNameLocalizations(commands.ask.name)
  .setDescription(commands.ask.description["en-US"])
  .setDescriptionLocalizations(commands.ask.description)
  .addStringOption(new SlashCommandStringOption()
    .setName("question")
    .setDescription(commands.ask.options.question.description["en-US"])
    .setRequired(true));