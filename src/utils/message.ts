import { getCommandId } from "$core/commands/command.utils";
import "dotenv/config";

const StripeRecord: Record<string, string> = {
  "{SUPPORT_URL}": process.env.DISCORD_SUPPORT_URL || "",
  "{ANN_SUB}": process.env.STRIPE_YEARLY_SUB || "",
  "{MONTH_SUB}": process.env.STRIPE_MONTHLY_SUB || "",
  "{DASHBOARD_URL}": process.env.STRIPE_DASHBOARD_URL || ""
};

const CommandRecord: Record<string, string> = {
  "{ASK_COMMNAND}": "ask",
  "{CHAT_COMMAND}": "chat",
  "{HISTORY_COMMAND}": "history",
  "{REQUEST_COMMAND}": "request",
  "{SUBSCRIPTION_COMMAND}": "subscription"
};

export const msg = (message: string, params: (number | string)[]): string => {
  const words = message.match(/\{[^}]+\}/g);
  if (!words) {
    return message;
  }

  if (words.some((word) => StripeRecord[word])) {
    for (const word of words) {
      if (StripeRecord[word]) message = message.replace(word, StripeRecord[word]);
    }
  }

  if (words.some((word) => CommandRecord[word])) {
    for (const word of words) {
      if (CommandRecord[word]) message = message.replace(word, getCommandId(CommandRecord[word]));
    }
  }

  for (let i = 0; i < words.length; i++) {
    message = message.replace(words[i], String(params[i]));
  }

  return message;
};

export const limit = (text: string, limit: number, suffix = "..."): string => {
  if (text.length > limit) {
    return text.substring(0, limit) + suffix;
  }
  return text;
};

export const getLang = (locale: string): "en-US" | "fr" => {
  if (locale === "fr") return "fr";
  else return "en-US";
  // TODO: Add more languages here
};

export const formatLinks = (markdown: string): string => {
  return markdown.replace(/\[([\w\s]+)\]\((.+?)\)/g, "$2");
};