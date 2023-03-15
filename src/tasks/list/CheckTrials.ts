import Task from "$core/tasks/Task";
import { prisma } from "$core/utils/Prisma";
import { checkTrial } from "$core/utils/Trial";
import "dotenv/config";

export default class CheckTrials extends Task {

  constructor() {
    super(10000);
  }

  public run(): void {
    const users = prisma.user.findMany({ where: { inTrial: true } });
    users.then((users) => {
      users.forEach(async(user) => {
        await checkTrial(user.id);
      });
    });
  }

}