export type User = {
  id: string;
  createdAt: Date;
  lastAsked: Date;
  total: number;
  askUsage: number;
  chatUsage: number;
  imageUsage: number;
  premium: boolean;
  email: string;
}