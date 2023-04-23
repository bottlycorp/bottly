import { colors } from "$core/client";
import { APIMessageComponentEmoji, CommandInteraction, Guild, User } from "discord.js";
import { existsSync, statSync } from "fs";

export const folderExist = (path: string): boolean => {
  return existsSync(path) && statSync(path).isDirectory();
};

export const userWithId = (user: User): string => {
  return `${user.tag} (${user.id})`;
};

export const interactionWithId = (interaction: CommandInteraction): string => {
  return `"${interaction.commandName}" (${interaction.id})`;
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

const battery: APIMessageComponentEmoji = { name: "🔋" };
const mediumBattery: APIMessageComponentEmoji = { name: "low_battery", id: "1098286582303293560" };
const lowBattery: APIMessageComponentEmoji = { name: "🪫" };
const emptyBattery: APIMessageComponentEmoji = { name: "empty_battery", id: "1098291005800841287" };

export const emojiByUsage = (usageMax: number, usaged: number): APIMessageComponentEmoji => {
  if (usaged == 0) return emptyBattery;
  if (usaged >= 1 && usaged <= 4) return lowBattery;
  if (usaged >= 5 && usaged <= 14) return mediumBattery;
  if (usaged >= 15 && usaged <= usageMax) return battery;

  colors.error("Error: usage is not in range");
  return battery;
};