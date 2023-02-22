export type User = {
  id: number;
  username: string;
};

export type Request = {
  question: string;
  answer: string;
  messageLink: string;
  createdAt: number;

  channelName?: string;
  guildName?: string;

  options?: {
    context?: string;
    lang?: string;
  };
};