import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { checkUser, getRequest } from "$core/utils/user";
import { request as msgRequest, ask } from "$resources/messages.json";
import { simpleEmbed } from "$core/utils/embed";
import { getLang, msg } from "$core/utils/message";
import { Request as RequestType } from "$core/utils/types/request.types";
import { findContextOption, findLanguageOption } from "$core/utils/models";
import { prisma } from "$core/utils/prisma";
import Command from "$core/commands/command";
import dayjs from "dayjs";
import Client from "$core/client";

export default class Request extends Command {

  public readonly guildOnly = false;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("request")
    .setDescription(msgRequest.command.description["en-US"])
    .setDescriptionLocalizations({ fr: msgRequest.command.description.fr })
    .addStringOption(new SlashCommandStringOption()
      .setName("request")
      .setAutocomplete(true)
      .setDescription(msgRequest.command.options.request["en-US"])
      .setDescriptionLocalizations({ fr: msgRequest.command.options.request.fr })
      .setRequired(true));

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    Client.instance.colors.log("Request used by " + command.user.tag + " (" + command.user.id + ")");
    if (!command.guild) return;
    await checkUser(command.user.id);

    const member = await command.guild?.members.fetch(process.env.CLIENT_ID ?? "010101");
    if (!member.permissions.has("SendMessages") || !member.permissions.has("ManageMessages") || !member.permissions.has("EmbedLinks")) {
      await command.reply({ embeds: [simpleEmbed(ask.errors.permissions[getLang(command.locale)], "error", { f: command.user })], ephemeral: true });
      return;
    }

    const option = command.options.getString("request", true);

    const request: RequestType | null = await getRequest(option);

    if (!request) {
      await command.reply({ embeds: [
        simpleEmbed(msgRequest.messages["not-found"][getLang(command.locale)], "error", { f: command.user })
      ], ephemeral: true });
      return;
    }

    const timestamp = dayjs(request.answeredAt).diff(dayjs(request.askedAt), "second");

    await command.deferReply({ ephemeral: true });

    await prisma.stats.create({
      data: {
        createdAt: dayjs().toDate(),
        guildId: command.guild?.id ?? "DM",
        userId: command.user.id,
        type: "request"
      }
    });

    await command.editReply({ embeds: [
      simpleEmbed(msg(msgRequest.embed.description[getLang(command.locale)], [
        request.timestamp,
        timestamp,
        request.channelName,
        request.guildName,
        request.question,
        Buffer.from(request.answer, "base64").toString("utf-8").replace(/^(\r\n|\r|\n)/, ""),
        command.locale === "fr" ? findContextOption(request.options.context).name_localizations.fr : findContextOption(request.options.context).name,
        findLanguageOption(request.options.language)
      ]), "normal", { f: command.user })
    ] });
  }

}