import { translate } from "$core/utils/config/message/message.util";
import { simpleButton, simpleEmbed, simpleSelect } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonStyle, StringSelectMenuInteraction } from "discord.js";
import { learn } from "./learn.config";
import { interests } from "./interests.config";

export const execute: CommandExecute = async(command, user) => {
  if (user.learn?.nextLearn == 0) {
    // Feature not enabled
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

    const collector = message.createMessageComponentCollector({ time: 60000 });
    collector.on("collect", async(i) => {
      i.deferUpdate();
      if (i.customId === "enable") {
        await command.editReply({
          embeds: [
            simpleEmbed(
              translate(command.locale, learn.config.exec.embed.descriptionInterests),
              "info",
              translate(command.locale, learn.config.exec.embed.titleInterests)
            )
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
              })
            ),
            simpleButton(translate(command.locale, learn.config.buttons.skip), ButtonStyle.Secondary, "skip", false, { name: "🔓" })
          ] }]
        });
      } else if (i.customId === "interests" && i instanceof StringSelectMenuInteraction) {
        // TODO: Save interests and send final message
      } else if (i.customId === "skip") {
        // Is alternative to values 0 length
      }
    });
    return;
  } else {
    // Feature already enabled
  }
};