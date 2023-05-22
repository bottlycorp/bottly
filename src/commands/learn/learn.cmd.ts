import { translate } from "$core/utils/config/message/message.util";
import { simpleButton, simpleEmbed, simpleSelect } from "$core/utils/embed";
import { CommandExecute } from "$core/utils/handler/command";
import { ButtonStyle } from "discord.js";
import { learn } from "./learn.config";
import { interests } from "./interests.config";

export const execute: CommandExecute = async(command) => {
  const embedImage = simpleEmbed(undefined, "info", undefined, undefined, undefined, translate(command.locale, learn.config.imgs));
  const embedText = simpleEmbed(
    translate(command.locale, learn.config.exec.embed.description),
    "info",
    translate(command.locale, learn.config.exec.embed.title)
  );

  const embedInterests = simpleEmbed(
    translate(command.locale, learn.config.exec.embed.descriptionInterests),
    "info",
    translate(command.locale, learn.config.exec.embed.titleInterests)
  );

  const enableBtn = simpleButton(translate(command.locale, learn.config.buttons.enable), ButtonStyle.Secondary, "enable", false, { name: "🔓" });

  const message = await command.editReply({
    embeds: [embedImage, embedText],
    components: [{ type: 1, components: [enableBtn] }]
  });

  const collector = message.createMessageComponentCollector({ time: 60000 });
  collector.on("collect", async(i) => {
    i.deferUpdate();
    if (i.customId === "enable") {
      await command.editReply({
        embeds: [embedInterests],
        components: [{ type: 1, components: [simpleSelect(
          "interests", "Select your interests", Array.from(Object.keys(interests)).map((interest) => {
            return {
              label: translate(command.locale, interests[interest].localization),
              value: interest,
              emoji: { name: interests[interest].emoji }
            };
          })
        )] }]
      });
    }
  });
};