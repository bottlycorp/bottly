import Client from "$core/Client";
import Task from "$core/tasks/Task";
import Logger from "$core/utils/Logger";
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
        if (!customer.email) {
          Logger.error("Customer without email " + customer.email);
          return;
        }

        emails.push(customer.email);
      });

      emails.forEach(async(email) => {
        const subscriptions = await findAllSubscriptionsByEmail(email);
        const user = await prisma.user.findFirst({ where: { email } });

        if (subscriptions.map((subscription) => subscription.status).includes("active") && user?.premium === false) {
          if (!user) return;

          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { premium: true }
          });

          premiumRole("add", updatedUser.id);
        }

        if (subscriptions.length === 0) {
          const user = await prisma.user.findFirst({ where: { email } });
          if (!user) return;

          const updatedUser = await prisma.user.update({ where: { id: user.id }, data: { premium: false } });
          premiumRole("remove", updatedUser.id);
        }
      });
    });
  }

}