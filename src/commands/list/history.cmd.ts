import Command from "$core/commands/command";
import { history } from "$resources/messages.json";
import { checkUser, getUser } from "$core/utils/user";
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { prisma } from "$core/utils/prisma";
import { simpleEmbed } from "$core/utils/embed";
import { getLang, limit, msg } from "$core/utils/message";
import "dotenv/config";
import dayjs from "dayjs";
import Client from "$core/client";

export default class History extends Command {

  public readonly guildOnly = false;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("history")
    .setDescription(history.command.description["en-US"])
    .setDescriptionLocalizations({ fr: history.command.description.fr })
    .setDMPermission(false)
    .addIntegerOption(new SlashCommandIntegerOption()
      .setName("page")
      .setDescription(history.command.options.page["en-US"])
      .setDescriptionLocalizations({ fr: history.command.options.page.fr })
      .setRequired(false))
    .addStringOption(new SlashCommandStringOption()
      .setName("order")
      .setDescription(history.command.options.order["en-US"])
      .setDescriptionLocalizations({ fr: history.command.options.order.fr })
      .setRequired(false)
      .addChoices(
        { name: "Date (asc)", value: "asc" },
        { name: "Date (desc)", value: "desc" }
      ));

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    Client.instance.colors.log("History used by " + command.user.tag + " (" + command.user.id + ")");
    await command.deferReply({ ephemeral: true });
    await checkUser(command.user.id);
    const user = await getUser(command.user.id);
    if (!command.guild) return;

    const member = await command.guild?.members.fetch(process.env.CLIENT_ID ?? "010101");
    if (!member.permissions.has("SendMessages") || !member.permissions.has("ManageMessages") || !member.permissions.has("EmbedLinks")) {
      await command.reply({
        embeds: [simpleEmbed(history.errors.permissions[getLang(command.locale)], "error", { f: command.user })],
        ephemeral: true
      });
      return;
    }

    const order = command.options.getString("order", false) ?? "desc";
    const page = command.options.getInteger("page", false) ?? 1;

    const requests = await prisma.requests.findMany({
      where: {
        userId: command.user.id
      },
      orderBy: {
        id: order === "desc" ? "desc" : "asc"
      }
    });

    let lines = "";
    if (requests.length === 0) {
      lines = history.command.embed["line-blank"][getLang(command.locale)];
    } else {
      for (let i = (page - 1) * 10; i < page * 10 && i < requests.length; i++) {
        if (requests[i]) {
          lines += msg(history.command.embed.line.default, [
            i,
            limit(requests[i].question, 40, "..."),
            requests[i].timestamp
          ]);
        }
      }
    }

    lines += msg(history.command.embed.last[getLang(command.locale)], [user.lastAsked]);
    if (!user.premium) {
      lines += msg(history.command.embed.usage[getLang(command.locale)], [
        requests.length,
        user.askUsage,
        process.env.STRIPE_MONTHLY_SUB || ""
      ]);
    }

    await prisma.stats.create({
      data: {
        createdAt: dayjs().toDate(),
        guildId: command.guild?.id ?? "DM",
        userId: command.user.id,
        type: "history"
      }
    });

    const embed = simpleEmbed(lines, "normal", {
      text: msg(history.command.embed.footer.default, [requests.length, Math.ceil(requests.length / 10)])
    });

    command.editReply({ embeds: [embed] });
  }

}