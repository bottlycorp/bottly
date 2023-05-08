import { prisma } from "../prisma";
import { colors } from "$core/client";
import { Prisma } from "@prisma/client";
import { User } from "discord.js";
import { userWithId } from "../function";

export type QuestionIncludeAll = Prisma.QuestionGetPayload<{
  include: { user: false };
}>

export const newQuestion = async(user: User, question: Prisma.QuestionCreateArgs): Promise<boolean> => {
  await prisma.user.update({
    where: {
      userId: user.id
    },
    data: {
      questions: {
        create: {
          question: question.data.question,
          answer: question.data.answer,
          createdAt: question.data.createdAt,
          repliedAt: question.data.repliedAt,
          channelName: question.data.channelName,
          guildName: question.data.guildName
        }
      }
    }
  });

  colors.info(`New question created for user ${userWithId(user)}, question: ${question.data.question}`);
  return true;
};

export const getQuestions = async(userId: string, contains?: string): Promise<QuestionIncludeAll[] | null> => {
  const questions = await prisma.question.findMany({
    where: { userId: userId, question: { contains: contains } },
    orderBy: { createdAt: "desc" }
  });

  if (questions == null) return null;
  return questions;
};

export const isQuestionExist = async(id: string, userId: string): Promise<boolean> => {
  const question = await prisma.question.findUnique({
    where: { id: id },
    select: { userId: true }
  });

  if (question == null) return false;
  if (question.userId !== userId) return false;

  return true;
};

export const getQuestion = async(id: string, userId: string): Promise<QuestionIncludeAll | null> => {
  const question = await prisma.question.findUnique({
    where: { id: id },
    include: { user: false }
  });

  if (question == null) return null;
  if (question.userId !== userId) return null;

  return question;
};