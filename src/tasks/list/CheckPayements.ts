import Client from "$core/Client";
import Task from "$core/tasks/Task";
import { prisma } from "$core/utils/Prisma";
import { premiumRole } from "$core/utils/Roles";
import { findAllSubscriptionsByEmail } from "$core/utils/Stripe";
import "dotenv/config";

export default class CheckPayements extends Task {

  constructor() {
    super(5000);
  }

  public run(): void {
    const emails: string[] = [];
    const customers = Client.instance.stripe.customers.list();
    customers.then((customers) => {
      customers.data.forEach((customer) => {
        // @ts-ignore
        emails.push(customer.email);
      });

      emails.forEach(async(email) => {
        const subscriptions = await findAllSubscriptionsByEmail(email);
        if (subscriptions.map((subscription) => subscription.status).includes("active")
          || subscriptions.map((subscription) => subscription.status).includes("trialing")) {
          const user = await prisma.user.findFirst({ where: { email } });
          if (!user) return;
          premiumRole("add", user.id);
          return;
        }

        if (subscriptions.length === 0) {
          const user = prisma.user.update({
            where: { email },
            data: { premium: false }
          });

          user.then((user) => {
            premiumRole("remove", user.id);
          });
        }
      });
    });
  }

}