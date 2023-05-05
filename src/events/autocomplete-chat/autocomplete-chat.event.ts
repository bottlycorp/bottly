import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { Interaction } from "discord.js";

export const enableInDev: EnableInDev = true;

export const event: EventName = "interactionCreate";

export const execute: EventExecute<"interactionCreate"> = async(interaction: Interaction) => {
  if (!interaction.inGuild()) return;
  if (!interaction.isAutocomplete()) return;
  if (interaction.commandName !== "chat") return;

  interaction.respond([
    { name: "Coming soon in June 2023", value: "none" }
  ]);
};