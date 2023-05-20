import { colors } from "$core/client";
import { closeAllDiscussionsForUser } from "$core/utils/data/discussion";
import { EnableInDev } from "$core/utils/handler";
import { EventExecute, EventName } from "$core/utils/handler/event";

export const enableInDev: EnableInDev = true;

export const event: EventName = "guildMemberRemove";

export const execute: EventExecute<"guildMemberRemove"> = async(member) => {
  await closeAllDiscussionsForUser(member.id);
  colors.info(`Actives discussions closed for ${member.user.tag} (${member.id}) when left the guild ${member.guild.name} (${member.guild.id})`);
};