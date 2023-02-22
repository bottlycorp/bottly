import Event from '$core/events/Event';
import Logger from '$core/utils/Logger';
import Client from '$core/Client';
import { ActivityType, Guild, WebhookClient } from 'discord.js';
import "dotenv/config"
import { simpleEmbed } from '$core/utils/Embed';

export default class onRemoved extends Event {

  constructor() {
		super('guildDelete', false);
	}

	public async execute(guid: Guild): Promise<void> {
    Logger.where(`Removed from: ${guid.name} (${guid.memberCount} members) | ID: ${guid.id}`);

    const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL as string });

    await webhookClient.send({ embeds: [
      simpleEmbed(":sob: I've been removed to the server **" + guid.name + "** (" + guid.memberCount + " members)", "error", "", {
        text: guid.id + " | now " + Client.instance.guilds.cache.size + " servers",
        timestamp: true
      })
    ]});
	}
}