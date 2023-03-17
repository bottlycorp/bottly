export type User = {
  id: string;
  createdAt: string;
  lastAsked: string;
  askUsage: number;
  chatUsage: number;
  imageUsage: number;
  premium: boolean;
  inTrial: boolean;
  trialEnd: string;
  alreadyTried: boolean;
  email: string;
}