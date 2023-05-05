import { changeToday, colors, today } from "$core/client";
import { EnableInDev } from "$core/utils/handler";
import { TaskExecute, TaskInterval } from "$core/utils/handler/task";
import { DayJS } from "$core/utils/day-js";
import { prisma } from "$core/utils/prisma";
import { getMaxUsage } from "$core/utils/data/user";

export const interval: TaskInterval = "*/2 * * * * *";

export const enableInDev: EnableInDev = true;

export const execute: TaskExecute = async() => {
  const to = DayJS().day();
  if (today !== to) {
    changeToday(to);
    const users = await prisma.user.findMany({
      include: {
        usages: true,
        privacy: true,
        discussions: true,
        questions: true,
        votes: true,
        tips: true
      }
    });

    for (const user of users) {
      if (!user) continue;
      const old = user.usages?.usage;
      if (old == getMaxUsage(user)) {
        colors.warning(`[Usage Reset] ${user.username} (${user.userId}) - ${old} -> ${getMaxUsage(user)} (already max)`);
        continue;
      }

      await prisma.user.update({
        where: { userId: user.userId },
        data: {
          usages: {
            update: {
              usage: getMaxUsage(user)
            }
          }
        }
      });

      colors.warning(`[Usage Reset] ${user.username} (${user.userId}) - ${old} -> ${getMaxUsage(user)}`);
    }
  }
};