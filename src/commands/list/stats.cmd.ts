import { AttachmentBuilder, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { ChartConfiguration } from "chart.js";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { prisma } from "$core/utils/prisma";
import { stats } from "$resources/messages.json";
import Command from "$core/commands/command";

export default class Stats extends Command {

  public readonly guildOnly = true;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("stats")
    .setDefaultMemberPermissions(0)
    .setDescription(stats.command.description["en-US"])
    .setDescriptionLocalizations({ fr: stats.command.description.fr })
    .addStringOption(new SlashCommandStringOption()
      .setName("guild")
      .setDescription(stats.command.options.guilds["en-US"])
      .setDescriptionLocalizations({ fr: stats.command.options.guilds.fr })
      .setAutocomplete(true)
      .setRequired(false));

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.deferReply({ ephemeral: true });

    if (command.guildId !== process.env.SUPPORT_GUILD_ID) {
      await command.editReply("This command is only available in the Support Guild");
      return;
    }

    let guilds: { type: string; createdAt: Date }[] = [];
    const guild = command.options.getString("guild", false);

    if (guild) {
      guilds = await prisma.stats.findMany({
        where: { guildId: command.options.getString("guild", false) ?? "" },
        select: { type: true, createdAt: true }
      });
    } else {
      guilds = await prisma.stats.findMany({
        select: { type: true, createdAt: true }
      });
    }

    const data = guilds.reduce((acc, cur) => {
      const date = cur.createdAt.toISOString().split("T")[0];
      if (!acc[date]) acc[date] = {
        ask: 0,
        history: 0,
        request: 0,
        chat: 0,
        contextDiscussion: 0,
        contextQuestion: 0,
        contextTranslate: 0,
        chatActivity: 0
      };
      acc[date][cur.type]++;
      return acc;
    }, {} as Record<string, {
      ask: number;
      history: number;
      request: number;
      chat: number;
      contextDiscussion: number;
      contextQuestion: number;
      contextTranslate: number;
      chatActivity: number;
    }>);

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "/ask",
            data: Object.values(data).map((v) => v.ask),
            backgroundColor: "#7289da",
            borderColor: "#7289da",
            borderWidth: 1,
            tension: 0.4
          },
          {
            label: "/history",
            data: Object.values(data).map((v) => v.history),
            backgroundColor: "#99aab5",
            borderColor: "#99aab5",
            borderWidth: 1,
            tension: 0.4
          },
          {
            label: "/request",
            data: Object.values(data).map((v) => v.request),
            backgroundColor: "#aabd6c",
            borderColor: "#aabd6c",
            borderWidth: 1,
            tension: 0.4
          },
          {
            label: "/chat",
            data: Object.values(data).map((v) => v.chat),
            backgroundColor: "#f04747",
            borderColor: "#f04747",
            borderWidth: 1,
            tension: 0.4
          },
          {
            label: "Chat Activity",
            data: Object.values(data).map((v) => v.chatActivity),
            backgroundColor: "#f939af",
            borderColor: "#f939af",
            borderWidth: 1,
            tension: 0.4
          },
          {
            label: "Ctx: Translate",
            data: Object.values(data).map((v) => v.contextTranslate),
            backgroundColor: "#974be3",
            borderColor: "#974be3",
            borderWidth: 1,
            tension: 0.4
          },
          {
            label: "Ctx: Question",
            data: Object.values(data).map((v) => v.contextQuestion),
            backgroundColor: "#4be376",
            borderColor: "#4be376",
            borderWidth: 1,
            tension: 0.4
          },
          {
            label: "Ctx: Discussion",
            data: Object.values(data).map((v) => v.contextDiscussion),
            backgroundColor: "#c5e34b",
            borderColor: "#c5e34b",
            borderWidth: 1,
            tension: 0.4
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      plugins: [
        {
          id: "custom_canvas_background_color",
          beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext("2d");
            if (!ctx) return;
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = "#2f3136";
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
          }
        }
      ]
    };

    const files: AttachmentBuilder[] = [];
    const chart = new ChartJSNodeCanvas({ height: 500, width: 1100 });
    files.push(new AttachmentBuilder(
      chart.renderToBufferSync(config),
      { name: "stats-chart.png" }
    ));
    await command.editReply({ files });
  }

}