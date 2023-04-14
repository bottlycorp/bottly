import { colors } from "$core/client";
import { commands } from "$core/utils/config/message/command";
import { translate } from "$core/utils/config/message/message.util";
import { simpleEmbed } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { CacheType, CommandInteraction, CommandInteractionOption } from "discord.js";

export const execute: CommandExecute = async(command: CommandInteraction) => {
  const question: CommandInteractionOption<CacheType> = command.options.get(commands.ask.options.question.name["en-US"], true);
  const value: string | number | boolean | undefined = question.value;

  if (typeof value !== "string") {
    command.reply({
      embeds: [simpleEmbed(translate(command.locale, commands.ask.exec.error, {
        error: "Value is not a string"
      }), "error")],
      ephemeral: true
    });

    colors.error("Value is not a string");
    return;
  }

  command.reply({
    embeds: [simpleEmbed(translate(command.locale, commands.ask.exec.success, {
      response: value
    }), "success")],
    ephemeral: true
  });
};