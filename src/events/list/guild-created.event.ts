import { Guild } from "discord.js";
import { simpleEmbed } from "$core/utils/embed";
import Event from "$core/events/event";
import Client from "$core/client";
import "dotenv/config";

export default class onInvited extends Event {

  constructor() {
    super("guildCreate", false);
  }

  public async execute(guid: Guild): Promise<void> {
    if (Client.instance.webhook === null) return;

    const bots = guid.members.cache.filter(m => m.user.bot).size;
    const humans = guid.members.cache.filter(m => !m.user.bot).size;

    const text = `**${guid.name}** (${guid.id}) has invited me to their server with **${guid.memberCount}** members (${bots} bots, ${humans} humans)`;

    let footer = "Now " + Client.instance.guilds.cache.size + " guilds";
    const owner = await guid.fetchOwner();
    if (owner) footer += " | Owner: " + owner.user.tag;

    Client.instance.colors.info(text);
    Client.instance.webhook.send({ embeds: [simpleEmbed(text, "success", { iconURL: guid.iconURL() ?? undefined, text: footer })] });
  }

}