import Task from "$core/tasks/task";
import { prisma } from "$core/utils/prisma.utils";
import { checkTrial } from "$core/utils/trial.utils";
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