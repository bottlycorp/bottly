import Client from "$core/Client";
import Task from "$core/tasks/Task";
import { prisma } from "$core/utils/Prisma";
import { premiumRole } from "$core/utils/Roles";
import { findAllSubscriptionsByEmail } from "$core/utils/Stripe";
import "dotenv/config";

export default class CheckPayements extends Task {

  constructor() {
    super(60_000);
  }

  public run(): void {
    const customers = Client.instance.stripe.customers.list();
    customers.then((customers) => {
      customers.data.forEach(async(customer) => {
        if (!customer.email) return;
        const subscriptions = await findAllSubscriptionsByEmail(customer.email);
        const user = await prisma.user.findFirst({ where: { email: customer.email } });

        if (subscriptions.map((subscription) => subscription.status).includes("active") && (user?.premium === false || user?.inTrial === true)) {
          if (!user) return;

          if (user.inTrial) await prisma.user.update({
            where: { id: user.id },
            data: { inTrial: false, alreadyTried: false, trialEnd: "0", premium: true }
          });
          else await prisma.user.update({ where: { id: user.id }, data: { premium: true } });

          premiumRole("add", user.id);
        }

        if (subscriptions.length === 0 && user?.inTrial === false) {
          const user = await prisma.user.findFirst({ where: { email: customer.email } });
          if (!user) return;

          const updatedUser = await prisma.user.update({ where: { id: user.id }, data: { premium: false } });
          premiumRole("remove", updatedUser.id);
        }
      });
    });
  }

}