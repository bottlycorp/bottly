import { privacy, ask } from "$resources/messages.json";
import Command from "$core/commands/command";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getLang } from "$core/utils/message";
import { simpleEmbed } from "$core/utils/embed";
import Client from "$core/client";

export default class Stats extends Command {

  public readonly guildOnly = false;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("privacy")
    .setDescription("Get the privacy policy of the bot");

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    Client.instance.colors.log("Privacy used by " + command.user.tag + " (" + command.user.id + ")");
    if (!command.guild) return;

    const member = await command.guild?.members.fetch(process.env.CLIENT_ID ?? "010101");
    if (!member.permissions.has("SendMessages") || !member.permissions.has("ManageMessages") || !member.permissions.has("EmbedLinks")) {
      await command.reply({ embeds: [simpleEmbed(ask.errors.permissions[getLang(command.locale)], "error", { f: command.user })], ephemeral: true });
      return;
    }

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