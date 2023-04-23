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

export const sortLocalesList = (contains: string): Locales => {
  const locales = localesList.filter((locale) => locale.name.includes(contains));
  return locales.slice(0, 25);
};

export const getLocale = (locale: string): string => {
  const localeData = localesList.find((data) => data.value === locale);
  if (!localeData) return "en-US";
  return localeData.name;
};