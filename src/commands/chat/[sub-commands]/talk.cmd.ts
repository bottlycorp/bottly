import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { haveActiveDiscussion } from "$core/utils/data/user";
import { CommandExecute } from "$core/utils/handler/command";
import { ChannelType, ThreadChannel } from "discord.js";
import { ThreadAutoArchiveDuration } from "discord.js";
import { chat } from "../chat.config";

export const execute: CommandExecute = async(command, channel, user) => {
  if (haveActiveDiscussion(user)) {
    command.editReply("You have an active discussion");
    colors.error("User tried to start a discussion while having an active discussion");
    return;
  }

  command.editReply({
    content: translate(command.locale, chat.config.exec.channelCreating)
  });

  const privateThread = command.options.getBoolean("private", false) ?? false;

  const thread: ThreadChannel = await channel.threads.create({
    name: translate(command.locale, chat.config.exec.channelTemporaryTitle, {
      user: command.user.username
    }),
    invitable: false,
    autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
    type: privateThread ? ChannelType.PrivateThread : ChannelType.PublicThread
  });

  if (thread) {
    command.editReply({
      content: `Your \`${privateThread ? "private" : "public"}\` discussion has been created, you can find it here: <#${thread.id}>`
    });

    thread.send({
      content: "Welcome to your discussion <@" + command.user.id + ">"
    });
  } else {
    command.editReply("An error occurred while creating your discussion");
  }
};