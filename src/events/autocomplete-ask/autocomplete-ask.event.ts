import { sortLocalesList } from "$core/utils/locale";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { Interaction } from "discord.js";
import { getQuestions } from "$core/utils/data/question";
import { colors } from "$core/client";
import { limitString } from "$core/utils/function";
import { translate } from "$core/utils/config/message/message.util";
import { request } from "$core/commands/request/request.config";
import dayjs from "dayjs";

export const enableInDev: EnableInDev = true;

export const event: EventName = "interactionCreate";

export const execute: EventExecute<"interactionCreate"> = async(interaction: Interaction) => {
  if (!interaction.inGuild()) return;
  if (!interaction.isAutocomplete()) return;
  if (interaction.commandName !== "ask") return;


  const focused = interaction.options.getFocused(true);

  if (focused.name === "context") {
    const requests = await getQuestions(interaction.user.id, interaction.options.getString("context", true));

    if (requests == null) {
      interaction.respond([]);
      colors.info("User has no questions");
      return;
    }

    interaction.respond(
      requests.map((question) => ({
        name: limitString(question.question, 70) + " - " + translate(interaction.locale, request.exec.auto, {
          date: dayjs((question.createdAt * 1000)).format("DD/MM/YYYY HH:mm:ss")
        }),
        value: question.id
      })).slice(0, 25)
    );
  } else if (focused.name === "lang") {
    interaction.respond(sortLocalesList(focused.value));
  } else {
    interaction.respond([]);
  }
};