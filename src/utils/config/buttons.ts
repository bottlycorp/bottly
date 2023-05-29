import { ButtonBuilder } from "@discordjs/builders";
import { UserIncludeAll, getMaxUsage } from "$core/utils/data/user";
import { ButtonStyle, CommandInteraction, Interaction } from "discord.js";
import { translate } from "./message/message.util";
import { global } from "./message/command";
import { emojiByUsage } from "../function";
import { chat } from "$core/commands/chat/chat.config";
import { privacy } from "prisma/privacy.config";
import { simpleButton } from "../embed";
import { getStringEnv } from "../env-variable";
import { ask } from "$core/commands/ask/ask.config";

export const usageButton = (command: CommandInteraction | Interaction, user: UserIncludeAll, reduce = true) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, global.config.buttons.usage, {
      left: reduce ? (user?.usages?.usage ?? 1) == 0 ? 0 : (user?.usages?.usage ?? 1) - 1 : (user?.usages?.usage ?? 1),
      max: getMaxUsage(user)
    }),
    ButtonStyle.Secondary,
    "usage",
    true,
    emojiByUsage(getMaxUsage(user), (user?.usages?.usage ?? 1) == 0 ? 0 : (user?.usages?.usage ?? 1) - 1)
  );
};

export const revealButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, ask.config.buttons.reveal),
    ButtonStyle.Primary,
    "reveal"
  );
};

export const favoriteButton = () : ButtonBuilder => {
  return simpleButton(undefined, ButtonStyle.Secondary, "favorite", false, {
    animated: false,
    name: "⭐"
  });
};

export const qrCodeButton = () : ButtonBuilder => {
  return simpleButton(undefined, ButtonStyle.Secondary, "qrcode", false, {
    animated: false,
    id: "1106941333471494287",
    name: "qrcode"
  });
};

export const regenerateButton = () : ButtonBuilder => {
  return simpleButton(
    undefined,
    ButtonStyle.Secondary,
    "regenerate",
    false,
    { name: "✨" }
  );
};

export const regenerationButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, global.config.buttons.regeneration),
    ButtonStyle.Secondary,
    "regeneration",
    true,
    { name: "typing", id: "1087703097498931290", animated: true }
  );
};

export const premiumButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, global.config.buttons.premium),
    ButtonStyle.Link,
    getStringEnv("STRIPE_PREMIUM_LINK")
  );
};

export const voteButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, global.config.buttons.vote),
    ButtonStyle.Link,
    "https://top.gg/bot/1076862546658738236/vote"
  );
};

export const downloadButton = (command: CommandInteraction | Interaction, id: string) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, chat.config.buttons.download),
    ButtonStyle.Primary,
    "download_" + id
  );
};

export const hideButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, chat.config.buttons.hidePremiumTip),
    ButtonStyle.Primary,
    "hide"
  );
};

export const acceptPrivacy = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, privacy.config.exec.buttons.accept),
    ButtonStyle.Primary,
    "acceptPrivacy"
  );
};

export const buttonsBuilder = (webUrl: string | null, command: CommandInteraction | Interaction, ...buttons: ButtonBuilder[]): ButtonBuilder[] => {
  const list: ButtonBuilder[] = [];

  if (webUrl !== null) {
    const knowMoreButton = simpleButton(
      translate(command.locale, ask.config.buttons.knowMore),
      ButtonStyle.Link,
      webUrl
    );
    list.push(knowMoreButton);
  }

  for (const button of buttons) {
    list.push(button);
  }

  return list;
};