import { User as DiscordUser } from "discord.js";
import { colors } from "$core/client";
import { Prisma } from "@prisma/client";
import { UsageMax } from "@prisma/client";
import { userWithId } from "$core/utils/function";
import { DayJS } from "../day-js";
import { prisma } from "../prisma";

export type UserIncludeAll = Prisma.UserGetPayload<{
  include: { questions: true; privacy: true; usages: true; discussions: true; tips: true; subscription: true };
}>

export const MAX_USES: Record<UsageMax, number> = {
  [UsageMax.FREE]: 20,
  [UsageMax.PREMIUM]: 50
};

export const getUser = async(userId: DiscordUser | string): Promise<UserIncludeAll> => {
  const user = await prisma.user.findUnique({
    where: {
      userId: typeof userId === "string" ? userId : userId.id
    },
    include: {
      questions: true,
      privacy: true,
      usages: true,
      discussions: true,
      tips: true,
      subscription: true
    }
  });

  if (!user) {
    colors.info(`User ${typeof userId === "string" ? userId : userWithId(userId)} not found, creating...`);
    const createdUser = await prisma.user.create({
      data: {
        userId: typeof userId === "string" ? userId : userId.id,
        isPremium: false,
        privacy: { create: {} },
        tips: { create: {} },
        username: "New User",
        createdAt: DayJS().unix(),
        locale: "en_US",
        usages: { create: {} }
      },
      include: {
        questions: true,
        privacy: true,
        usages: true,
        discussions: true,
        tips: true,
        subscription: true
      }
    });

    return createdUser;
  }

  colors.info(`User ${typeof userId === "string" ? userId : userWithId(userId)} found!`);
  return user;
};

export const updateUser = async(userId: string, data: Prisma.UserUpdateInput): Promise<UserIncludeAll> => {
  const updatedUser = await prisma.user.update({
    where: { userId }, data, include: {
      questions: true,
      privacy: true,
      usages: true,
      discussions: true,
      tips: true,
      subscription: true
    }
  });

  return updatedUser;
};

export const deleteUser = async(userId: string): Promise<void> => {
  await prisma.user.delete({ where: { userId } });
};

export const getMaxUsage = (user: UserIncludeAll): number => {
  return MAX_USES[user.isPremium ? UsageMax.PREMIUM : UsageMax.FREE];
};