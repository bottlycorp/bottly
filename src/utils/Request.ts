import prisma from "./Prisma";
import { Request } from "./types";

export async function addRequest(userId: string, request: Request) {
  const response = await prisma.requests.create({
    data: {
      userId: parseInt(userId),
      question: request.question,
      answer: request.answer,
      messageLink: request.messageLink,
      createdAt: request.createdAt,
      channelName: request.channelName,
      guildName: request.guildName,
      options: request.options
    }
  });

  if (response) {
    return true;
  }

  return false;
}

export async function getRequests(userId: string) {
  const response = await prisma.requests.findMany({
    where: {
      userId: parseInt(userId)
    }
  });

  if (response) {
    return response;
  }

  return [];
}

export async function deleteRequests(userId: string) {
  const response = await prisma.requests.deleteMany({
    where: {
      userId: parseInt(userId)
    }
  });

  if (response) {
    return true;
  }

  return false;
}