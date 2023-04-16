import { ChatInputCommandInteraction, Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, TextChannel } from "discord.js";

export type SlashCommandDefition = SlashCommandSubcommandsOnlyBuilder |
  Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">;

export type CommandExecute = (command: ChatInputCommandInteraction, channel: TextChannel) => Promise<void>;

export type LoadedCommands = {
  commands: CommandsCollection;
  builders: CommandsBuilderCollection;
}

export type CommandsCollection = Collection<string, CommandExecute>;
export type CommandsBuilderCollection = Collection<string, SlashCommandDefition>;