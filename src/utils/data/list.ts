import { DayJS } from "$core/utils/day-js";
import { prisma } from "$core/utils/prisma";
import { UserIncludeAll } from "./user";

export const createList = async(user: UserIncludeAll, name: string): Promise<string> => {
  const list = await prisma.list.create({
    data: {
      name,
      createdAt: DayJS().unix(),
      user: {
        connect: { userId: user.userId }
      }
    }
  });

  return list.id;
};

export const addQuestionToList = async(id: string, questionIds: string[]): Promise<void> => {
  await prisma.list.update({
    where: { id },
    data: {
      questions: {
        connect: questionIds.map(questionId => ({ id: questionId }))
      }
    }
  });
};

export const removeQuestionFromList = async(id: string, questionIds: string[]): Promise<void> => {
  await prisma.list.update({
    where: { id },
    data: {
      questions: {
        disconnect: questionIds.map(questionId => ({ id: questionId }))
      }
    }
  });
};

export const renameList = async(id: string, name: string): Promise<void> => {
  await prisma.list.update({
    where: { id },
    data: { name }
  });
};