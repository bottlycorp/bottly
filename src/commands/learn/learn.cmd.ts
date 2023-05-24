import { translate } from "$core/utils/config/message/message.util";
import { simpleButton, simpleEmbed, simpleSelect } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonStyle, StringSelectMenuInteraction } from "discord.js";
import { learn } from "./learn.config";
import { interests } from "./interests.config";
import { DayJS } from "$core/utils/day-js";
import { findCommand } from "$core/utils/handler/command/command";

export const execute: CommandExecute = async(command, user) => {
  if (user.learn?.nextLearn == 0) {
    const message = await command.editReply({
      embeds: [
        simpleEmbed(undefined, "info", undefined, undefined, undefined, translate(command.locale, learn.config.imgs)),
        simpleEmbed(
          translate(command.locale, learn.config.exec.embed.description),
          "info",
          translate(command.locale, learn.config.exec.embed.title)
        )
      ],
      components: [{ type: 1, components: [
        simpleButton(translate(command.locale, learn.config.buttons.enable), ButtonStyle.Secondary, "enable", false, { name: "🔓" })
      ] }]
    });

    let enabledAt = 0;
    const collector = message.createMessageComponentCollector({ time: 60000 });
    collector.on("collect", async(i) => {
      i.deferUpdate();
      if (i.customId === "enable") {
        enabledAt = DayJS().add(24, "hour").unix();
        await command.editReply({
          embeds: [
            simpleEmbed(translate(command.locale, learn.config.exec.embed.descriptionInterests, {
              date: enabledAt
            }),
            "info",
            translate(command.locale, learn.config.exec.embed.titleInterests))
          ],
          components: [{ type: 1, components: [
            simpleSelect(
              "interests",
              translate(command.locale, learn.config.exec.interestPlaceholder),
              Array.from(Object.keys(interests)).map((interest) => {
                return {
                  label: translate(command.locale, interests[interest].localization),
                  value: interest,
                  emoji: { name: interests[interest].emoji }
                };
              }),
              false,
              1,
              10
            )
          ] }]
        });
      } else if (i.customId === "interests" && i instanceof StringSelectMenuInteraction) {
        if (i.values[0] === "none") {
          await command.editReply({
            embeds: [
              simpleEmbed(translate(command.locale, learn.config.exec.embed.descriptionInterestsSkipped, {
                cmdLearn: await findCommand("learn"), date: enabledAt
              }),
              "info",
              translate(command.locale, learn.config.exec.embed.titleInterests))
            ],
            components: []
          });
          return;
        }

        command.editReply({
          embeds: [
            simpleEmbed(translate(command.locale, learn.config.exec.embed.descriptionInterests, { date: enabledAt, interests: i.values.join(", ") }),
              "info",
              translate(command.locale, learn.config.exec.embed.titleInterests))
          ],
          components: []
        });
      }
    });
    return;
  } else {
    // Feature already enabled
  }
};