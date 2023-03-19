import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Command from "$core/commands/Command";
import { checkUser, getRequest } from "$core/utils/User";
import { request as msgRequest } from "$resources/messages.json";
import { simpleEmbed } from "$core/utils/Embed";
import { getLang, msg } from "$core/utils/Message";
import dayjs from "dayjs";
import { Request as RequestTyoe } from "$core/utils/types/request.types";
import { findContextOption, findLanguageOption } from "$core/utils/Models";
import { prisma } from "$core/utils/Prisma";

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
    await command.deferReply({ ephemeral: true });
    await checkUser(command.user.id);

    const option = command.options.getString("request", true);

    const request: RequestTyoe = await getRequest(option);

    if (!request) {
      await command.editReply({ embeds: [
        simpleEmbed(msgRequest.messages["not-found"][getLang(command.locale)], "error", { f: command.user })
      ] });
      return;
    }

    const timestamp = dayjs(request.answeredAt).diff(dayjs(request.askedAt), "second");

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