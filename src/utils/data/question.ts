import { prisma } from "../prisma";
import { colors } from "$core/client";
import { Prisma } from "@prisma/client";
import { User } from "discord.js";
import { userWithId } from "../function";

type QuestionIncludeAll = Prisma.QuestionGetPayload<{
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
          repliedAt: question.data.repliedAt
        }
      }
    }
  });

  colors.info(`New question created for user ${userWithId(user)}, question: ${question.data.question}`);
  return true;
};

export const getQuestions = async(userId: string): Promise<QuestionIncludeAll[] | null> => {
  const questions = await prisma.question.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  if (questions == null) {
    return null;
  }

  return questions;
};