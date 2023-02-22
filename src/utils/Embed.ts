import { EmbedBuilder } from "discord.js";

type EmbedType = "normal" | "error" | "success";

type Colors = {
  [key in EmbedType]: number;
};

const colors: Colors = {
  normal: 0x4353fc,
  error: 0xfc4343,
  success: 0x43fc43,
};

export function simpleEmbed(message: string, type: EmbedType = "normal", title?: string, footer ?: {
  text: string;
  iconURL?: string;
  timestamp?: boolean;
}) {
  const embed = new EmbedBuilder().setColor(colors[type]);

  if (message) embed.setDescription(message);
  if (title) embed.setTitle(title);

  if (footer) {
    embed.setFooter({
      text: footer.text,
      iconURL: footer.iconURL,
    });

    if (footer.timestamp) embed.setTimestamp();
  }

  return embed;
}