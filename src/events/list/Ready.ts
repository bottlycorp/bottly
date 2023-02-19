import Event, { EventName } from "$core/events/Event";
import Client from "$core/index";
import { ActivityType } from "discord.js";

export default class Ready extends Event {

  public readonly enabledInDev = true;

  public name: EventName = "ready";

  public once = true;

  public async execute() : Promise<void> {
    Client.instance.user?.setActivity("/ask");  
  }

}