import Event from '$core/events/Event';
import Logger from '$core/utils/Logger';
import Client from '$core/Client';
import { ActivityType } from 'discord.js';

export default class Ready extends Event {

	constructor() {
		super('ready', false);
	}

	public async execute(): Promise<void> {
		Client.instance.commandManager.register();
		Logger.success("Client has been successfully initialized.");

		Client.instance.user?.setActivity({
			name: "les questions",
			type: ActivityType.Listening
		});
	}
}