import Event from "$core/events/event";
import Logger from "$core/utils/logger";
import Client from "$core/client";
import { ActivityType } from "discord.js";

export default class Ready extends Event {

  constructor() {
    super("ready", false);
  }

  public async execute(): Promise<void> {
    Client.instance.commandManager.register();
    await Client.instance.taskManager.load();

    Client.instance.user?.setActivity({
      name: "GPT-3",
      type: ActivityType.Playing
    });


    let members = 0;
    Client.instance.guilds.cache.forEach((guild) => {
      members += guild.memberCount;
    });

    Logger.success(`Logged in as ${Client.instance.user?.tag}!`);
    Logger.info(`Serving ${Client.instance.guilds.cache.size} servers with ${members} members`);
  }

}