import { User as DiscordUser } from "discord.js";
import { colors } from "$core/client";
import { DayJS } from "$core/utils/day-js";
import { Prisma, PrismaClient } from "@prisma/client";
import { UsageMax } from "@prisma/client";
import { userWithId } from "$core/utils/function";

export type UserIncludeAll = Prisma.UserGetPayload<{
  include: { questions: true; privacy: true; usages: true; votes: true; discussions: true; tips: true; subscription: true };
}>

export const MAX_USES: Record<UsageMax, number> = {
  [UsageMax.FREE]: 20,
  [UsageMax.PREMIUM]: 50
};

const userCache = new Map<string, UserIncludeAll>();

export const newUser = async(userToCreate: DiscordUser): Promise<UserIncludeAll> => {
  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: {
      username: userToCreate.username,
      userId: userToCreate.id,
      createdAt: DayJS().unix(),
      locale: "en_US",
      messages: {},
      privacy: {
        create: {
          autoDelete: false,
          collectChat: true
        }
      },
      usages: {
        create: {
          max: UsageMax.FREE,
          usage: MAX_USES[UsageMax.FREE]
        }
      },
      isPremium: false,
      questions: {},
      votes: {
        create: {
          active: false,
          allVotes: {},
          count: 0,
          firstVote: "",
          lastVote: ""
        }
      },
      subscription: {},
      tips: {
        create: {
          chatPremiumSaveIt: true
        }
      },
      discussions: {}
    },
    include: {
      questions: true,
      privacy: true,
      usages: true,
      votes: true,
      discussions: true,
      tips: true,
      subscription: true
    }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return user;
};

export const getUser = async(userId: DiscordUser): Promise<UserIncludeAll> => {
  const prisma = new PrismaClient();
  const cacheKey = typeof userId === "string" ? userId : userId.id;

  if (userCache.has(cacheKey)) {
    return userCache.get(cacheKey)!;
  }

  const user = await prisma.user.findUnique({
    where: {
      userId: typeof userId === "string" ? userId : userId.id
    },
    include: {
      questions: true,
      privacy: true,
      usages: true,
      votes: true,
      discussions: true,
      tips: true,
      subscription: true
    }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  if (!user) {
    colors.info(`User ${userWithId(userId)} not found`);
    return newUser(userId);
  }

  colors.info(`User ${userWithId(userId)} found`);
  return user;
};

export const updateUser = async(userId: string, data: Prisma.UserUpdateInput): Promise<boolean> => {
  const prisma = new PrismaClient();
  await prisma.user.update({
    where: {
      userId: userId
    },
    data: data
  }).then(() => {
    colors.info(`User ${userId} updated`);
  }).catch((err) => {
    console.log(err);
    colors.error(`Error updating user ${userId}`);
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return true;
};

export const deleteUser = async(userId: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  await prisma.user.delete({
    where: {
      userId: userId
    }
  }).then(() => {
    colors.info(`User ${userId} deleted`);
  }).catch((err) => {
    colors.error(`Error deleting user ${userId}`);
    console.log(err);
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return true;
};

export const getMaxUsage = (user: UserIncludeAll): number => {
  if (user.isPremium && user.votes?.active) {
    return MAX_USES[UsageMax.PREMIUM] + 10;
  }

  if (user.isPremium && !user.votes?.active) {
    return MAX_USES[UsageMax.PREMIUM];
  }

  if (user.votes?.active && !user.isPremium) {
    return MAX_USES[UsageMax.FREE] + 10;
  }

  return MAX_USES[UsageMax.FREE];
};