import Client from "$core/client";
import Task from "$core/tasks/task";
import Logger from "$core/utils/logger";
import { prisma } from "$core/utils/prisma";
import dayjs from "dayjs";
import "dotenv/config";

export default class MonthlyCharge extends Task {

  constructor() {
    super(60000);
  }

  public async run(): Promise<void> {
    const month = (dayjs().month() + 1);
    if (Client.instance.month !== month) {
      Logger.info("Now we are in a new month, all the limits of the users will be reset.");

      await prisma.user.updateMany({
        where: {},
        data: {
          imageUsage: 20,
          chatUsage: 50,
          askUsage: 50
        }
      });

      Client.instance.month = month;
    }
  }

}