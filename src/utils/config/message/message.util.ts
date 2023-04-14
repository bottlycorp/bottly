import { Locale, LocalizationMap } from "discord.js";

export const translate = (Locale: Locale, message: LocalizationMap, params: Record<string, string | number> = {}): string => {
  let msg = message[Locale ?? "en-US"];
  if (!msg) msg = message["en-US"];
  if (typeof msg !== "string") throw new Error("Message does not exist.");

  for (const [key, value] of Object.entries(params)) {
    msg = msg.replace(`{${key}}`, String(value));
  }

  return msg;
};