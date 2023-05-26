import { colors } from "$core/client";
import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "discord.js";
import { userWithId } from "../function";

export type QuestionIncludeAll = Prisma.QuestionGetPayload<{
  include: { user: false };
}>

export const newQuestion = async(user: User, question: Prisma.QuestionCreateArgs): Promise<false | QuestionIncludeAll> => {
  const prisma = new PrismaClient();

  const data = await prisma.question.create(question).finally(async() => {
    await prisma.$disconnect();
  });

  if (data == null) return false;

  colors.info(`New question created for user ${userWithId(user)}, question: ${question.data.question}`);
  return data;
};

export const getQuestions = async(userId: string, contains?: string): Promise<QuestionIncludeAll[] | null> => {
  const prisma = new PrismaClient();
  const questions = await prisma.question.findMany({
    where: { userId: userId, question: { contains: contains } },
    orderBy: { createdAt: "desc" }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  if (questions == null) return null;
  return questions;
};

export const isQuestionExist = async(id: string, userId: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  const question = await prisma.question.findUnique({
    where: { id: id },
    select: { userId: true }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  if (question == null) return false;
  if (question.userId !== userId) return false;

  return true;
};

export const getQuestion = async(id: string, userId: string): Promise<QuestionIncludeAll | null> => {
  const prisma = new PrismaClient();
  const question = await prisma.question.findUnique({
    where: { id: id },
    include: { user: false }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  if (question == null) return null;
  if (question.userId !== userId) return null;

  return question;
};