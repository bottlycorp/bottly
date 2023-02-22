import { Client as DiscordClient, GatewayIntentBits, Partials } from 'discord.js';
import Logger from '$core/utils/Logger';
import CommandManager from '$core/commands/CommandManager';
import EventManager from '$core/events/EventManager';
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

    this.on('ready', () => {
      this.guilds.cache.forEach((guild) => {
        Logger.where(`${guild.name} (${guild.memberCount} members) | ID: ${guild.id}`);
      });
    });

		this.eventManager = new EventManager();
		this.commandManager = new CommandManager();
	}
}

Logger.info('The client is being initialized...');
new Client();