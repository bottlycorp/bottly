import Client from "$core/client";
import "dotenv/config";

export const premiumRole: (action: "add" | "remove", userId: string) => Promise<void> = async(action, member) => {
  Client.instance.guilds.fetch(`${process.env.SUPPORT_GUILD_ID}`).then(async(guild) => {
    const role = guild.roles.cache.get(`${process.env.SUPPORT_PREMIUM_ROLE_ID}`);
    if (!role) return;

    const user = await guild.members.cache.get(member) ?? null;
    if (!user) return;

    if (action === "add") {
      user.roles.add(role);
    } else if (action === "remove") {
      user.roles.remove(role);
    }
  });
};