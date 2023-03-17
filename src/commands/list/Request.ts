import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Command from "$core/commands/Command";
import { checkUser } from "$core/utils/User";
import { prisma } from "$core/utils/Prisma";
import { request as msgRequest } from "$resources/messages.json";
import { simpleEmbed } from "$core/utils/Embed";
import { msg } from "$core/utils/Message";
import dayjs from "dayjs";
import { Request as RequestType } from "$core/utils/types/request.types";

export default class Request extends Command {

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

    const request: RequestType = await prisma.requests.findUnique({ where: { id: option } });

    if (!request) {
      await command.editReply({ embeds: [
        simpleEmbed(msgRequest.messages["not-found"][command.locale === "fr" ? "fr" : "en-US"], "error", { f: command.user })
      ] });
      return;
    }

    // get second time between askedAt and answeredAt with DayJS
    const timestamp = dayjs(request.answeredAt).diff(dayjs(request.askedAt), "second");

    await command.editReply({ embeds: [
      simpleEmbed(msg(msgRequest.embed.description[command.locale === "fr" ? "fr" : "en-US"], [
        request.timestamp,
        timestamp,
        request.channelName,
        request.guildName,
        request.question,
        // remove all FIRST line breaks
        Buffer.from(request.answer, "base64").toString("utf-8").replace(/^(\r\n|\r|\n)/, ""),
        request.options.context,
        request.options.language
      ]), "normal", { f: command.user })
    ] });
  }

}