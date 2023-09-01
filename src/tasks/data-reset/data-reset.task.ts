import { changeMonth, month } from "$core/client";
import { EnableInDev } from "$core/utils/handler";
import { TaskExecute, TaskInterval } from "$core/utils/handler/task";
import { DayJS } from "$core/utils/day-js";
import { prisma } from "$core/utils/prisma";

export const interval: TaskInterval = "0 * * * *";

export const enableInDev: EnableInDev = true;

export const execute: TaskExecute = async() => {
  const to = DayJS().month();
  if (month !== to) {
    changeMonth(to);

    await prisma.discussion.deleteMany({
      where: {
        user: {
          privacy: {
            autoDelete: true
          }
        }
      }
    });

    await prisma.question.deleteMany({
      where: {
        user: {
          privacy: {
            autoDelete: true
          }
        }
      }
    });
  }
};