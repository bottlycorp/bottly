import { colors, openai } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { CommandExecute } from "$core/utils/handler/command";
import { ChatInputCommandInteraction, TextChannel, ThreadChannel } from "discord.js";
import { ask } from "./ask.config";
import { global } from "$core/utils/config/message/command";
import { limitString, userWithId } from "$core/utils/function";
import { getQuestion } from "$core/utils/data/question";
import { getPrompt } from "@bottlycorp/prompts";
import { simpleEmbed } from "$core/utils/embed";
import { favoriteButton, qrCodeButton, revealButton, usageButton } from "$core/utils/config/buttons";
import { UserIncludeAll } from "$core/utils/data/user";

export const execute: CommandExecute = async(command, user) => {
  const channel = command.channel;
  if (!(channel instanceof ThreadChannel) && !(channel instanceof TextChannel)) {
    command.editReply(translate(command.locale, global.config.exec.notInATextChannel));
    colors.error(userWithId(command.user) + " tried to ask a question while not being in a text channel (thread or text channel)");
    return;
  }

  const message = await command.editReply(translate(command.locale, ask.config.exec.waiting));

  let answer: string;
  const messages: { content: string; role: "user" | "system" | "assistant" }[] = [];
  messages.push({ role: "system", content: translate(command.locale, getPrompt("default")) });

  const context = command.options.getString("context", false);
  if (context) {
    const question = await getQuestion(context, command.user.id);
    if (!question) {
      command.editReply(translate(command.locale, ask.config.exec.error, { error: "Question provided in context does not exist" }));
      return;
    }

    messages.push({ content: question.question, role: "user" });
    messages.push({ content: question.answer, role: "assistant" });
  }

  messages.push({ content: command.options.getString("prompt", true), role: "user" });

  try {
    const response = await openai.createChatCompletion({
      messages,
      max_tokens: 2500,
      model: "gpt-3.5-turbo",
      user: user.userId
    });

    if (!response.data.choices[0].message) {
      command.editReply(translate(command.locale, ask.config.exec.error, { error: "No message in response" }));
      return;
    }

    answer = response.data.choices[0].message?.content;
  } catch (error: any) {
    command.editReply(translate(command.locale, ask.config.exec.error, { error: error.message }));
    return;
  }

  command.editReply({
    content: "",
    embeds: [
      simpleEmbed(
        translate(command.locale, ask.config.exec.success, { response: answer }),
        "info",
        "",
        { text: command.user.username, icon_url: command.user.displayAvatarURL(), timestamp: true }
      )
    ],
    components: [{
      type: 1,
      components: [revealButton(command), usageButton(command, user), favoriteButton(), qrCodeButton()]
    }]
  });

  let seconds = 15;
  const interval = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(interval);
      revealUpdateTime(command, user, seconds, true);
      return;
    }

    revealUpdateTime(command, user, seconds, false);

    seconds--;
  }, 1000);

  (await message).createMessageComponentCollector({ filter: (i) => i.user.id === command.user.id }).on("collect", (i) => {
    if (i.customId === "reveal") {
      i.deferUpdate();

      channel.send({
        embeds: [
          simpleEmbed(
            translate(command.locale, global.config.exec.buttons.reveal_text, {
              response: answer,
              question: limitString(command.options.getString("prompt", true), 256)
            }),
            "info",
            "",
            { text: command.user.username, icon_url: command.user.displayAvatarURL(), timestamp: true }
          )
        ]
      });

      clearInterval(interval);
      command.editReply({
        embeds: [simpleEmbed(translate(command.locale, global.config.exec.buttons.revealed), "info", "")],
        components: []
      });
    } else if (i.customId === "favorite") {
      i.deferUpdate();

      // const components = message.components;
      // find the button with "favorite" custom id and setStyle to "Primary"
      // components[0].components.find((c) => c.customId === "favorite")?.setStyle("PRIMARY");

      command.editReply({
        embeds: [...message.embeds, simpleEmbed(translate(command.locale, global.config.exec.favorited), "info", "")]
      });
    }
  });
};

export const revealUpdateTime = (interaction: ChatInputCommandInteraction, user: UserIncludeAll, seconds: number, dis: boolean): void => {
  const textTime = translate(interaction.locale, global.config.exec.buttons.revealTime, { seconds });
  const text = translate(interaction.locale, global.config.exec.buttons.reveal);

  interaction.editReply({
    components: [{
      type: 1,
      components: [
        revealButton(interaction).setLabel(dis ? text : textTime).setDisabled(dis),
        usageButton(interaction, user),
        favoriteButton(),
        qrCodeButton()
      ]
    }]
  });
};