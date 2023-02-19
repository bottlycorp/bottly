import { ClientEvents } from "discord.js";

export type EventName = keyof ClientEvents;

export default abstract class Event {

    public abstract readonly name: EventName;

    public abstract readonly once: boolean;

    public abstract execute(...args: any[]) : void;

}