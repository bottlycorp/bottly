import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction } from "discord.js"

export interface Command {
  command: SlashCommandBuilder | any,
  execute: (interaction : CommandInteraction) => void,
  autocomplete?: (interaction: AutocompleteInteraction) => void,
  cooldown?: number // in seconds
}

export interface BotEvent {
  name: string,
  once?: boolean | false,
  execute: (...args?) => void
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string,
      CLIENT_ID: string,
    }
  }
}

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>
    cooldowns: Collection<string, number>
  }
}