import { ButtonBuilder } from "@discordjs/builders";
import { MAX_USES, UserIncludeAll } from "$core/utils/data/user";
import { ButtonStyle, CommandInteraction, Interaction } from "discord.js";
import { translate } from "./message/message.util";
import { global } from "./message/command";
import { emojiByUsage } from "../function";

export const usageButton = (command: CommandInteraction | Interaction, user: UserIncludeAll | null) : ButtonBuilder => {
  return new ButtonBuilder()
    .setCustomId("usage")
    .setLabel(translate(command.locale, global.config.exec.buttons.usage, {
      left: (user?.usages?.usage ?? 1) == 0 ? 0 : (user?.usages?.usage ?? 1) - 1,
      max: MAX_USES["FREE"]
    }))
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true)
    .setEmoji(emojiByUsage(MAX_USES["FREE"], (user?.usages?.usage ?? 1) == 0 ? 0 : (user?.usages?.usage ?? 1) - 1));
};

export const revealButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return new ButtonBuilder()
    .setCustomId("reveal")
    .setLabel(translate(command.locale, global.config.exec.buttons.reveal))
    .setStyle(ButtonStyle.Primary);
};

export const premiumButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return new ButtonBuilder()
    .setCustomId("premium")
    .setLabel(translate(command.locale, global.config.exec.buttons.premium))
    .setStyle(ButtonStyle.Primary);
};

export const voteButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return new ButtonBuilder()
    .setLabel(translate(command.locale, global.config.exec.buttons.vote))
    .setURL("https://top.gg/bot/1076862546658738236/vote")
    .setStyle(ButtonStyle.Link);
};