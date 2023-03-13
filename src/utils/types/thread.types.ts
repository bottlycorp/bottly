export type Thread = {
  threadId: string;
  createdAt: Date;
  lastMessage: Date;
  guildId: string;
  userId: string;
  messages: { content: string, role: "user" | "assistant" }[];
  active: boolean;
}

export type IAMessages = {
  content: string;
  name: string;
  role: string;
}[]