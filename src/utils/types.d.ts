export type User = {
  id: number;
  username: string;

  defaultLang: Lang; // The response of GPT-3 will be in this language
  // If is "default", the response will be in the language of the question
};

export type Request = {
  question: string;
  answer: string;
  messageLink: string;
  createdAt: number;

  channelName?: string;
  guildName?: string;
};

export type Lang = "fr_FR" | "en_US" | "default"