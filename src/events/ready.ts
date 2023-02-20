import { ActivityType, Client } from "discord.js";
import { BotEvent } from "../types";

const event : BotEvent = {
  name: "ready",
  once: true,
  execute: (client : Client) => {
    console.log(`Logged in as ${client.user?.tag}!`);

    client.user?.setActivity({ name: "GPT-3",  type: ActivityType.Watching })
  }
}

export default event;