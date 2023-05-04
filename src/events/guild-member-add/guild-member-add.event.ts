import { colors } from "$core/client";
import { simpleEmbed } from "$core/utils/embed";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { TextChannel } from "discord.js";

export const enableInDev: EnableInDev = true;

export const event: EventName = "guildCreate";

export const execute: EventExecute<"guildCreate"> = async(guild) => {
  colors.info(`Joined guild ${guild.name} (${guild.id})`);
  const supportGuild = await guild.client.guilds.fetch("1076863331517874240");
  const channel = await supportGuild.channels.fetch("1078050239694520340");

  if (!(channel instanceof TextChannel)) {
    colors.error("Could not find support channel");
    return;
  }

  await channel.send({
    embeds: [
      simpleEmbed(`\`✅\` ${guild.name} (\`${guild.id}\`)`, "info", "", {
        timestamp: true,
        text: "Now in " + guild.client.guilds.cache.size + " guilds!",
        icon_url: guild.client.user?.displayAvatarURL() ?? undefined
      })
    ]
  });
};