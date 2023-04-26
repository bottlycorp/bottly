import { client, colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { updateUser } from "$core/utils/data/user";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonStyle, ChannelType, TextChannel, ThreadChannel } from "discord.js";
import { ThreadAutoArchiveDuration } from "discord.js";
import { chat } from "../chat.config";
import { simpleEmbed } from "$core/utils/embed";
import { findCommand } from "$core/utils/handler/command/command";
import { ButtonBuilder } from "@discordjs/builders";
import { haveActiveDiscussion, newDiscussion } from "$core/utils/data/discussion";
import { userWithId } from "$core/utils/function";
import { global } from "$core/utils/config/message/command";

export const execute: CommandExecute = async(command, user) => {
  const channel = command.channel;
  if (!(channel instanceof TextChannel)) {
    command.editReply(translate(command.locale, global.config.exec.notInATextChannel, { chatStart: await findCommand("chat", "talk") }));
    colors.error(userWithId(command.user) + " tried to start a discussion while not being in a text channel");
    return;
  }

  if (haveActiveDiscussion(user)) {
    command.editReply(translate(command.locale, chat.config.exec.alreadyActiveDiscussion, { chatStop: await findCommand("chat", "stop") }));
    colors.error(userWithId(command.user) + " tried to start a discussion while having an active discussion");
    return;
  }

  command.editReply({ content: translate(command.locale, chat.config.exec.channelCreating) });
  const privateThread = command.options.getBoolean("private", false) ?? false;
  const thread: ThreadChannel = await channel.threads.create({
    name: translate(command.locale, chat.config.exec.channelTemporaryTitle, { user: command.user.username }),
    invitable: false,
    autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
    type: privateThread ? ChannelType.PrivateThread : ChannelType.PublicThread
  });

  if (thread) {
    await newDiscussion(thread.id, command.user.id, "default");

    command.editReply({
      content: translate(command.locale, chat.config.exec.channelCreated, {
        type: privateThread ? translate(command.locale, chat.config.exec.private) : translate(command.locale, chat.config.exec.public),
        id: thread.id
      })
    });

    thread.members.add(command.user);

    const hideButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId("hide")
      .setLabel(translate(command.locale, chat.config.exec.buttons.hidePremiumTip));

    thread.send({
      embeds: [
        simpleEmbed(translate(command.locale, chat.config.exec.discussionOpened, {
          chatStop: await findCommand("chat", "stop"),
          premiumTip: user.tips?.chatPremiumSaveIt ? translate(command.locale, chat.config.exec.premiumTip) : "",
          history: await findCommand("history")
        }))
      ],
      components: !user.tips?.chatPremiumSaveIt ? [] : [{ type: 1, components: [hideButton] }]
    });

    if (user.tips?.chatPremiumSaveIt) {
      const collector = thread.createMessageComponentCollector({
        filter: (interaction) => interaction.user.id === command.user.id,
        time: 1000 * 60
      });

      collector.on("collect", async(interaction) => {
        if (interaction.customId === "hide") {
          await interaction.update({
            embeds: [
              simpleEmbed(translate(command.locale, chat.config.exec.discussionOpened, {
                chatStop: await findCommand("chat", "stop"),
                premiumTip: "",
                history: await findCommand("history")
              }))
            ],
            components: []
          });
        }

        await updateUser(command.user.id, { tips: { update: { chatPremiumSaveIt: false } } });
      }).on("end", () => {
        thread.messages.fetch().then((messages) => {
          const msgs = messages.filter((message) => message.author.id === client.user?.id);
          const message = msgs.first();

          if (!message) return;
          message.edit({ components: [{ type: 1, components: [hideButton.setDisabled(true)] }] });
        });
      });
    }

    colors.success(`Created a ${privateThread ? "private" : "public"} discussion for ${command.user.username}`);
  } else {
    command.editReply("An error occurred while creating your discussion");
  }
};