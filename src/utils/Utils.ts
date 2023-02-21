export function toString(base64: string) {
  return Buffer.from(base64, "base64").toString("utf8");
}

export function toBase64(string: string) {
  return Buffer.from(string).toString("base64");
}

export function limit(text: string, limit: number, suffix = "...") {
  // If the text is longer than the limit, cut it off and add the suffix
  if (text.length > limit) {
    return text.substring(0, limit) + suffix;
  }

  return text;
}

export function clearLineBreaks(text: string, s = 1) {
  if (text.startsWith("\n")) {
    text = text.substring(s);
  }

  return text;
}