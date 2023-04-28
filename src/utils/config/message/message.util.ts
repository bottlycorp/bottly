import { Locale, LocalizationMap } from "discord.js";

const preParams: Record<string, string | number | undefined> = {
  emojiPremium: "<:premium1:1101141131963670630>",
  emojiTyping: "<a:typing:1087703097498931290>"
};

export const translate = (Locale: Locale, message: LocalizationMap, params: Record<string, string | number> = {}): string => {
  let msg = message[Locale ?? "en-US"];
  if (!msg) msg = message["en-US"];
  if (typeof msg !== "string") throw new Error("Message does not exist.");

  for (const [key, value] of Object.entries(params)) {
    msg = msg.replace(`{${key}}`, String(value));
  }

  for (const [key, value] of Object.entries(preParams)) {
    msg = msg.replace(`{${key}}`, String(value));
  }

  return msg;
};

export type SeparateType = {
  success: boolean;
  texts: string[];
}

export const separate = (text: string): SeparateType => {
  if (text.length <= 2000) return { success: false, texts: [text] };

  const texts: string[] = [];
  let textTemp = "";
  for (const word of text.split(" ")) {
    if (textTemp.length + word.length + 1 > 1990) {
      texts.push(textTemp);
      textTemp = "";
    }

    textTemp += `${word} `;
  }

  texts.push(textTemp);
  return { success: true, texts };
};