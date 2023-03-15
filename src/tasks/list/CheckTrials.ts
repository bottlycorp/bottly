import Client from "$core/Client";
import Task from "$core/tasks/Task";
import { prisma } from "$core/utils/Prisma";
import { checkTrial, endTrial } from "$core/utils/Trial";
import { ChannelType, TextChannel } from "discord.js";
import "dotenv/config";

export default class CheckTrials extends Task {

  constructor() {
    super(4000);
  }

  public run(): void {
    const users = prisma.user.findMany({ where: { inTrial: true } });
    users.then((users) => {
      users.forEach(async(user) => {
        const ended = await checkTrial(user.id);
        console.log("end: ", ended);

        if (ended) {
          const uc = Client.instance.users.cache.get(user.id);
          if (!uc) return;

          const trialIsOver = `Hey <@${user.id}>, your trial is over, you can continue to use the basic`
          + " features of the bot, or you can subscribe to support the development and receive premium benefits.";

          if (uc.dmChannel) {
            uc.send(trialIsOver);
          } else {
            const guild = Client.instance.guilds.cache.find((guild) => guild.members.cache.get(user.id)?.permissions.has("SendMessages"));

            const channel = guild?.channels.cache.find((channel) => channel.type === ChannelType.GuildText);
            if (!channel) return;
            if (channel instanceof TextChannel) channel.send(trialIsOver);
          }
        }
      });
    });
  }

}