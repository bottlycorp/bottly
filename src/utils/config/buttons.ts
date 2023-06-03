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
    translate(command.locale, global.buttons.usage, {
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
    translate(command.locale, ask.buttons.reveal),
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
    translate(command.locale, global.buttons.regeneration),
    ButtonStyle.Secondary,
    "regeneration",
    true,
    { name: "typing", id: "1087703097498931290", animated: true }
  );
};

export const premiumButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, global.buttons.premium),
    ButtonStyle.Link,
    getStringEnv("STRIPE_PREMIUM_LINK")
  );
};

export const voteButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, global.buttons.vote),
    ButtonStyle.Link,
    "https://top.gg/bot/1076862546658738236/vote"
  );
};

export const downloadButton = (command: CommandInteraction | Interaction, id: string) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, chat.buttons.download),
    ButtonStyle.Primary,
    "download_" + id
  );
};

export const hideButton = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, chat.buttons.hidePremiumTip),
    ButtonStyle.Primary,
    "hide"
  );
};

export const acceptPrivacy = (command: CommandInteraction | Interaction) : ButtonBuilder => {
  return simpleButton(
    translate(command.locale, privacy.exec.buttons.accept),
    ButtonStyle.Primary,
    "acceptPrivacy"
  );
};

export type Row = {
  type: number;
  components: ButtonBuilder[];
};

export type RowConfig = {
  row1max: number;
  row2max: number;
  row3max: number;
  row4max: number;
  row5max: number;
};

export const buttonsBuilder = (
  webUrl: string | null,
  command: CommandInteraction | Interaction,
  disableAll = false,
  max: RowConfig | null = null,
  ...buttons: ButtonBuilder[]
): Row[] => {
  const list: ButtonBuilder[] = [];

  if (webUrl !== null) {
    const knowMoreButton = simpleButton(translate(command.locale, ask.buttons.knowMore), ButtonStyle.Link, webUrl);
    list.push(disableAll ? knowMoreButton.setDisabled(true) : knowMoreButton);
  }

  for (const button of buttons) {
    list.push(disableAll ? button.setDisabled(true) : button);
  }

  const rows: Row[] = [];
  if (max !== null) {
    // if the first row lenght is same as row1max exemple then we can add to the next row
    if (list.length > 0) {
      const row1: ButtonBuilder[] = [];
      const row2: ButtonBuilder[] = [];
      const row3: ButtonBuilder[] = [];
      const row4: ButtonBuilder[] = [];
      const row5: ButtonBuilder[] = [];

      for (let i = 0; i < list.length; i++) {
        if (i < max.row1max) {
          row1.push(list[i]);
        } else if (i < max.row1max + max.row2max) {
          row2.push(list[i]);
        } else if (i < max.row1max + max.row2max + max.row3max) {
          row3.push(list[i]);
        } else if (i < max.row1max + max.row2max + max.row3max + max.row4max) {
          row4.push(list[i]);
        } else if (i < max.row1max + max.row2max + max.row3max + max.row4max + max.row5max) {
          row5.push(list[i]);
        }
      }

      if (row1.length > 0) rows.push({ type: 1, components: row1 });
      if (row2.length > 0) rows.push({ type: 1, components: row2 });
      if (row3.length > 0) rows.push({ type: 1, components: row3 });
      if (row4.length > 0) rows.push({ type: 1, components: row4 });
      if (row5.length > 0) rows.push({ type: 1, components: row5 });
    }
    return rows;
  } else {
    const rows: Row[] = [];
    while (list.length > 0) {
      rows.push({ type: 1, components: list.splice(0, Math.min(5, list.length)) });
    }

    return rows;
  }
};