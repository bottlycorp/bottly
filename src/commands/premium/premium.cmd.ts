import { translate } from "$core/utils/config/message/message.util";
import { simpleButton, simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonBuilder } from "@discordjs/builders";
import { premium } from "./premium.config";
import { ButtonStyle } from "discord.js";
import { getStringEnv } from "$core/utils/env-variable";
import { findCommand } from "$core/utils/handler/command/command";

export const execute: CommandExecute = async(command, user) => {
  const embed = simpleEmbed("", "premium", translate(command.locale, premium.exec.embed.title), {
    text: command.user.username,
    icon_url: command.user.displayAvatarURL() ?? undefined,
    timestamp: true
  });

  const buttons: ButtonBuilder[] = [];

  if (user.isPremium && user.subscription) {
    embed.setDescription(translate(command.locale, premium.exec.embed.descriptionPremium, {
      firstF: user.subscription?.firstPayment,
      firstR: user.subscription?.firstPayment,
      next: user.subscription?.nextPayment,
      activeSubscription: user.subscription?.canceledAt == 0
        ? translate(command.locale, premium.exec.embed.activeSubscription, { next: user.subscription?.nextPayment })
        : translate(command.locale, premium.exec.embed.canceledSubscription, {
          cancel: user.subscription?.canceledAt,
          next: user.subscription?.nextPayment
        })
    }));

    buttons.push(
      simpleButton(
        translate(command.locale, premium.exec.buttons.manageSubscription),
        ButtonStyle.Link,
        getStringEnv("STRIPE_MANAGE_LINK")
      )
    );
  } else {
    embed.setDescription(translate(command.locale, premium.exec.embed.descriptionNotPremium, {
      cmdAsk: await findCommand("ask")
    }));

    buttons.push(
      simpleButton(
        translate(command.locale, premium.exec.buttons.becomePremium),
        ButtonStyle.Link,
        getStringEnv("STRIPE_PREMIUM_LINK")
      )
    );
  }

  command.editReply({ embeds: [embed], components: [{ type: 1, components: buttons }] });
};