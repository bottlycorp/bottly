import { CommandInteraction, Guild, User } from "discord.js";
import { existsSync, statSync } from "fs";

export const folderExist = (path: string): boolean => {
  return existsSync(path) && statSync(path).isDirectory();
};

export const userWithId = (user: User): string => {
  return `${user.tag} (${user.id})`;
};

export const interactionWithId = (interaction: CommandInteraction): string => {
  return `${interaction.commandName} (${interaction.id})`;
};

export const guildWithId = (guild: Guild): string => {
  return `${guild.name} (${guild.id})`;
};

export const replaceVariables = (content: string, variables: Record<string, string>): string => {
  let msg = content;

  for (const [key, value] of Object.entries(variables)) {
    msg = msg.replace(`{${key}}`, String(value));
  }

  return msg;
};

export const limitString = (content: string, limit: number): string => {
  return content.length > limit ? `${content.slice(0, limit)}...` : content;
};