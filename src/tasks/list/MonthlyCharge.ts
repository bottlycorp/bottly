import Client from "$core/Client";
import Task from "$core/tasks/Task";
import Logger from "$core/utils/Logger";
import { prisma } from "$core/utils/Prisma";
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