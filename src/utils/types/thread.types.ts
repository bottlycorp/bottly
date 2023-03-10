export type Thread = {
  threadId: string;
  createdAt: Date;
  lastMessage: Date;
  guildId: string;
  userId: string;
  messages: { content: string, role: "user" | "assistant" }[];
  active: boolean; // For avoid spamming messages
}

export type IAMessages = {
  content: string;
  name: string;
  role: string;
}[]