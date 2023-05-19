import { colors } from "$core/client";
import { getQuestions } from "$core/utils/data/question";
import { limitString } from "$core/utils/function";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { Interaction } from "discord.js";

export const enableInDev: EnableInDev = true;

export const event: EventName = "interactionCreate";

export const execute: EventExecute<"interactionCreate"> = async(interaction: Interaction) => {
  if (!interaction.inGuild()) return;
  if (!interaction.isAutocomplete()) return;
  if (interaction.commandName !== "request") return;

  const requests = await getQuestions(interaction.user.id, interaction.options.getString("question", true));

  if (requests == null) {
    interaction.respond([]);
    colors.info("User has no questions");
    return;
  }

  const favorites = requests.filter((question) => question.isFavorite);
  const otherQuestions = requests.filter((question) => !question.isFavorite);

  const options = [...favorites, ...otherQuestions].slice(0, 25).map((question) => {
    const name = (question.isFavorite ? "(⭐) " : "") + limitString(question.question, 65);
    const value = question.id;
    return { name, value };
  });

  interaction.respond(options);
};