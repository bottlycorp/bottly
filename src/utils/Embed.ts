import { EmbedBuilder } from "discord.js";

type EmbedType = "normal" | "error";

export function simpleEmbed(message: string, type: EmbedType = "normal", title?: string, footer ?: {
  text: string;
  iconURL?: string;
  timestamp?: boolean;
}) {
  const color = type === "normal" ? "#4353fc" : "#fc4343";

  const embed = new EmbedBuilder().setColor(color);

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