import { Lang } from '$core/utils/types';
import { ClientEvents } from 'discord.js';

export default abstract class Event {

	protected constructor(public readonly name: keyof ClientEvents, public once: boolean = false) {}

	public abstract execute(lang: Lang, ...args: unknown[]): Promise<void>;
}