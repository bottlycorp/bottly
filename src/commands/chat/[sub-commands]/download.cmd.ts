import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { haveActiveDiscussion, isTheAuthor } from "$core/utils/data/discussion";
import { userWithId } from "$core/utils/function";
import { CommandExecute } from "$core/utils/handler/command";
import { findCommand } from "$core/utils/handler/command/command";
import { ThreadChannel } from "discord.js";
import { chat } from "../chat.config";
import { global } from "$core/utils/config/message/command";
import { createTranscript } from "discord-html-transcripts";

export const execute: CommandExecute = async(command, user) => {
  const channel = command.channel;
  if (!(channel instanceof ThreadChannel)) {
    command.editReply(translate(command.locale, global.exec.notInAThread));
    colors.error(userWithId(command.user) + " tried to download a discussion while not being in a thread");
    return;
  }

  if (!haveActiveDiscussion(user)) {
    command.editReply(translate(command.locale, chat.exec.notHaveActiveDiscussion, { chatTalk: await findCommand("chat", "talk") }));
    colors.error(userWithId(command.user) + " tried to download a discussion while not having an active discussion");
    return;
  }

  if (!await isTheAuthor(channel.id, command.user.id)) {
    command.editReply(translate(command.locale, chat.exec.notTheAuthor));
    colors.error(userWithId(command.user) + " tried to download a discussion while not being the author");
    return;
  }

  if (!user.isPremium) {
    command.editReply(translate(command.locale, chat.exec.notPremiumDownload));
    colors.error(userWithId(command.user) + " tried to download a discussion while not being premium");
    return;
  }

  await command.editReply({ content: translate(command.locale, chat.exec.creatingFile), embeds: [], components: [] });
  const file = await createTranscript(channel, { saveImages: true, poweredBy: false /** sorry bro 🙏 */ });
  await command.editReply({ content: translate(command.locale, chat.exec.createdFile), embeds: [], files: [file] });
};