import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { updateUser } from "$core/utils/data/user";
import { CommandExecute } from "$core/utils/handler/command";
import { ChannelType, TextChannel, messageLink } from "discord.js";
import { ThreadAutoArchiveDuration } from "discord.js";
import { chat } from "../chat.config";
import { simpleEmbed } from "$core/utils/embed";
import { findCommand } from "$core/utils/handler/command/command";
import { haveActiveDiscussion, newDiscussion } from "$core/utils/data/discussion";
import { userWithId } from "$core/utils/function";
import { global } from "$core/utils/config/message/command";
import { hideButton } from "$core/utils/config/buttons";

export const execute: CommandExecute = async(command, user) => {
  const channel = command.channel;
  if (!(channel instanceof TextChannel)) {
    command.editReply(translate(command.locale, global.exec.notInATextChannel, { chatStart: await findCommand("chat", "talk") }));
    colors.error(userWithId(command.user) + " tried to start a discussion while not being in a text channel");
    return;
  }

  if (user.usages?.usage == 0) {
    command.editReply({ embeds: [simpleEmbed(translate(command.locale, global.exec.noMoreUsages), "error")] });
    colors.error(userWithId(command.user) + " tried to start a discussion but he has no more usages");
    return;
  }

  if (haveActiveDiscussion(user)) {
    command.editReply(translate(command.locale, chat.exec.alreadyActiveDiscussion, {
      chatStop: await findCommand("chat", "stop"),
      thread: user.discussions.find(d => d.active === true)?.channelId ?? "undefined"
    }));
    colors.error(userWithId(command.user) + " tried to start a discussion while having an active discussion");
    return;
  }

  command.editReply({ content: translate(command.locale, chat.exec.channelCreating) });
  const privateThread = command.options.getBoolean("private", false) ?? false;

  await channel.threads.create({
    name: translate(command.locale, chat.exec.channelTemporaryTitle, { user: command.user.username }),
    invitable: false,
    autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
    type: privateThread ? ChannelType.PrivateThread : ChannelType.PublicThread
  }).catch(error => {
    command.editReply({ content: "", embeds: [simpleEmbed(translate(command.locale, global.exec.error, { error: error.message }), "error")] });
    return;
  }).then(async(thread) => {
    if (!thread) {
      colors.error(userWithId(command.user) + " tried to start a discussion but the thread was not created");
      return;
    }

    command.editReply({
      content: translate(command.locale, chat.exec.channelCreated, {
        type: privateThread ? translate(command.locale, chat.exec.private) : translate(command.locale, chat.exec.public),
        id: thread.id
      })
    });

    thread.members.add(command.user);

    const messageSended = await thread.send({
      embeds: [
        simpleEmbed(translate(command.locale, chat.exec.discussionOpened, {
          chatStop: await findCommand("chat", "stop"),
          history: await findCommand("history")
        })),
        simpleEmbed(translate(command.locale, user.isPremium ? chat.exec.discussionOpenedPremium : chat.exec.premiumTip), "premium")
      ],
      components: !user.tips?.chatPremiumSaveIt ? [] : [{ type: 1, components: [hideButton(command)] }]
    });

    await newDiscussion(thread.id, command.user.id, messageLink(messageSended.channel.id, messageSended.id), thread.guild.id);

    if (user.tips?.chatPremiumSaveIt) {
      const collector = thread.createMessageComponentCollector({
        filter: (interaction) => interaction.user.id === command.user.id,
        time: 1000 * 60
      });

      collector.on("collect", async(interaction) => {
        if (interaction.customId === "hide") {
          await interaction.update({
            embeds: [
              simpleEmbed(translate(command.locale, chat.exec.discussionOpened, {
                chatStop: await findCommand("chat", "stop"),
                history: await findCommand("history")
              }))
            ],
            components: []
          });
        }

        await updateUser(command.user.id, { tips: { update: { chatPremiumSaveIt: false } } });
        collector.stop("Resolved");
      }).on("end", () => {
        if (collector.endReason == "Resolved") {
          thread.messages.fetch().then((messages) => {
            const message = messages.get(messageSended.id);
            if (message) message.edit({ components: [{ type: 1, components: [hideButton(command).setDisabled(true)] }] });
          });
        }
      });
    }

    colors.success(`Created a ${privateThread ? "private" : "public"} discussion for ${command.user.username}`);
  });
};