import messages from "$resources/messages.json";

export function msg(key: keyof typeof messages, params: (string | number | bigint)[] = [], lang: "fr_FR" | "en_US" = "en_US"): string {
  const messageList: Record<string, Record<string, string>> = messages;
  if (!messageList[key]) return key;

  let message = messageList[key][lang];
  const words = message.match(/\{[^}]+\}/g);
  if (words) for (let i = 0; i < words.length; i++) message = message.replace(words[i], String(params[i]));

  message = message.replace(/\\n/g, "\n");

  return message;
}