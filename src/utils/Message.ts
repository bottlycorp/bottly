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

export const contexts: Record<number | string, Record<string, string>> = {
  0: {
    fr: "🤷‍♂️ Aucun contexte fourni",
    "en-US": "🤷‍♂️ No context provided"
  },
  1: {
    fr: "🧮 Problème mathématique, question, etc.",
    "en-US": "🧮 Math problem, question, etc."
  },
  2: {
    fr: "🪄 Problème de programmation, question, etc.",
    "en-US": "🪄 Programming problem, question, etc."
  },
  3: {
    fr: "📝 Génération d'histoire, de texte, etc.",
    "en-US": "📝 Generate a story, a text, ect"
  },
  4: {
    fr: "🪡 Traduire un texte",
    "en-US": "🪡 Translate a text"
  },
  5: {
    fr: "🧬 Génération de code, complétion, correction, etc.",
    "en-US": "🧬 Code generation, completion, correction, etc."
  },
  6: {
    fr: "🔎 Résoudre un problème",
    "en-US": "🔎 Solve a problem"
  },
  7: {
    fr: "🌐 Trouver une/des information(s)",
    "en-US": "🌐 Find information, response"
  },
  8: {
    fr: "🧩 Génération (de tout type)",
    "en-US": "🧩 Generation"
  }
};

export const contextChoices = [
  { name: "🧮 Math problem, question, etc.", value: "1", name_localizations: { fr: "🧮 Problème mathématique, question, etc." } },
  { name: "🪄 Programming problem, question, etc.", value: "2", name_localizations: { fr: "🪄 Problème de programmation, question, etc." } },
  { name: "📝 Generate a story, a text, ect", value: "3", name_localizations: { fr: "📝 Génération d'histoire, de texte, etc." } },
  { name: "🪡 Translate a text", value: "4", name_localizations: { fr: "🪡 Traduire un texte" } },
  { name: "🧬 Code generation, completion, correction, etc.", value: "5", name_localizations: { fr: "🧬 Génération de code, complétion, correction, etc." } },
  { name: "🔎 Solve a problem", value: "6", name_localizations: { fr: "🔎 Résoudre un problème" } },
  { name: "🌐 Find information, response", value: "7", name_localizations: { fr: "🌐 Trouver une/des information(s)" } },
  { name: "🧩 Generation", value: "8", name_localizations: { fr: "🧩 Génération (de tout type)" } }
];