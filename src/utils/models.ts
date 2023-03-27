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

export const Models = {
  ask: {
    default: "Answer the question: \"{{text}}\", and put this answer in {{language}}",
    translation: "Translate the text \"{{text}}\" into {{language}}",
    math: "Solve the math problem \"{{text}}\", and put this answer in {{language}}",
    question: "Answer the question \"{{text}}\" and put this answer in {{language}}",
    story: "Write a story with the following plot/synopsis: \"{{text}}\" and put this answer in {{language}}",
    text: "Write a text, with the following content: \"{{text}}\" and put this answer in {{language}}"
  },
  chat: {
    friend: "You are talking to a friend, and he/she asks you: \"{{text}}\" in {{language}}",
    wfriend: "You are talking to your worst friend, and he/she asks you: \"{{text}}\" in {{language}}",
    dog: "Answer as a dog, to the question: \"{{text}}\" in {{language}}",
    cat: "Answer as a cat, to the question: \"{{text}}\" in {{language}}",
    scientist: "Answer as a scientist, to the question: \"{{text}}\" in {{language}}",
    superhero: "Answer as a superhero, to the question: \"{{text}}\" in {{language}}",
    teacher: "Answer as a teacher, to the question: \"{{text}}\" in {{language}}",
    gamer: "Answer as a gamer, to the question: \"{{text}}\" in {{language}}",
    alien: "Answer as an alien, to the question: \"{{text}}\" in {{language}}",
    smurf: "Answer as an Schtroumpf, will replace all the verbs in your answer by the verb schtroumpf to the question: \"{{text}}\" in {{language}}",
    king: "Answer as a king, to the question: \"{{text}}\" in {{language}}",
    pirate: "Answer as a pirate, to the question: \"{{text}}\" in {{language}}",
    default: "Answer the question: \"{{text}}\" in {{language}}"
  }
};

export const ResponseModals = {
  chat: {
    friend: "Answer as a friend to {{text}}",
    wfriend: "Answer as your worst friend to {{text}}",
    dog: "Answer as a dog to {{text}}",
    cat: "Answer as a cat to {{text}}",
    scientist: "Answer as a scientist to {{text}}",
    superhero: "Answer as a superhero to {{text}}",
    teacher: "Answer as a teacher to {{text}}",
    gamer: "Answer as a gamer to {{text}}",
    alien: "Answer as an alien to {{text}}",
    smurf: "Answer as an Schtroumpf to {{text}}",
    king: "Answer as a king to {{text}}",
    pirate: "Answer as a pirate to {{text}}",
    default: "{{text}}"
  }
};

export const ChatContextOptions = [
  { name: "📱 Respond as a mobile developer", value: "mobile", name_localizations: {
    fr: "📱 Répondre comme un développeur mobile" } },
  { name: "🖥️ Respond as a web developer", value: "web", name_localizations: {
    fr: "🖥️ Répondre comme un développeur web" } },
  { name: "🚗 Respond as a back-end developper", value: "web", name_localizations: {
    fr: "🚗 Répondre comme un développeur back-end" } },
  { name: "🌳 Respond as a front-end developper", value: "web", name_localizations: {
    fr: "🌳 Répondre comme un développeur front-end" } },
  { name: "👨 Respond as a full-stack developper", value: "web", name_localizations: {
    fr: "👨 Répondre comme un développeur full-stack" } },
  { name: "🎭 Respond as a devops developper", value: "web", name_localizations: {
    fr: "🎭 Répondre comme un développeur devops" } },
  { name: "🎓 Respond as a student", value: "student", name_localizations: {
    fr: "🎓 Répondre comme un étudiant" } },
  { name: "🏫 Respond as a teacher", value: "teacher", name_localizations: {
    fr: "🏫 Répondre comme un professeur" } },
  { name: "🙍 Respond as a friend", value: "friend", name_localizations: {
    fr: "🙍 Répondre comme un ami" } },
  { name: "😈 Respond as my worst friend", value: "wfriend", name_localizations: {
    fr: "😈 Répondre comme mon pire ami" } },
  { name: "🐕 Respond as a dog", value: "dog", name_localizations: {
    fr: "🐕 Répondre comme un chien" } },
  { name: "🐈 Respond as a cat", value: "cat", name_localizations: {
    fr: "🐈 Répondre comme un chat" } },
  { name: "🧬 Respond as a scientist", value: "scientist", name_localizations: {
    fr: "🧬 Répondre comme un scientifique" } },
  { name: "🦸 Respond as a superhero", value: "superhero", name_localizations: {
    fr: "🦸 Répondre comme un super-héros" } },
  { name: "📗 Respond as a teacher", value: "teacher", name_localizations: {
    fr: "📗 Répondre comme un professeur" } },
  { name: "🕹️ Respond as a gamer", value: "gamer", name_localizations: {
    fr: "🕹️ Répondre comme un joueur" } },
  { name: "🛸 Respond as an alien", value: "alien", name_localizations: {
    fr: "🛸 Répondre comme un extraterrestre" } },
  { name: "🧠 Respond as an Schtroumpf", value: "smurf", name_localizations: {
    fr: "🧠 Répondre comme un Schtroumpf" } },
  { name: "👑 Respond as a king", value: "king", name_localizations: {
    fr: "👑 Répondre comme un roi" } },
  { name: "🪙 Respond as a pirate", value: "pirate", name_localizations: {
    fr: "🪙 Répondre comme un pirate" } }
];


export function findContextOption(value: string): { name: string, value: string, name_localizations: { fr: string } } {
  const option = AskContextOptions.find((option) => option.value === value);
  return option ?? AskContextOptions[AskContextOptions.length - 1];
}

export function findChatContextOption(value: string): { name: string, value: string, name_localizations: { fr: string } } {
  const option = ChatContextOptions.find((option) => option.value === value);
  return option ?? ChatContextOptions[ChatContextOptions.length - 1];
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
export type BuildChatContext = "friend" | "wfriend" | "dog" | "cat" | "scientist" | "superhero" | "teacher" | "gamer" | "alien" | "smurf" | "default";
export type BuildQuestionLanguage = "fr" | "en";

export function buildQuestion(text: string, context: BuildQuestionContext = "default", language: BuildQuestionLanguage): string {
  const baseText = Models.ask[context ?? "default"].replace("{{text}}", text);
  const locale = Locales.find(lang => lang.value === language)?.name ?? "English";
  return baseText.replace("{{language}}", locale);
}

export function buildChat(text: string, context: BuildChatContext = "default", language: BuildQuestionLanguage): string {
  const baseText = Models.chat[context ?? "default"].replace("{{text}}", text);
  const locale = Locales.find(lang => lang.value === language)?.name ?? "English";
  return baseText.replace("{{language}}", locale);
}

export function getResponseModal(context: BuildChatContext = "default", text: string): string {
  return ResponseModals.chat[context ?? "default"].replace("{{text}}", text);
}