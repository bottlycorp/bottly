import { ContextMenuCommandBuilder, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";

export default abstract class Context {

    public abstract readonly context: ContextMenuCommandBuilder;

    /**
     * Whether the context can only be used in the Support Guild
     * @type {boolean}
     * @readonly
     * @default false
     */
    public abstract guildOnly: boolean;

    get name(): string {
      return this.context.name;
    }

    public abstract execute(interaction: MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction): Promise<void>;

}