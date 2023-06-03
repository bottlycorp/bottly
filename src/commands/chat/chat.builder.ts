import { chat } from "./chat.config";
import { EnableInDev } from "$core/utils/handler";
import { SlashCommandDefition } from "$core/utils/handler/command";
import { SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } from "discord.js";

export const enableInDev: EnableInDev = true;

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
  .setName(chat.name["en-US"])
  .setDescription(chat.description["en-US"])
  .setDescriptionLocalizations(chat.description)
  .setDMPermission(false)
  .addSubcommand(new SlashCommandSubcommandBuilder()
    .setName(chat.subcmds.stop.name["en-US"])
    .setDescription(chat.subcmds.stop.description["en-US"])
    .setDescriptionLocalizations(chat.subcmds.stop.description))
  .addSubcommand(new SlashCommandSubcommandBuilder()
    .setName(chat.subcmds.download.name["en-US"])
    .setDescription(chat.subcmds.download.description["en-US"])
    .setDescriptionLocalizations(chat.subcmds.download.description))
  .addSubcommand(new SlashCommandSubcommandBuilder()
    .setName(chat.subcmds.talk.name["en-US"])
    .setDescription(chat.subcmds.talk.description["en-US"])
    .setDescriptionLocalizations(chat.subcmds.talk.description)
    .addBooleanOption(new SlashCommandBooleanOption()
      .setName(chat.subcmds.talk.options.private.name["en-US"])
      .setDescription(chat.subcmds.talk.options.private.description["en-US"])
      .setDescriptionLocalizations(chat.subcmds.talk.options.private.description)
      .setRequired(false))
    .addStringOption(new SlashCommandStringOption()
      .setName(chat.subcmds.talk.options.context.name["en-US"])
      .setDescription(chat.subcmds.talk.options.context.description["en-US"])
      .setDescriptionLocalizations(chat.subcmds.talk.options.context.description)
      .setAutocomplete(true)
      .setRequired(false)));