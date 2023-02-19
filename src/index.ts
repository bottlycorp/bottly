import { Client as DiscordClient, GatewayIntentBits, Partials } from "discord.js";
import "dotenv/config";
import chalk from 'chalk';
import EventManager from "$core/events/EventManager";

export default class Client extends DiscordClient {

  public static instance: Client

  public readonly eventManager = new EventManager();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    });
    
    Client.instance = this;
    this.login(process.env.TOKEN)
      .then(() => console.log(chalk.greenBright('The bot has logged in successfully!')))
      .catch((err) => console.log(chalk.redBright('Error while logging in: ' + err)));

  }
}

new Client();