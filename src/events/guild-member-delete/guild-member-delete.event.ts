import { colors } from "$core/client";
import { closeAllDiscussions } from "$core/utils/data/discussion";
import { simpleEmbed } from "$core/utils/embed";
import { numberFormat } from "$core/utils/function";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";
import { TextChannel } from "discord.js";

export const enableInDev: EnableInDev = true;

export const event: EventName = "guildDelete";

export const execute: EventExecute<"guildDelete"> = async(guild) => {
  colors.info(`Removed from guild ${guild.name} (${guild.id})`);
  await closeAllDiscussions(guild.id);
  const supportGuild = await guild.client.guilds.fetch("1076863331517874240");

  if (!supportGuild) {
    colors.error("Could not find support guild");
    return;
  }

  const channel = await supportGuild.channels.fetch("1078050239694520340");

  if (!(channel instanceof TextChannel)) {
    colors.error("Could not find support channel");
    return;
  }

  const totalUsersEachGuild = guild.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

  await channel.send({
    embeds: [
      simpleEmbed(`\`❌\` ${guild.name} (\`${guild.id}\`) - ${numberFormat(guild.memberCount)} members`, "info", "", {
        timestamp: true,
        text: "Now " + guild.client.guilds.cache.size + " guilds for " + numberFormat(totalUsersEachGuild) + " users",
        icon_url: guild.iconURL() ?? guild.client.user?.displayAvatarURL()
      })
    ]
  });
};