import { EmbedBuilder, EmbedData } from "discord.js";
import { global } from "./config";
import { isHexColor } from "./validator";

type EmbedType = "info" | "success" | "error" | "premium" | "vote";

const colors: Record<EmbedType, string> = {
  "success": global.colors.success,
  "error": global.colors.error,
  "info": global.colors.primary,
  "premium": global.colors.premium,
  "vote": global.colors.vote
};

type Footer = {
  text: string;
  icon_url?: string | undefined;
  timestamp?: boolean;
}

export const simpleEmbed = (
  content: string,
  type: EmbedType = "info",
  title?: string,
  footer?: Footer,
  thumbailUrl?: string,
  pictureUrl?: string
): EmbedBuilder => {
  const color = colors[type];

  if (!isHexColor(color)) throw new Error("Invalid config: \"colors\" field in information.json need to be a valid hex color code");

  const embed = new EmbedBuilder()
    .setColor(color)
    .setDescription(content);

  if (footer) {
    if (footer.timestamp) embed.setTimestamp();
    embed.setFooter({
      text: footer.text,
      iconURL: footer.icon_url
    });
  }

  if (thumbailUrl) embed.setThumbnail(thumbailUrl);
  if (pictureUrl) embed.setImage(pictureUrl);

  if (title) embed.setTitle(title);

  return embed;
};

export const getBaseEmbed = (type: EmbedType = "info"): EmbedBuilder => {
  const color = colors[type];

  if (!isHexColor(color)) throw new Error("Invalid config: \"colors\" field in information.json need to be a valid hex color code");

  return new EmbedBuilder().setColor(color);
};

export const buildEmbed = (jsonEmbed: object): EmbedBuilder => {
  if (!(jsonEmbed satisfies EmbedData)) throw new Error("Database embed does not satisfies EmbedData type.");

  return new EmbedBuilder(jsonEmbed);
};