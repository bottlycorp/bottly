import { getQuestions } from "$core/utils/data/question";
import { getUser } from "$core/utils/data/user";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { Interaction } from "discord.js";

export const enableInDev: EnableInDev = true;

export const event: EventName = "interactionCreate";

export const execute: EventExecute<"interactionCreate"> = async(interaction: Interaction) => {
  if (!interaction.inGuild()) return;
  if (!interaction.isAutocomplete()) return;
  if (interaction.commandName !== "list") return;

  const focused = interaction.options.getFocused(true);

  const user = await getUser(interaction.user.id);
  if (user == null) return;

  if (interaction.options.getSubcommand() === "delete") {
    if (focused.name !== "name") return;

    interaction.respond(
      user.lists.map((list) => ({
        name: list.name,
        value: list.id
      })).slice(0, 25)
    );
    return;
  } else if (interaction.options.getSubcommand() === "rename") {
    interaction.respond(
      user.lists.map((list) => ({
        name: list.name,
        value: list.id
      })).slice(0, 25)
    );
    return;
  } else if (interaction.options.getSubcommand() === "remove" || interaction.options.getSubcommand() === "add") {
    if (focused.name == "name") {
      interaction.respond(
        user.lists.map((list) => ({
          name: list.name,
          value: list.id
        })).slice(0, 25)
      );
    } else if (focused.name == "question") {
      if (interaction.options.getString("name", false) == null) {
        interaction.respond([
          { name: "You need to select a list first", value: "undefined" }
        ]);
        return;
      }

      if (interaction.options.getSubcommand() === "remove") {
        interaction.respond(
          user.questions.filter((question) => question.listId === interaction.options.getString("name", true) ?? "undefined").map((question) => ({
            name: question.question,
            value: question.id
          })).slice(0, 25)
        );
      } else {
        const requests = (await getQuestions(interaction.user.id, interaction.options.getString("question", true)));
        const requestsList = requests?.filter((question) => question.listId == null);

        if (requestsList == null) {
          interaction.respond([]);
          return;
        }

        interaction.respond(
          requestsList.map((question) => ({
            name: question.question,
            value: question.id
          })).slice(0, 25)
        );
      }
    }
    return;
  }
};