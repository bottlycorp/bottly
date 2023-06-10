import { DayJS } from "$core/utils/day-js";
import { prisma } from "$core/utils/prisma";
import { UserIncludeAll } from "./user";

export const createList = async(user: UserIncludeAll, name: string): Promise<boolean> => {
  const list = await prisma.list.create({
    data: {
      name,
      createdAt: DayJS().unix(),
      user: {
        connect: { userId: user.userId }
      }
    }
  });

  return !!list;
};

// export const deleteList = async(user: UserIncludeAll, name: string): Promise<void> => {
// };

export const addQuestionToList = async(user: UserIncludeAll, name: string, questionIds: string[]): Promise<void> => {
  const list = await prisma.list.findFirst({
    where: {
      name,
      userId: user.userId
    }
  });

  if (!list) return;

  await prisma.list.update({
    where: {
      id: list.id
    },
    data: {
      questions: {
        connect: questionIds.map(questionId => ({ id: questionId }))
      }
    }
  });
};