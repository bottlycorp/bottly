export type User = {
  id: string;
  createdAt: Date;
  lastAsked: Date;
  askUsage: number;
  chatUsage: number;
  imageUsage: number;
  premium: boolean;
  inTrial: boolean;
  trialEnd: string;
  alreadyTrial: boolean;
  email: string;
}