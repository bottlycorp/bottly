import { Client as DiscordClient, GatewayIntentBits, Partials } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import Logger from "$core/utils/Logger";
import CommandManager from "$core/commands/CommandManager";
import EventManager from "$core/events/EventManager";
import TaskManager from "$core/tasks/TaskManager";
import "dotenv/config";
import Stripe from "stripe";

export default class Client extends DiscordClient {

  public static instance: Client;

  public readonly openai: OpenAIApi;

  public readonly eventManager: EventManager;

  public readonly commandManager: CommandManager;

  public readonly taskManager: TaskManager;

  public readonly stripe: Stripe;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    });

    Client.instance = this;
    this.login(process.env.TOKEN);

    this.openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPEN_AI
    }));

    this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY ?? "", {
      apiVersion: "2022-11-15"
    });

    this.eventManager = new EventManager();
    this.commandManager = new CommandManager();
    this.taskManager = new TaskManager();

    this.on("ready", () => {
      this.guilds.cache.forEach((guild) => {
        Logger.where(`${guild.name} (${guild.memberCount} members) | ID: ${guild.id}`);
      });
    });
  }

}

Logger.info("The client is being initialized...");
new Client();