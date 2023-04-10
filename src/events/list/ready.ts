import { ActivityType } from "discord.js";
import Event from "$core/events/event";
import Client from "$core/client";

export default class Ready extends Event {

  constructor() {
    super("ready", false);
  }

  public async execute(): Promise<void> {
    Client.instance.commandManager.register();
    Client.instance.contextManager.register();
    await Client.instance.taskManager.load();

    Client.instance.user?.setActivity({
      name: "GPT-3",
      type: ActivityType.Playing
    });


    let members = 0;
    Client.instance.guilds.cache.forEach((guild) => {
      members += guild.memberCount;
    });

    Client.instance.colors.success(`Logged in as ${Client.instance.user?.tag}!`);
    Client.instance.colors.info(`Serving ${Client.instance.guilds.cache.size} servers with ${members} members`);
  }

}