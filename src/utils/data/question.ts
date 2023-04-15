import { Guild, TextChannel, User } from "discord.js";
import { prisma } from "../prisma";
import { colors } from "$core/client";

type Question = {
  question: string;
  answer: string;
  channel: TextChannel;
  server: Guild;
  context: string;
  user: User;
  askedAt: Date;
  repliedAt: Date;
};

export const newQuestion = async(userId: string, question: Question): Promise<boolean> => {
  await prisma.user.update({
    where: {
      userId: userId
    },
    data: {
      questions: {
        create: {
          question: question.question,
          answer: question.answer,
          createdAt: question.askedAt,
          repliedAt: question.repliedAt
        }
      }
    }
  });

  colors.info(`New question created for user ${userId}, question: ${question.question}`);
  return true;
};

export const getQuestions = async(userId: string): Promise<Question[]> => {
  await prisma.user.findUnique({
    where: {
      userId: userId
    },
    select: {
      questions: true
    }
  }).then((user) => {
    return user?.questions ?? [];
  }).catch(() => {
    return [];
  });

  colors.info(`Getting questions for user ${userId}`);
  return [];
};