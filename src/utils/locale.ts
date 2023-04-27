import { Locale } from "discord.js";
import { Locale as PrismaLocale } from "@prisma/client";

export type Locales = { name: string; value: string }[];

export const localesList = [
  { name: "Indonesian", value: "id" },
  { name: "English (US)", value: "en-US" },
  { name: "English (GB)", value: "en-GB" },
  { name: "Bulgarian", value: "bg" },
  { name: "Chinese (CN)", value: "zh-CN" },
  { name: "Chinese (TW)", value: "zh-TW" },
  { name: "Croatian", value: "hr" },
  { name: "Czech", value: "cs" },
  { name: "Danish", value: "da" },
  { name: "Dutch", value: "nl" },
  { name: "Finnish", value: "fi" },
  { name: "French", value: "fr" },
  { name: "German", value: "de" },
  { name: "Greek", value: "el" },
  { name: "Hindi", value: "hi" },
  { name: "Hungarian", value: "hu" },
  { name: "Italian", value: "it" },
  { name: "Japanese", value: "ja" },
  { name: "Korean", value: "ko" },
  { name: "Lithuanian", value: "lt" },
  { name: "Norwegian", value: "no" },
  { name: "Polish", value: "pl" },
  { name: "Portuguese (BR)", value: "pt-BR" },
  { name: "Romanian", value: "ro" },
  { name: "Russian", value: "ru" },
  { name: "Spanish (ES)", value: "es-ES" },
  { name: "Swedish", value: "sv-SE" },
  { name: "Thai", value: "th" },
  { name: "Turkish", value: "tr" },
  { name: "Ukrainian", value: "uk" },
  { name: "Vietnamese", value: "vi" }
];

export const toLocale = (PrismaLocale: PrismaLocale): Locale => {
  switch (PrismaLocale) {
    case "id": return Locale.Indonesian;
    case "en_US": return Locale.EnglishUS;
    case "en_GB": return Locale.EnglishGB;
    case "bg": return Locale.Bulgarian;
    case "zh_CN": return Locale.ChineseCN;
    case "zh_TW": return Locale.ChineseTW;
    case "hr": return Locale.Croatian;
    case "cs": return Locale.Czech;
    case "da": return Locale.Danish;
    case "nl": return Locale.Dutch;
    case "fi": return Locale.Finnish;
    case "fr": return Locale.French;
    case "de": return Locale.German;
    case "el": return Locale.Greek;
    case "hi": return Locale.Hindi;
    case "hu": return Locale.Hungarian;
    case "it": return Locale.Italian;
    case "ja": return Locale.Japanese;
    case "ko": return Locale.Korean;
    case "lt": return Locale.Lithuanian;
    case "no": return Locale.Norwegian;
    case "pl": return Locale.Polish;
    case "pt_BR": return Locale.PortugueseBR;
    case "ro": return Locale.Romanian;
    case "ru": return Locale.Russian;
    case "es_ES": return Locale.SpanishES;
    case "sv_SE": return Locale.Swedish;
    case "th": return Locale.Thai;
    case "tr": return Locale.Turkish;
    case "uk": return Locale.Ukrainian;
    case "vi": return Locale.Vietnamese;
    default: return Locale.EnglishUS;
  }
};

export const toPrismaLocale = (locale: Locale): PrismaLocale => {
  switch (locale) {
    case Locale.Indonesian: return "id";
    case Locale.EnglishUS: return "en_US";
    case Locale.EnglishGB: return "en_GB";
    case Locale.Bulgarian: return "bg";
    case Locale.ChineseCN: return "zh_CN";
    case Locale.ChineseTW: return "zh_TW";
    case Locale.Croatian: return "hr";
    case Locale.Czech: return "cs";
    case Locale.Danish: return "da";
    case Locale.Dutch: return "nl";
    case Locale.Finnish: return "fi";
    case Locale.French: return "fr";
    case Locale.German: return "de";
    case Locale.Greek: return "el";
    case Locale.Hindi: return "hi";
    case Locale.Hungarian: return "hu";
    case Locale.Italian: return "it";
    case Locale.Japanese: return "ja";
    case Locale.Korean: return "ko";
    case Locale.Lithuanian: return "lt";
    case Locale.Norwegian: return "no";
    case Locale.Polish: return "pl";
    case Locale.PortugueseBR: return "pt_BR";
    case Locale.Romanian: return "ro";
    case Locale.Russian: return "ru";
    case Locale.SpanishES: return "es_ES";
    case Locale.Swedish: return "sv_SE";
    case Locale.Thai: return "th";
    case Locale.Turkish: return "tr";
    case Locale.Ukrainian: return "uk";
    case Locale.Vietnamese: return "vi";
    default: return "en_US";
  }
};

export const localeExists = (locale: string): boolean => {
  const localeData = localesList.find((data) => data.value === locale);
  if (!localeData) return false;
  return true;
};

export const sortLocalesList = (contains: string): Locales => {
  const locales = localesList.filter((locale) => locale.name.includes(contains));
  return locales.slice(0, 25);
};

export const getLocale = (locale: string): string => {
  const localeData = localesList.find((data) => data.value === locale);
  if (!localeData) return "en-US";
  return localeData.name;
};

export const localeToString = (locale: Locale): string => {
  return locale.toString();
};