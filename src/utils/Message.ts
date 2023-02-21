import messages from "$resources/messages.json";
import { Lang } from "$core/utils/types";

export function msg(key: keyof typeof messages, params: (string | number | bigint)[] = [], lang: Lang): string {
  if (!lang) throw new Error("Language is not defined.");
  if (lang === "default") lang = "en_US";

  const messageList: Record<string, Record<string, string>> = messages;
  if (!messageList[key]) return key;

  let message = messageList[key][lang];
  const words = message.match(/\{[^}]+\}/g);
  if (words) for (let i = 0; i < words.length; i++) message = message.replace(words[i], String(params[i]));

  message = message.replace(/\\n/g, "\n");

  return message;
}