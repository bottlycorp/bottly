import { sortLocalesList } from "$core/utils/locale";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { Prompts } from "@bottlycorp/prompts";
import { Interaction } from "discord.js";

export const enableInDev: EnableInDev = true;

export const event: EventName = "interactionCreate";

export const execute: EventExecute<"interactionCreate"> = async(interaction: Interaction) => {
  if (!interaction.inGuild()) return;
  if (!interaction.isAutocomplete()) return;
  if (interaction.commandName !== "ask") return;

  const focused = interaction.options.getFocused(true);

  if (focused.name === "context") {
    interaction.respond(Prompts);
  } else if (focused.name === "lang") {
    interaction.respond(sortLocalesList(focused.value));
  } else {
    interaction.respond([]);
  }
};