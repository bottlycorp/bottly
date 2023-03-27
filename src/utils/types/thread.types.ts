export type Thread = {
  threadId: string;
  createdAt: Date;
  lastMessage: Date;
  guildId: string;
  userId: string;
  messages: { content: string, role: "user" | "assistant" }[];
  active: boolean;
  modalId: string;
  context: string;
}

export type IAMessages = {
  content: string;
  name: string;
  role: string;
}[]