import { colors } from "$core/client";
import { request } from "$core/commands/request/request.config";
import { translate } from "$core/utils/config/message/message.util";
import { getQuestions } from "$core/utils/data/question";
import { limitString } from "$core/utils/function";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import dayjs from "dayjs";
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

  interaction.respond(
    requests.map((question) => ({
      name: limitString(question.question, 70) + " - " + translate(interaction.locale, request.config.exec.auto, {
        date: dayjs((question.createdAt * 1000)).format("DD/MM/YYYY HH:mm:ss")
      }),
      value: question.id
    })).slice(0, 25)
  );
};