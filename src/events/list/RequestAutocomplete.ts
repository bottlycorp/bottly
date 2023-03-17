import Event from "$core/events/Event";
import { limit } from "$core/utils/Message";
import { getRequests } from "$core/utils/User";
import { Interaction } from "discord.js";

export default class RequestAutocomplete extends Event {

  constructor() {
    super("interactionCreate", false);
  }

  public async execute(interaction: Interaction): Promise<void> {
    if (!interaction.inGuild()) return;
    if (interaction.isCommand() && interaction.commandName !== "request") return;

    if (interaction.isAutocomplete()) {
      const requests = await getRequests(interaction.user.id, interaction.options.getString("request", true));

      if (!requests.length) {
        await interaction.respond([]);
        return;
      }

      interaction.respond(requests.map(request => (
        {
          name: limit(request.question, 97, "..."),
          // 97 = 100 - 3 (...), discord limit to 100 characters for autocomplete name
          value: request.id
        }
      )).slice(0, 25));
    }
  }

}