export type Request = {
  userId: string;
  askedAt: Date;
  question: string;
  answeredAt: Date;
  answer: string;
  guildId: string;
  channelId: string;
  messageLink: string;
  options: {
    context: string;
    language: string;
  };
}