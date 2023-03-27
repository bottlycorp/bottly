import Client from "$core/client";
import "dotenv/config";
import Stripe from "stripe";

export const findSubscriptionByEmail = async(email: string): Promise<Stripe.Subscription | null> => {
  const customer = await Client.instance.stripe.customers.list({ email });
  if (customer.data.length === 0) return null;
  const subscription = await Client.instance.stripe.subscriptions.list({ customer: customer.data[0].id });
  if (subscription.data.length === 0) return null;
  return subscription.data[0];
};

export const findAllSubscriptionsByEmail = async(email: string): Promise<Stripe.Subscription[]> => {
  const customer = await Client.instance.stripe.customers.list({ email });
  if (customer.data.length === 0) return [];
  const subscription = await Client.instance.stripe.subscriptions.list({ customer: customer.data[0].id });
  return subscription.data;
};