export type Request = {
  id: string;
  userId: string;
  askedAt: Date;
  question: string;
  answeredAt: Date;
  answer: string;
  guildName: string;
  channelName: string;
  options: {
    context: string;
    language: string;
  };
  timestamp: string;
}