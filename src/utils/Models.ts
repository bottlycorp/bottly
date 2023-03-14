export const Models = {
  ask: {
    default: "Answer the question: \"{{text}}\", and put this answer in {{language}}",
    translation: "Translate the text \"{{text}}\" into {{language}}",
    solve: {
      math: "Solve the math problem \"{{text}}\", and put this answer in {{language}}",
      question: "Answer the question \"{{text}}\" and put this answer in {{language}}"
    },
    write: {
      story: "Write a story with the following plot/synopsis: \"{{text}}\" and put this answer in {{language}}",
      text: "Write a text, with the following content: \"{{text}}\" and put this answer in {{language}}"
    }
  }
};

export const AskContextOptions = [
  { name: "🌐 Translate a text into a different language", value: "translation" },
  { name: "🧮 Solve a math problem", value: "math" },
  { name: "❓ Answer a question", value: "question" },
  { name: "🪄 Write a story", value: "story" },
  { name: "📝 Write a text", value: "text" }
];

export const Locales = [
  { name: "🇺🇸 English", value: "en" },
  { name: "🇫🇷 Français", value: "fr" },
  { name: "🇪🇸 Español", value: "es" },
  { name: "🇮🇹 Italiano", value: "it" },
  { name: "🇩🇪 Deutsch", value: "de" },
  { name: "🇯🇵 日本語", value: "ja" },
  { name: "🇰🇷 한국어", value: "ko" },
  { name: "🇵🇹 Português", value: "pt" },
  { name: "🇷🇺 Русский", value: "ru" },
  { name: "🇨🇳 中文", value: "zh" }
];

export function buildQuestion(text: string, context = "default", language: string) : string {
  switch (context) {
    case "translation":
      return Models.ask.translation.replace("{{text}}", text).replace("{{language}}", Locales.find(l => l.value === language)?.name ?? "English");
    case "math":
      return Models.ask.solve.math.replace("{{text}}", text).replace("{{language}}", Locales.find(l => l.value === language)?.name ?? "English");
    case "question":
      return Models.ask.solve.question.replace("{{text}}", text).replace("{{language}}", Locales.find(l => l.value === language)?.name ?? "English");
    case "story":
      return Models.ask.write.story.replace("{{text}}", text).replace("{{language}}", Locales.find(l => l.value === language)?.name ?? "English");
    case "text":
      return Models.ask.write.text.replace("{{text}}", text).replace("{{language}}", Locales.find(l => l.value === language)?.name ?? "English");
    default:
      return Models.ask.default.replace("{{text}}", text).replace("{{language}}", Locales.find(l => l.value === language)?.name ?? "English");
  }
}