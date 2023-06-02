import { chat } from "./chat.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(chat.config.name["en-US"])
  .setDescription(chat.config.description["en-US"])
  .setDescriptionLocalizations(chat.config.description)
  .setDMPermission(false)
  .addSubcommand(new SlashCommandSubcommandBuilder()
    .setName(chat.config.subcmds.stop.name["en-US"])
    .setDescription(chat.config.subcmds.stop.description["en-US"])
    .setDescriptionLocalizations(chat.config.subcmds.stop.description))
  .addSubcommand(new SlashCommandSubcommandBuilder()
    .setName(chat.config.subcmds.download.name["en-US"])
    .setDescription(chat.config.subcmds.download.description["en-US"])
    .setDescriptionLocalizations(chat.config.subcmds.download.description))
  .addSubcommand(new SlashCommandSubcommandBuilder()
    .setName(chat.config.subcmds.talk.name["en-US"])
    .setDescription(chat.config.subcmds.talk.description["en-US"])
    .setDescriptionLocalizations(chat.config.subcmds.talk.description)
    .addBooleanOption(new SlashCommandBooleanOption()
      .setName(chat.config.subcmds.talk.options.private.name["en-US"])
      .setDescription(chat.config.subcmds.talk.options.private.description["en-US"])
      .setDescriptionLocalizations(chat.config.subcmds.talk.options.private.description)
      .setRequired(false))
    .addStringOption(new SlashCommandStringOption()
      .setName(chat.config.subcmds.talk.options.context.name["en-US"])
      .setDescription(chat.config.subcmds.talk.options.context.description["en-US"])
      .setDescriptionLocalizations(chat.config.subcmds.talk.options.context.description)
      .setAutocomplete(true)
      .setRequired(false)));