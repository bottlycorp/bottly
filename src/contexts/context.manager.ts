import { Collection } from "discord.js";
import { readdirSync } from "fs";
import Client from "$core/client";
import Context from "$core/contexts/context";
import "dotenv/config";

export default class ContextManager {

  public readonly contexts: Collection<string, Context> = new Collection();

  constructor() {
    this.load().then(() => this.listener());
  }

  private async load() : Promise<void> {
    const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    let i = 0;
    for (const file of files) {
      const dynamicImport = await import(`./list/${file}`);

      const context: Context = new dynamicImport.default();
      this.contexts.set(context.name, context);
      i++;
    }

    Client.instance.colors.info(`${i} context(s) loaded`);
  }

  private async listener() : Promise<void> {
    Client.instance.on("interactionCreate", async interaction => {
      if (!interaction.isUserContextMenuCommand() && !interaction.isMessageContextMenuCommand()) return;

      const context = this.contexts.get(interaction.commandName);
      if (context) context.execute(interaction);
    });
  }

  /**
    * Register the context commands (use it when the client is ready)
  */
  public async register() : Promise<void> {
    for (const command of this.contexts.values()) {

      this.contexts.map(context => context.context.toJSON());
      if (command.guildOnly) await Client.instance.guilds.cache.get(process.env.SUPPORT_GUILD_ID ?? "")?.commands.create(command.context);
      else await Client.instance.application?.commands.create(command.context);
    }

    Client.instance.colors.info("Successfully registered application contexts");
  }

}