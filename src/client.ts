import { Client as DiscordClient, GatewayIntentBits, Partials } from "discord.js";
import Logger from "$core/utils/Logger";
import CommandManager from "$core/commands/command.manager";
import EventManager from "$core/events/event.manager";
import "dotenv/config";

export default class Client extends DiscordClient {

  public static instance: Client;

  public readonly eventManager: EventManager;

  public readonly commandManager: CommandManager;

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

    this.eventManager = new EventManager();
    this.commandManager = new CommandManager();
  }

}

Logger.info("The client is being initialized...");
new Client();