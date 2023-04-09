import { Client as DiscordClient, GatewayIntentBits, Partials, WebhookClient } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import { BColors } from "bettercolors";
import CommandManager from "$core/commands/command.manager";
import EventManager from "$core/events/event.manager";
import TaskManager from "$core/tasks/task.manager";
import Stripe from "stripe";
import dayjs from "dayjs";
import ContextManager from "./contexts/context.manager";
import "dotenv/config";

export default class Client extends DiscordClient {

  public static instance: Client;

  public readonly openai: OpenAIApi;

  public readonly eventManager: EventManager;

  public readonly commandManager: CommandManager;

  public readonly contextManager: ContextManager;

  public readonly taskManager: TaskManager;

  public readonly stripe: Stripe;

  public readonly webhook: WebhookClient | null;

  public readonly colors: BColors;

  public month: number = (dayjs().month() + 1);

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildMembers
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    });

    Client.instance = this;

    this.colors = new BColors({
      date: {
        enabled: true,
        format: "DD/MM/YYYY HH:mm:ss",
        surrounded: "()"
      }
    });

    this.login(process.env.TOKEN);

    this.openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPEN_AI
    }));

    this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY ?? "", {
      apiVersion: "2022-11-15"
    });

    if (!process.env.WEBHOOK_URL) {
      this.colors.error("WEBHOOK_URL not found in .env file");
      this.webhook = null;
    } else {
      this.webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
      if (this.webhook) this.colors.success("Webhook initialized");
      else this.colors.error("Webhook failed to initialize");
    }

    this.eventManager = new EventManager();
    this.commandManager = new CommandManager();
    this.contextManager = new ContextManager();
    this.taskManager = new TaskManager();
  }

}

new Client();
