import { colors } from "$core/client";
import { simpleEmbed } from "$core/utils/embed";
import { numberFormat } from "$core/utils/function";
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

  const totalUsersEachGuild = guild.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
  const bots = guild.members.cache.filter(member => member.user.bot).size;

  await channel.send({
    embeds: [
      simpleEmbed(
        [
          `\`✅\` ${guild.name} (\`${guild.id}\`)`,
          `\`🔧\` Owner: ${(await guild.fetchOwner()).user.username} (\`${guild.ownerId}\`)`,
          `\`👥\` ${numberFormat(guild.memberCount)} member(s) - ${numberFormat(bots)} bot(s)`
        ].join("\n"), "info", "", {
          timestamp: true,
          text: "Now " + guild.client.guilds.cache.size + " guilds for " + numberFormat(totalUsersEachGuild) + " users",
          icon_url: guild.iconURL() ?? guild.client.user?.displayAvatarURL()
        }
      )
    ]
  });
};