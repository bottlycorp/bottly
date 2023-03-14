export const msg = (message: string, params: (number | string)[]): string => {
  const words = message.match(/\{[^}]+\}/g);
  if (!words) {
    return message;
  }

  for (let i = 0; i < words.length; i++) {
    message = message.replace(words[i], String(params[i]));
  }

  return message;
};

export const limit = (text: string, limit: number, suffix = "..."): string => {
  if (text.length > limit) {
    return text.substring(0, limit) + suffix;
  }
  return text;
};