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

export function replaces(message: string, params: (string | number | bigint)[] = []): string {
  const words = message.match(/\{[^}]+\}/g);
  if (words) for (let i = 0; i < words.length; i++) message = message.replace(words[i], String(params[i]));

  message = message.replace(/\\n/g, "\n");

  return message;
}

export const langs: Record<string, string> = {
  fr_FR: "🇫🇷 French",
  de_DE: "🇩🇪 German",
  en_US: "🇺🇸 English",
  en_GB: "🇬🇧 English (GB)",
  bg_BG: "🇧🇬 Bulgarian",
  zh_CN: "🇨🇳 Chinese",
  ko_KR: "🇰🇷 Korean",
  da_DK: "🇩🇰 Danish",
  es_ES: "🇪🇸 Spanish",
  et_EE: "🇪🇪 Estonian",
  fi_FI: "🇫🇮 Finnish",
  el_GR: "🇬🇷 Greek",
  hu_HU: "🇭🇺 Hungarian",
  id_ID: "🇮🇩 Indonesian",
  it_IT: "🇮🇹 Italian",
  ja_JP: "🇯🇵 Japanese",
  lv_LV: "🇱🇻 Latvian",
  lt_LT: "🇱🇹 Lithuanian",
  nl_NL: "🇳🇱 Dutch",
  no_NO: "🇳🇴 Norwegian",
  pl_PL: "🇵🇱 Polish",
  pt_PT: "🇵🇹 Portuguese",
  ro_RO: "🇷🇴 Romanian",
  ru_RU: "🇷🇺 Russian",
  uk_UA: "🇺🇦 Ukrainian",  
  default: "English"
}