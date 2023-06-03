import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { CommandExecute } from "$core/utils/handler/command";
import { favorites } from "./favorites.config";
import { simpleEmbed } from "$core/utils/embed";
import { limitString } from "$core/utils/function";
import { QuestionIncludeAll } from "$core/utils/data/question";

export const execute: CommandExecute = async(command, user) => {
  const questions = user.questions;
  const valuePage: number = command.options.getInteger(favorites.options.page.name["en-US"], false) ?? 1;
  const perPage: number = command.options.getInteger(favorites.options.per.name["en-US"], false) ?? 10;

  if (questions == null) {
    command.editReply({ content: "You have no questions/discussions, so you can't see your history" });
    colors.info("User has no questions/discussions, so he can't see his history");
    return;
  }

  const final = [...(questions ?? [])].filter(q => q.isFavorite).sort((a, b) => b.createdAt - a.createdAt);

  let lines = "";
  for (let i = (valuePage - 1) * perPage; i < valuePage * perPage && i < final.length; i++) {
    const type: QuestionIncludeAll = user.questions?.find(q => q.id === final[i].id) as QuestionIncludeAll;

    lines += translate(command.locale, favorites.exec.success.lineQuestion, {
      index: i + 1,
      id: final[i].id,
      question: limitString(type.question, 50),
      createdAt: type.createdAt
    });
  }

  command.editReply({
    embeds: [
      simpleEmbed(lines, "info", "", {
        text: translate(command.locale, favorites.exec.success.footer, {
          page: valuePage,
          total: Math.ceil(final.length / perPage),
          per: perPage
        }),
        icon_url: command.user.avatarURL() || undefined,
        timestamp: true
      })
    ]
  });
};