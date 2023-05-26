import { Prisma, PrismaClient } from "@prisma/client";
import { DayJS } from "../day-js";
import { UserIncludeAll } from "./user";

export type DiscussionIncludeAll = Prisma.DiscussionGetPayload<{
  include: { messages: true; user: { include: { usages: true; privacy: true } } };
}>

export const getDiscussion = async(channelId: string): Promise<DiscussionIncludeAll | null> => {
  const prisma = new PrismaClient();
  const discussion = await prisma.discussion.findUnique({
    where: {
      channelId: channelId
    },
    include: {
      messages: true,
      user: { include: { usages: true, privacy: true } }
    }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  if (discussion == null) {
    return null;
  }

  return discussion;
};

export const newDiscussion = async(channelId: string, userId: string, link: string, guildId: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  const created = await prisma.discussion.create({
    data: {
      channelId: channelId,
      guildId: guildId,
      userId: userId,
      active: true,
      messages: {},
      link: link,
      title: "default",
      createdAt: DayJS().unix()
    }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return !!created;
};

export const haveActiveDiscussion = (user: UserIncludeAll): boolean => {
  return Object.values(user.discussions).some((discussion) => discussion.active);
};

export const isADiscussion = async(channelId: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  const discussion = await prisma.discussion.findUnique({
    where: {
      channelId: channelId
    }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return !!discussion;
};

export const closeAllDiscussions = async(guildId: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  const deleted = await prisma.discussion.updateMany({
    where: {
      guildId: guildId,
      active: true
    },
    data: {
      active: false,
      writing: false
    }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return !!deleted;
};

export const closeAllDiscussionsForUser = async(userId: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  const deleted = await prisma.discussion.updateMany({
    where: {
      userId: userId,
      active: true
    },
    data: {
      active: false,
      writing: false
    }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return !!deleted;
};

export const isTheAuthor = async(channelId: string, userId: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  const discussion = await prisma.discussion.findUnique({
    where: {
      channelId: channelId
    }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return discussion?.userId === userId;
};

export const updateDiscussion = async(channelId: string, data: Prisma.DiscussionUpdateInput): Promise<boolean> => {
  const prisma = new PrismaClient();
  const updated = await prisma.discussion.update({
    where: {
      channelId: channelId
    },
    data: data
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return !!updated;
};

export const deleteDiscussion = async(channelId: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  const deleted = await prisma.discussion.delete({
    where: {
      channelId: channelId
    }
  }).finally(async() => {
    await prisma.$disconnect();
  });

  return !!deleted;
};