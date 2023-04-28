import { colors } from "$core/client";
import { translate } from "$core/utils/config/message/message.util";
import { CommandExecute } from "$core/utils/handler/command";
import { history } from "./history.config";
import { simpleEmbed } from "$core/utils/embed";
import { limitString, userWithId } from "$core/utils/function";
import { usageButton } from "$core/utils/config/buttons";
import { DayJS } from "$core/utils/day-js";
import { TextChannel } from "discord.js";
import { global } from "$core/utils/config/message/command";
import { QuestionIncludeAll } from "$core/utils/data/question";
import { DiscussionIncludeAll } from "$core/utils/data/discussion";

export const execute: CommandExecute = async(command, user) => {
  const channel = command.channel;
  if (!(channel instanceof TextChannel)) {
    command.editReply(translate(command.locale, global.config.exec.notInATextChannel));

    colors.error(userWithId(command.user) + " tried to see his history while not being in a text channel");
    return;
  }

  const questions = user.questions;
  const valuePage: number = command.options.getInteger(history.config.options.page.name["en-US"], false) ?? 1;
  const perPage: number = command.options.getInteger(history.config.options.per.name["en-US"], false) ?? 10;

  if (questions == null && user.discussions == null) {
    command.editReply({ content: "You have no questions/discussions, so you can't see your history" });
    colors.info("User has no questions/discussions, so he can't see his history");
    return;
  }

  const final = [...(questions ?? []), ...(user.discussions ?? [])].sort((a, b) => b.createdAt - a.createdAt);

  let lines = "";
  for (let i = (valuePage - 1) * perPage; i < valuePage * perPage && i < final.length; i++) {
    // check if in user.discussions include final[i].id
    const isDiscussion = user.discussions?.findIndex(d => d.id === final[i].id) !== -1;
    let type: QuestionIncludeAll | DiscussionIncludeAll;
    if (isDiscussion) {
      type = user.discussions?.find(d => d.id === final[i].id) as DiscussionIncludeAll;
      lines += translate(
        command.locale,
        type.title == "default" ? history.config.exec.success.lineDiscussionNoTitle : history.config.exec.success.lineDiscussion,
        {
          index: i + 1,
          id: final[i].id,
          link: type.link,
          title: limitString(type.title, 50),
          createdAt: type.createdAt,
          count: type.count
        }
      );
    } else {
      type = user.questions?.find(q => q.id === final[i].id) as QuestionIncludeAll;
      lines += translate(command.locale, history.config.exec.success.lineQuestion, {
        index: i + 1,
        id: final[i].id,
        question: limitString(type.question, 50),
        createdAt: type.createdAt
      });
    }
  }

  if (user.usages?.max !== "PREMIUM") {
    lines += "\n" + translate(command.locale, history.config.exec.success.notPremiumLine, {
      left: user?.usages?.usage ?? 0
    }) + "\n";
  }

  if (user.votes?.active) {
    lines += "\n" + translate(command.locale, history.config.exec.success.voterLine) + "\n";
  }

  // lines += translate(command.locale, history.config.exec.success.settings) + "\n";

  let askedThisDay = 0;
  for (const question of questions) {
    if (DayJS(question.createdAt * 1000).isSame(DayJS(), "day")) askedThisDay++;
  }

  lines += translate(command.locale, history.config.exec.success.statsLine, {
    count: askedThisDay,
    total: questions.length
  });

  command.editReply({
    embeds: [
      simpleEmbed(lines, "info", "", {
        text: translate(command.locale, history.config.exec.success.footer, {
          page: valuePage,
          total: Math.ceil(questions.length / perPage),
          per: perPage
        }),
        icon_url: command.user.avatarURL() || undefined,
        timestamp: true
      })
    ],
    components: [{ type: 1, components: [
      usageButton(command, user, false)
    ] }]
  });
};