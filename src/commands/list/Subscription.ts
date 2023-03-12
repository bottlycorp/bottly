import Command from "$core/commands/Command";
import { subscription } from "$resources/messages.json";
import { checkUser, getUser, updateUser } from "$core/utils/User";
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } from "discord.js";
import { simpleEmbed } from "$core/utils/Embed";
import { prisma } from "$core/utils/Prisma";
import { findSubscriptionByEmail } from "$core/utils/Stripe";
import { msg } from "$core/utils/Message";

export default class Subscription extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("subscription")
    .setDescription(subscription.command.description["en-US"])
    .setDescriptionLocalizations({ fr: subscription.command.description.fr })
    .setDMPermission(false)
    .addSubcommand(new SlashCommandSubcommandBuilder()
      .setName("email")
      .setDescription(subscription.subcommands.email["en-US"])
      .setDescriptionLocalizations({ fr: subscription.subcommands.email.fr })
      .addStringOption(new SlashCommandStringOption()
        .setName("email")
        .setDescription(subscription.options.email["en-US"])
        .setDescriptionLocalizations({ fr: subscription.options.email.fr })
        .setRequired(true)))
    .addSubcommand(new SlashCommandSubcommandBuilder()
      .setName("status")
      .setDescription(subscription.subcommands.status["en-US"])
      .setDescriptionLocalizations({ fr: subscription.subcommands.status.fr }));

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.deferReply({ ephemeral: true });
    await checkUser(command.user.id);
    const subcommand = command.options.getSubcommand();
    const user = await getUser(command.user.id);

    let subscriber;
    if (user.email != "none") {
      subscriber = await findSubscriptionByEmail(user.email);
    }

    switch (subcommand) {
      case "email":
        const email = command.options.getString("email", true);

        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
          await command.editReply({
            embeds: [simpleEmbed(subscription.errors["invalid-email"][command.locale === "fr" ? "fr" : "en-US"], "error", { f: command.user })]
          });
          return;
        }

        const emailExists = await prisma.user.findMany({ where: { email } });

        if (emailExists.length > 0) {
          await command.editReply({
            embeds: [simpleEmbed(subscription.errors["email-exists"][command.locale === "fr" ? "fr" : "en-US"], "error", { f: command.user })]
          });
          return;
        }

        await updateUser(command.user.id, { email });
        await command.editReply({
          embeds: [simpleEmbed(subscription.success["valid-email"][command.locale === "fr" ? "fr" : "en-US"], "success", { f: command.user })]
        });
        break;
      case "status":
        if (user.email === "none") {
          await command.editReply({
            embeds: [simpleEmbed(subscription.errors["no-email"][command.locale === "fr" ? "fr" : "en-US"], "error", { f: command.user })]
          });
          return;
        }

        if (subscriber == null) {
          await command.editReply({
            embeds: [simpleEmbed(subscription.errors["no-subscription"][command.locale === "fr" ? "fr" : "en-US"], "error", { f: command.user })]
          });
          return;
        }

        if (subscriber.status === "trialing" && user.trails > 1) {
          await command.editReply({
            embeds: [simpleEmbed(subscription.errors["trial-exists"][command.locale === "fr" ? "fr" : "en-US"], "error", { f: command.user })]
          });
          return;
        }

        if (subscriber.cancel_at != null && subscriber.canceled_at != null) {
          await command.editReply({
            embeds: [simpleEmbed(
              msg(
                subscription.success["subscriber-status"].canceled[command.locale === "fr" ? "fr" : "en-US"], [
                  subscriber.canceled_at,
                  subscriber.cancel_at
                ]
              ),
              "error",
              { f: command.user }
            )]
          });
          return;
        }

        if (subscriber.status === "trialing" && subscriber.trial_end != null) {
          await command.editReply({
            embeds: [simpleEmbed(
              msg(subscription.success["subscriber-status"].trial[command.locale === "fr" ? "fr" : "en-US"], [subscriber.trial_end]),
              "pro",
              { f: command.user }
            )]
          });
          return;
        } else if (subscriber.status === "active" && subscriber.current_period_end != null) {
          await command.editReply({
            embeds: [simpleEmbed(
              msg(subscription.success["subscriber-status"].active[command.locale === "fr" ? "fr" : "en-US"], [subscriber.current_period_end]),
              "pro",
              { f: command.user }
            )]
          });
        }
        break;
    }
  }

}