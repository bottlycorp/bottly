import { subscription } from "$resources/messages.json";
import { checkUser, getUser, updateUser } from "$core/utils/User";
import {
  ButtonStyle,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
  TextChannel
} from "discord.js";
import { simpleEmbed } from "$core/utils/Embed";
import { prisma } from "$core/utils/Prisma";
import { findSubscriptionByEmail } from "$core/utils/Stripe";
import { msg, getLang } from "$core/utils/Message";
import { ButtonBuilder } from "@discordjs/builders";
import { startTrial } from "$core/utils/Trial";
import Command from "$core/commands/Command";

export default class Subscription extends Command {

  public readonly guildOnly = false;

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
      .setDescriptionLocalizations({ fr: subscription.subcommands.status.fr }))
    .addSubcommand(new SlashCommandSubcommandBuilder()
      .setName("trial")
      .setDescription(subscription.subcommands.trial["en-US"])
      .setDescriptionLocalizations({ fr: subscription.subcommands.trial.fr }))
    .addSubcommand(new SlashCommandSubcommandBuilder()
      .setName("premium")
      .setDescription(subscription.subcommands.subscribe["en-US"])
      .setDescriptionLocalizations({ fr: subscription.subcommands.subscribe.fr }));

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
            embeds: [simpleEmbed(subscription.errors["invalid-email"][getLang(command.locale)], "error", { f: command.user })]
          });
          return;
        }

        const emailExists = await prisma.user.findMany({ where: { email } });

        if (emailExists.length > 0) {
          await command.editReply({
            embeds: [simpleEmbed(subscription.errors["email-exists"][getLang(command.locale)], "error", { f: command.user })]
          });
          return;
        }

        await updateUser(command.user.id, { email });
        await command.editReply({
          embeds: [simpleEmbed(subscription.success["valid-email"][getLang(command.locale)], "success", { f: command.user })]
        });
        break;
      case "status":
        if (user.inTrial) {
          await command.editReply({
            embeds: [
              simpleEmbed(
                msg(subscription.success["subscriber-status"].trial[getLang(command.locale)],
                  [user.trialEnd]), "pro", { f: command.user }
              )
            ]
          });
          return;
        }

        if (user.email === "none") {
          await command.editReply({
            embeds: [simpleEmbed(msg(subscription.errors["no-email"][getLang(command.locale)], []), "error", { f: command.user })]
          });
          return;
        }

        if (subscriber == null) {
          await command.editReply({
            embeds: [simpleEmbed(subscription.errors["no-subscription"][getLang(command.locale)], "error", { f: command.user })]
          });
          return;
        }

        if (subscriber.cancel_at != null && subscriber.canceled_at != null) {
          await command.editReply({
            embeds: [simpleEmbed(
              msg(
                subscription.success["subscriber-status"].canceled[getLang(command.locale)], [
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
              msg(subscription.success["subscriber-status"].trial[getLang(command.locale)], [subscriber.trial_end]),
              "pro",
              { f: command.user }
            )]
          });
          return;
        } else if (subscriber.status === "active" && subscriber.current_period_end != null) {
          await command.editReply({
            embeds: [simpleEmbed(
              msg(subscription.success["subscriber-status"].active[getLang(command.locale)], [subscriber.current_period_end]),
              "pro",
              { f: command.user }
            )]
          });
        }
        break;
      case "trial":
        if (user.alreadyTried || user.inTrial) {
          await command.editReply({
            embeds: [
              simpleEmbed(msg(subscription.errors["trial-exists"][getLang(command.locale)], []), "error", { f: command.user })
            ]
          });
          return;
        }

        const channel = await command.client.channels.fetch(command.channelId);
        if (!channel || !(channel instanceof TextChannel)) return;
        const collector = channel.createMessageComponentCollector({ time: 20000 });

        collector.on("collect", async i => {
          if (!i.isButton()) return;
          if (i.customId == "start_trial_" + command.user.id) {
            const status = await startTrial(command.user.id);
            if (status) {
              await i.update({
                embeds: [simpleEmbed(msg(subscription.success.trial.started[getLang(command.locale)], []), "pro", { f: command.user })],
                components: []
              });
            } else {
              await i.update({
                embeds: [simpleEmbed(subscription.errors["trial-already"][getLang(command.locale)], "error", { f: command.user })],
                components: []
              });
            }
          }
        });

        const button = new ButtonBuilder()
          .setCustomId("start_trial_" + command.user.id)
          .setLabel(subscription.buttons.start[getLang(command.locale)])
          .setStyle(ButtonStyle.Success);

        await command.editReply({
          embeds: [simpleEmbed(subscription.messages.trial.sure[getLang(command.locale)], "pro", { f: command.user })],
          components: [{ type: 1, components: [button] }]
        });
        break;
      case "premium":
        await command.editReply({
          embeds: [
            simpleEmbed(msg(subscription.messages.subscribe[getLang(command.locale)], []), "pro", { f: command.user })
          ]
        });
        break;
    }
  }

}