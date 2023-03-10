export type Thread = {
  threadId: string;
  createdAt: Date;
  lastMessage: Date;
  guildId: string;
  userId: string;
  messages: Record<string, string>[];
}

export type IAMessages = {
  content: string;
  name: string;
  role: string;
}[]