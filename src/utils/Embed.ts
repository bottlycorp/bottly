import { ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle, EmbedBuilder, User } from "discord.js";

type EmbedType = "normal" | "error" | "success" | "pro";

type Colors = {
  [key in EmbedType]: number;
};

const colors: Colors = {
  normal: 0x4353fc,
  error: 0xfc4343,
  success: 0x43fc43,
  pro: 0xd1f015
};

export function simpleEmbed(
  message: string,
  type: EmbedType = "normal",
  footer: {
    text?: string;
    iconURL?: string;
    timestamp?: boolean;
    f?: User;
  }
) : EmbedBuilder {
  const embed = new EmbedBuilder().setColor(colors[type]);

  if (message) embed.setDescription(message);

  if (footer) {
    if (footer.iconURL) embed.setFooter({ iconURL: footer.iconURL, text: footer.text ?? "" });

    if (footer.f) {
      embed.setFooter({
        iconURL: footer.f.displayAvatarURL(),
        text: footer.text ?? footer.f.tag
      });
    }

    embed.setTimestamp();
  }

  return embed;
}

export function getUsageButton(usage: number) : ButtonBuilder {
  const button = new ButtonBuilder()
    .setCustomId("limit")
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

  if (usage == 0) button.setLabel("⛽ Monthly limit reached");
  else button.setLabel(`⛽ ${usage}/50 (monthly)`);
  return button;
}

export function getRevealButton(usage: number) : ButtonBuilder {
  return new ButtonBuilder()
    .setCustomId(`reveal_${usage}`)
    .setLabel("Reveal")
    .setStyle(ButtonStyle.Secondary);
}