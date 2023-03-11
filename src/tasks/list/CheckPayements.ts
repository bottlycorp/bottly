import Client from "$core/Client";
import Task from "$core/tasks/Task";
import Logger from "$core/utils/Logger";
import { prisma } from "$core/utils/Prisma";
import { typePremium } from "$core/utils/User";
import "dotenv/config";

export default class CheckPayements extends Task {

  constructor() {
    super(5000);
  }

  public run(): void {
    // Get status "all" and in live mode
    Client.instance.stripe.subscriptions.list({
      status: "all"
    }).then((subscriptions) => {
      subscriptions.data.forEach(async(subscription) => {
        if (subscription.livemode == (process.env.STRIPE_LIVE_MODE ?? false)) return;
        const customer = await Client.instance.stripe.customers.retrieve(subscription.customer as string);

        const user = await prisma.user.findFirst({ where: { email: customer.email } });

        if (subscription.status !== "active" && subscription.status !== "trialing") {
          if (user == null) return;
          prisma.user.update({ where: { id: user.id }, data: { premium: false } });
          return;
        } else {
          if (user == null) return;

          const update = await prisma.user.update({ where: { id: user.id }, data: { premium: typePremium(subscription.status) } });
          if (update == null) return;
        }
      });
    });
  }

}