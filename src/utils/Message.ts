// Function to get a message in /resources/langs/{lang}.json
// And a parameter ...args to replace the {0}, {1}, {2} ... in the message

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