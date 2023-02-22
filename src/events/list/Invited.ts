import Event from '$core/events/Event';
import Logger from '$core/utils/Logger';
import Client from '$core/Client';
import { ActivityType, Guild, WebhookClient } from 'discord.js';
import "dotenv/config"
import { simpleEmbed } from '$core/utils/Embed';

export default class onInvited extends Event {

  constructor() {
		super('guildCreate', false);
	}

	public async execute(guid: Guild): Promise<void> {
    Logger.where(`${guid.name} (${guid.memberCount} members) | ID: ${guid.id}`);

    const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL as string });

    await webhookClient.send({ embeds: [
      simpleEmbed("I've been added to the server " + guid.name + " (" + guid.memberCount + " members)", "success", "", {
        text: guid.id,
        timestamp: true
      })
    ]});
	}
}