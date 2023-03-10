import { ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle, EmbedBuilder } from "discord.js";

type EmbedType = "normal" | "error" | "success" | "pro";

type Colors = {
  [key in EmbedType]: number;
};

const colors: Colors = {
  normal: 0x4353fc,
  error: 0xfc4343,
  success: 0x43fc43,
  pro: 0xc7bb4e
};

export function simpleEmbed(message: string, type: EmbedType = "normal", footer ?: {
  text: string;
  iconURL?: string;
  timestamp?: boolean;
}): EmbedBuilder {
  const embed = new EmbedBuilder().setColor(colors[type]);

  if (message) embed.setDescription(message);

  if (footer) {
    embed.setFooter({
      text: footer.text,
      iconURL: footer.iconURL
    });

    if (footer.timestamp) embed.setTimestamp();
  }

  return embed;
}

export function getUsageButton(usage: number) : ButtonBuilder {
  return new ButtonBuilder()
    .setCustomId("limit")
    .setLabel(`⛽ ${usage}/50 (monthly)`)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);
}

export function getRevealButton(usage: number) : ButtonBuilder {
  return new ButtonBuilder()
    .setCustomId(`reveal_${usage}`)
    .setLabel("Reveal")
    .setStyle(ButtonStyle.Secondary);
}