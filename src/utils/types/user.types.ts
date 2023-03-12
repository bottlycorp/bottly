export type User = {
  id: string;
  createdAt: Date;
  lastAsked: Date;
  askUsage: number;
  chatUsage: number;
  imageUsage: number;
  premium: boolean;
  premiumLocked: boolean;
  trails: number;
  email: string;
}