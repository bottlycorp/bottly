import { privacy } from "$resources/messages.json";
import Command from "$core/commands/command";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getLang } from "$core/utils/message";
import { simpleEmbed } from "$core/utils/embed";

export default class Stats extends Command {

  public readonly guildOnly = true;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("privacy")
    .setDefaultMemberPermissions(0)
    .setDescription("Get the privacy policy of the bot");

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    const texts = [
      privacy.texts.sections.first[getLang(command.locale)],
      privacy.texts.sections.second[getLang(command.locale)],
      privacy.texts.sections.third[getLang(command.locale)],
      privacy.texts.sections.fourth[getLang(command.locale)],
      privacy.texts.sections.fifth[getLang(command.locale)],
      privacy.texts.sections.sixth[getLang(command.locale)]
    ];

    // add - to the beginning of each line
    const text = texts.map(t => t.split("\n").map(l => `- ${l}`).join("\n")).join("\n\n");

    await command.reply({
      embeds: [
        simpleEmbed(text, "normal", {
          f: command.user
        })
      ],
      ephemeral: true
    });
  }

}