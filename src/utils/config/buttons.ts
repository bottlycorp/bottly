import { ButtonBuilder } from "@discordjs/builders";
import { UserIncludeAll, getMaxUsage } from "$core/utils/data/user";
import { ButtonStyle, CommandInteraction, Interaction } from "discord.js";
import { translate } from "./message/message.util";
import { global } from "./message/command";
import { emojiByUsage } from "../function";
import { chat } from "$core/commands/chat/chat.config";

export const usageButton = (command: CommandInteraction | Interaction, user: UserIncludeAll, reduce = true) : ButtonBuilder => {
  return new ButtonBuilder()
    .setCustomId("usage")
    .setLabel(translate(command.locale, global.config.exec.buttons.usage, {
      left: reduce ? (user?.usages?.usage ?? 1) == 0 ? 0 : (user?.usages?.usage ?? 1) - 1 : (user?.usages?.usage ?? 1),
      max: getMaxUsage(user)
    }))
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true)
    .setEmoji(emojiByUsage(getMaxUsage(user), (user?.usages?.usage ?? 1) == 0 ? 0 : (user?.usages?.usage ?? 1) - 1));
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

export const downloadButton = (command: CommandInteraction | Interaction, id: string) : ButtonBuilder => {
  return new ButtonBuilder()
    .setLabel(translate(command.locale, global.config.exec.buttons.download))
    .setCustomId("download_" + id)
    .setStyle(ButtonStyle.Primary);
};

export const hideButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setCustomId("hide")
    .setLabel(translate(command.locale, chat.config.exec.buttons.hidePremiumTip));
};