import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { deleteDiscussion, haveActiveDiscussion, isTheAuthor, updateDiscussion } from "$core/utils/data/discussion";
import { userWithId } from "$core/utils/function";
import { CommandExecute } from "$core/utils/handler/command";
import { findCommand } from "$core/utils/handler/command/command";
import { ThreadChannel } from "discord.js";
import { chat } from "../chat.config";
import { global } from "$core/utils/config/message/command";
import { simpleEmbed } from "$core/utils/embed";
import { downloadButton } from "$core/utils/config/buttons";
import { createTranscript } from "discord-html-transcripts";

export const execute: CommandExecute = async(command, user) => {
  const channel = command.channel;
  if (!(channel instanceof ThreadChannel)) {
    command.editReply(translate(command.locale, global.exec.notInAThread));
    colors.error(userWithId(command.user) + " tried to stop a discussion while not being in a thread");
    return;
  }

  if (!haveActiveDiscussion(user)) {
    command.editReply(translate(command.locale, chat.exec.notHaveActiveDiscussion, { chatTalk: await findCommand("chat", "talk") }));
    colors.error(userWithId(command.user) + " tried to stop a discussion while not having an active discussion");
    return;
  }

  if (!await isTheAuthor(channel.id, command.user.id)) {
    command.editReply(translate(command.locale, chat.exec.notTheAuthor));
    colors.error(userWithId(command.user) + " tried to stop a discussion while not being the author");
    return;
  }

  command.editReply({
    embeds: [
      simpleEmbed(translate(command.locale, chat.exec.stopped, {
        count: user.discussions.find(d => d.active === true)?.count ?? 0
      }), "info", "", {
        text: channel.name,
        icon_url: command.user.displayAvatarURL() ?? undefined,
        timestamp: true
      })
    ],
    components: [{ type: 1, components: [downloadButton(command, channel.id).setDisabled(user.isPremium ? false : true)] }]
  });

  await updateDiscussion(channel.id, { active: false, writing: false });

  if (!user.privacy?.collectChat) {
    await deleteDiscussion(channel.id);
    channel.send({ embeds: [simpleEmbed(translate(command.locale, chat.exec.deletedData, {
      id: command.user.id
    }), "error", "")] });
    colors.info(userWithId(command.user) + " stopped a discussion and deleted the data because he doesn't want to collect his data");
  }

  if (user.isPremium) {
    let minutes = 2;
    let seconds = 0;

    const interval = setInterval(() => {
      if (seconds == 0 && minutes != 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      command.editReply({
        components: [{ type: 1, components: [
          downloadButton(command, channel.id).setLabel(translate(command.locale, chat.buttons.download) + ` (${minutes}m${seconds}s)`)
        ] }]
      });

      if (seconds == 0 && minutes == 0) {
        command.editReply({ components: [{ type: 1, components: [downloadButton(command, channel.id).setDisabled(true)] }] });
        clearInterval(interval);
      }
    }, 1000);

    const collector = channel.createMessageComponentCollector({
      time: 1000 * 60 * 2.10,
      filter: (interaction) => interaction.user.id === command.user.id
    });

    collector.on("collect", async(interaction) => {
      if (interaction.customId === "download_" + channel.id) {
        await interaction.deferUpdate();
        clearInterval(interval);

        await interaction.editReply({ content: translate(command.locale, chat.exec.creatingFile), embeds: [], components: [] });
        const file = await createTranscript(channel, { saveImages: true, poweredBy: false /** sorry bro 🙏 */ });
        await interaction.editReply({ content: translate(command.locale, chat.exec.createdFile), embeds: [], files: [file] });
        collector.stop("Downloaded");
      }
    });

    collector.on("end", () => {
      channel.setLocked(true);
    });
  } else {
    channel.setLocked(true);
  }
};