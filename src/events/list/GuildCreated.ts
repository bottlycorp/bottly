import Event from "$core/events/Event";
import Logger from "$core/utils/Logger";
import Client from "$core/Client";
import { Guild } from "discord.js";
import "dotenv/config";
import { simpleEmbed } from "$core/utils/Embed";

export default class onInvited extends Event {

  constructor() {
    super("guildCreate", false);
  }

  public async execute(guid: Guild): Promise<void> {
    if (Client.instance.webhook === null) return;

    const text = `**${guid.name}** (${guid.id}) has invited me to their server with **${guid.memberCount}** members`;

    let footer = "Now " + Client.instance.guilds.cache.size + " guilds";
    const owner = await guid.fetchOwner();
    if (owner) footer += " | Owner: " + owner.user.tag;

    Logger.where(text);

    Client.instance.webhook.send({ embeds: [simpleEmbed(text, "success", { iconURL: guid.iconURL() ?? undefined, text: footer })] });
  }

}