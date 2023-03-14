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
  alreadyTrial: boolean;
  email: string;
}