import Command from "$core/commands/Command";
import { history } from "$resources/messages.json";
import { checkUser } from "$core/utils/User";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { prisma } from "$core/utils/Prisma";
import { simpleEmbed } from "$core/utils/Embed";
import { msg } from "$core/utils/Message";

export default class History extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("history")
    .setDescription(history.command.description["en-US"])
    .setDescriptionLocalizations({ fr: history.command.description.fr })
    .setDMPermission(false);

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.deferReply({ ephemeral: true });
    await checkUser(command.user.id);

    const requests = await prisma.requests.findMany({
      where: {
        userId: command.user.id
      }
    });

    let lines = "";
    if (requests.length == 0) {
      lines = history.command.embed["line-blank"][command.locale === "fr" ? "fr" : "en-US"];
    } else {
      let i = 1;
      for (const request of requests) {
        lines += msg(history.command.embed.line.default, [i, request.question, request.messageLink, request.timestamp]);
        i++;
      }
    }

    const embed = simpleEmbed(lines, "normal", {
      text: msg(history.command.embed.footer.default, [requests.length, Math.ceil(requests.length / 10)])
    });

    command.editReply({ embeds: [embed] });
  }

}