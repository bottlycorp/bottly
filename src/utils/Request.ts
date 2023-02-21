import prisma from "./Prisma";
import { Request } from "./types";

export async function addRequest(userId: string, request: Request) {
  const response = await prisma.requests.create({
    data: {
      userId: parseInt(userId),
      question: request.question,
      answer: request.answer,
      messageLink: request.messageLink
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