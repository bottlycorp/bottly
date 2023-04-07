import { checkUser, getUser } from "$core/utils/user";
import { GuildMember } from "discord.js";
import Event from "$core/events/event";

export default class MemberJoin extends Event {

  constructor() {
    super("guildMemberAdd");
  }

  public async execute(member: GuildMember) : Promise<void> {
    if (member.guild.id !== `${process.env.SUPPORT_GUILD_ID}`) return;
    await checkUser(member.id);

    const role = member.guild.roles.cache.get(`${process.env.SUPPORT_PREMIUM_ROLE_ID}`);
    if (!role) return;

    const user = await member.guild.members.fetch(member.id);
    if (!user) return;

    if (user.roles.cache.has(role.id)) return;

    if (await getUser(member.id) !== null && (await getUser(member.id)).premium) {
      user.roles.add(role);
    }
  }

}