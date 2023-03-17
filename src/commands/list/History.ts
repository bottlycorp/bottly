import Command from "$core/commands/Command";
import { history } from "$resources/messages.json";
import { checkUser, getUser } from "$core/utils/User";
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { prisma } from "$core/utils/Prisma";
import { simpleEmbed } from "$core/utils/Embed";
import { limit, msg } from "$core/utils/Message";

export default class History extends Command {

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
    await command.deferReply({ ephemeral: true });
    await checkUser(command.user.id);
    const user = await getUser(command.user.id);

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
      lines = history.command.embed["line-blank"][command.locale === "fr" ? "fr" : "en-US"];
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

    lines += msg(history.command.embed.last[command.locale === "fr" ? "fr" : "en-US"], [user.lastAsked]);
    if (!user.premium) {
      lines += msg(history.command.embed.usage[command.locale === "fr" ? "fr" : "en-US"], [
        requests.length,
        user.askUsage,
        "https://buy.stripe.com/28ocOQ3JWgnG0GQ145"
      ]);
    }

    const embed = simpleEmbed(lines, "normal", {
      text: msg(history.command.embed.footer.default, [requests.length, Math.ceil(requests.length / 10)])
    });

    command.editReply({ embeds: [embed] });
  }

}