import { prisma } from "../prisma";
import { colors } from "$core/client";
import { Prisma } from "@prisma/client";

type QuestionIncludeAll = Prisma.QuestionGetPayload<{
  include: { user: false };
}>

export const newQuestion = async(userId: string, question: Prisma.QuestionCreateArgs): Promise<boolean> => {
  await prisma.user.update({
    where: {
      userId: userId
    },
    data: {
      questions: {
        create: {
          question: question.data.question,
          answer: question.data.answer,
          createdAt: question.data.createdAt,
          repliedAt: question.data.repliedAt
        }
      }
    }
  });

  colors.info(`New question created for user ${userId}, question: ${question.data.question}`);
  return true;
};

export const getQuestions = async(userId: string): Promise<QuestionIncludeAll[] | null> => {
  const questions = await prisma.question.findMany({
    where: {
      userId: userId
    }
  });

  if (questions == null) {
    return null;
  }

  return questions;
};