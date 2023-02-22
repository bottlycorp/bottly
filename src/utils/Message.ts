import messages from "$resources/messages.json";

export function msg(key: keyof typeof messages, params: (string | number | bigint)[] = [], lang: string): string {
  if (!lang) throw new Error("Language is not defined.");
  if (!["fr", "en-US"].includes(lang)) lang = "en-US";

  const messageList: Record<string, Record<string, string>> = messages;
  if (!messageList[key]) return key;

  let message = messageList[key][lang];
  const words = message.match(/\{[^}]+\}/g);
  if (words) for (let i = 0; i < words.length; i++) message = message.replace(words[i], String(params[i]));

  message = message.replace(/\\n/g, "\n");

  return message;
}

export function replaces(message: string, params: (string | number | bigint)[] = []): string {
  const words = message.match(/\{[^}]+\}/g);
  if (words) for (let i = 0; i < words.length; i++) message = message.replace(words[i], String(params[i]));

  message = message.replace(/\\n/g, "\n");

  return message;
}

export const locals: Record<string, string> = {
  // docs: https://discord.com/developers/docs/reference#locales
  id: "🇮🇩 Indonesian",
  da: "🇩🇰 Danish",
  de: "🇩🇪 German",
  "en-GB": "🇬🇧 English, UK",
  "en-US": "🇺🇸 English, US",
  "es-ES": "🇪🇸 Spanish",
  fr: "🇫🇷 French",
  hr: "🇭🇷 Croatian",
  it: "🇮🇹 Italian",
  lt: "🇱🇹 Lithuanian",
  hu: "🇭🇺 Hungarian",
  nl: "🇳🇱 Dutch",
  no: "🇳🇴 Norwegian",
  pl: "🇵🇱 Polish",
  "pt-BR": "🇧🇷 Portuguese, Brazilian",
  ro: "🇷🇴 Romanian, Romania",
  fi: "🇫🇮 Finnish",
  "sv-SE": "🇸🇪 Swedish",
  vi: "🇻🇳 Vietnamese",
  tr: "🇹🇷 Turkish",
  cs: "🇨🇿 Czech",
  el: "🇬🇷 Greek",
  bg: "🇧🇬 Bulgarian",
  ru: "🇷🇺 Russian",
  uk: "🇺🇦 Ukrainian",
  hi: "🇮🇳 Hindi",
  th: "🇹🇭 Thai",
  "zh-CN": "🇨🇳 Chinese, China",
  ja: "🇯🇵 Japanese",
  "zh-TW": "🇹🇼 Chinese, Taiwan",
  ko: "🇰🇷 Korean",
};

// export for choices option slash command
// I do remove some language because > 25 choices maximum for option (SORRY <3 for language that I remove)
export const localChoices = [
  { name: "🇮🇩 Indonesian", value: "id" },
  { name: "🇩🇰 Danish", value: "da" },
  { name: "🇩🇪 German", value: "de" },
  { name: "🇬🇧 English, UK", value: "en-GB" },
  { name: "🇺🇸 English, US", value: "en-US" },
  { name: "🇪🇸 Spanish", value: "es-ES" },
  { name: "🇫🇷 French", value: "fr" },
  { name: "🇭🇷 Croatian", value: "hr" },
  { name: "🇮🇹 Italian", value: "it" },
  { name: "🇱🇹 Lithuanian", value: "lt" },
  { name: "🇭🇺 Hungarian", value: "hu" },
  { name: "🇳🇱 Dutch", value: "nl" },
  { name: "🇳🇴 Norwegian", value: "no" },
  { name: "🇵🇱 Polish", value: "pl" },
  { name: "🇧🇷 Portuguese, Brazilian", value: "pt-BR" },
  { name: "🇷🇴 Romanian, Romania", value: "ro" },
  { name: "🇫🇮 Finnish", value: "fi" },
  { name: "🇻🇳 Vietnamese", value: "vi" },
  { name: "🇹🇷 Turkish", value: "tr" },
  { name: "🇧🇬 Bulgarian", value: "bg" },
  { name: "🇺🇦 Ukrainian", value: "uk" },
  { name: "🇨🇳 Chinese, China", value: "zh-CN" },
  { name: "🇯🇵 Japanese", value: "ja" },
  { name: "🇹🇼 Chinese, Taiwan", value: "zh-TW" },
  { name: "🇰🇷 Korean", value: "ko" }
];