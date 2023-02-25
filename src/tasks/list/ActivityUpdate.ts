import Client from "$core/Client";
import Task from "$core/tasks/Task";
import { formatNumbers } from "$core/utils/Number";
import { ActivityType } from "discord.js";

const Presences = [{
  name: "GPT-3",
  type: "PLAYING"
},{
  name: "{SERVER_COUNT} servers | {USER_COUNT} users",
  type: "WATCHING"
  }
];

const ActivityTypes: Record<string, ActivityType> = {
  "PLAYING": ActivityType.Playing,
  "WATCHING": ActivityType.Watching,
  "LISTENING": ActivityType.Listening,
  "STREAMING": ActivityType.Streaming
}

export default class PresenceUpdate extends Task {

  public readonly enabledInDev = true;

  constructor() {
    super(5_000);
  }

  public async run(): Promise<void> {
    const presence = Presences[Math.floor(Math.random() * Presences.length)];

    let userCount = 0;
    
    Client.instance.guilds.cache.forEach((guild) => {
      userCount += guild.memberCount;
    });

    // @ts-ignore
    Client.instance.user?.setActivity({
      name: presence.name
        .replace("{SERVER_COUNT}", Client.instance.guilds.cache.size.toString())
        .replace("{USER_COUNT}", formatNumbers(userCount)),
      type: ActivityTypes[presence.type]
    })
  }

}