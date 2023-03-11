// Stripe, find subscription by email
import Client from "$core/Client";
import "dotenv/config";
import Stripe from "stripe";

export const findSubscriptionByEmail = async(email: string): Promise<Stripe.Subscription | null> => {
  const customer = await Client.instance.stripe.customers.list({ email });
  if (customer.data.length === 0) return null;
  const subscription = await Client.instance.stripe.subscriptions.list({ customer: customer.data[0].id });
  if (subscription.data.length === 0) return null;
  return subscription.data[0];
};