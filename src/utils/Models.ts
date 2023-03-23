export const Models = {
  ask: {
    default: "Answer the question: \"{{text}}\", and put this answer in {{language}}",
    translation: "Translate the text \"{{text}}\" into {{language}}",
    math: "Solve the math problem \"{{text}}\", and put this answer in {{language}}",
    question: "Answer the question \"{{text}}\" and put this answer in {{language}}",
    story: "Write a story with the following plot/synopsis: \"{{text}}\" and put this answer in {{language}}",
    text: "Write a text, with the following content: \"{{text}}\" and put this answer in {{language}}"
  }
};

export const AskContextOptions = [
  { name: "🌐 Translate a text into a different language", value: "translation", name_localizations: {
    fr: "🌐 Traduire un texte dans une autre langue" } },
  { name: "🧮 Solve a math problem", value: "math", name_localizations: {
    fr: "🧮 Résoudre un problème de mathématiques" } },
  { name: "❓ Answer a question", value: "question", name_localizations: {
    fr: "❓ Répondre à une question" } },
  { name: "🪄 Write a story", value: "story", name_localizations: {
    fr: "🪄 Écrire une histoire" } },
  { name: "📝 Write a text", value: "text", name_localizations: {
    fr: "📝 Écrire un texte" } },
  { name: "🤔 None (default)", value: "default", name_localizations: {
    fr: "🤔 Aucun (par défaut)" } }
];

export function findContextOption(value: string): { name: string, value: string, name_localizations: { fr: string } } {
  const option = AskContextOptions.find((option) => option.value === value);
  return option ?? AskContextOptions[AskContextOptions.length - 1];
}

export const findLanguageOption = (value: string): string => {
  const option = Locales.find((option) => option.value === value);
  return option?.name ?? "Unknown";
};

export const Locales = [
  { name: "🇺🇸 English", value: "en", longValue: "English" },
  { name: "🇫🇷 Français", value: "fr", longValue: "Français" },
  { name: "🇪🇸 Español", value: "es", longValue: "Español" },
  { name: "🇮🇹 Italiano", value: "it", longValue: "Italiano" },
  { name: "🇩🇪 Deutsch", value: "de", longValue: "Deutsch" },
  { name: "🇯🇵 日本語", value: "ja", longValue: "日本語" },
  { name: "🇰🇷 한국어", value: "ko", longValue: "한국어" },
  { name: "🇵🇹 Português", value: "pt", longValue: "Português" },
  { name: "🇷🇺 Русский", value: "ru", longValue: "Русский" },
  { name: "🇨🇳 中文", value: "zh", longValue: "中文" }
];

export type BuildQuestionContext = "translation" | "math" | "question" | "story" | "text" | "default";
export type BuildQuestionLanguage = "fr" | "en";

export function buildQuestion(text: string, context: BuildQuestionContext = "default", language: BuildQuestionLanguage): string {
  const baseText = Models.ask[context ?? "default"].replace("{{text}}", text);
  const locale = Locales.find(lang => lang.value === language)?.name ?? "English";
  return baseText.replace("{{language}}", locale);
}