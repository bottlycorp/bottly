import Client from "$core/lient";
import Event from "$core/events/event";
import { limit } from "$core/utils/message.utils";
import { getRequests } from "$core/utils/user.utils";
import { Interaction } from "discord.js";

export default class RequestAutocomplete extends Event {

  constructor() {
    super("interactionCreate", false);
  }

  public async execute(interaction: Interaction): Promise<void> {
    if (!interaction.inGuild()) return;
    if (!interaction.isAutocomplete()) return;

    switch (interaction.commandName) {
      case "request":
        const requests = await getRequests(interaction.user.id, interaction.options.getString("request", true));

        if (!requests.length) {
          await interaction.respond([]);
          return;
        }

        interaction.respond(requests.map(request => (
          {
            name: limit(request.question, 97, "..."),
            value: request.id
          }
        )).slice(0, 25));
        break;
      case "stats":
        const guilds = Client.instance.guilds.cache
          .filter(guild => guild.name.toLowerCase().includes(interaction.options.getString("guild", true).toLowerCase()))
          .map(guild => ({ name: guild.name, id: guild.id }));

        if (!guilds.length) {
          await interaction.respond([]);
          return;
        }

        interaction.respond(guilds.map(guild => (
          {
            name: limit(guild.name, 97, "..."),
            value: guild.id
          }
        )).slice(0, 25));
        break;
    }
  }

}