import { User as DiscordUser } from "discord.js";
import { prisma } from "../prisma";
import { colors } from "$core/client";
import { DayJS } from "../day-js";
import { Prisma } from "@prisma/client";

type UserIncludeAll = Prisma.UserGetPayload<{
  include: { questions: true; privacy: true; usages: true };
}>

export const userExist = async(userToFind: DiscordUser): Promise<boolean> => {
  await prisma.user.findUnique({
    where: {
      userId: userToFind.id
    }
  }).then(async(user) => {
    if (user) {
      colors.info(`User ${user.username} (${user.userId}) found`);
      return true;
    }

    colors.info(`User ${userToFind.username} (${userToFind.id}) not found, creating... new user`);
    await newUser(userToFind);
    return false;
  });

  return false;
};

export const newUser = async(userToCreate: DiscordUser): Promise<boolean> => {
  await prisma.user.create({
    data: {
      username: userToCreate.username,
      userId: userToCreate.id,
      createdAt: DayJS().unix(),
      privacy: {
        create: {
          autoDelete: false,
          collectChat: true
        }
      },
      usages: {
        create: {
          cmdAsk: 20,
          cmdChat: 20,
          cmdTranslate: 20,
          ctxAsk: 20,
          ctxContext: 20,
          ctxTranslate: 20
        }
      }
    }
  }).then(() => {
    colors.info(`New user created: ${userToCreate.username} (${userToCreate.id})`);
  }).catch(() => {
    colors.error(`Error creating new user: ${userToCreate.username} (${userToCreate.id})`);
  });

  return true;
};

export const getUser = async(userId: string): Promise<UserIncludeAll | null> => {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId
    },
    include: {
      questions: true,
      privacy: true,
      usages: true
    }
  });

  if (!user) {
    colors.info(`User ${userId} not found`);
    return null;
  }

  colors.info(`User ${user.username} (${user.userId}) found`);
  return user;
};

export const updateUser = async(userId: string, data: Prisma.UserUpdateInput): Promise<boolean> => {
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
  });

  return true;
};

export const deleteUser = async(userId: string): Promise<boolean> => {
  await prisma.user.delete({
    where: {
      userId: userId
    }
  }).then(() => {
    colors.info(`User ${userId} deleted`);
  }).catch((err) => {
    colors.error(`Error deleting user ${userId}`);
    console.log(err);
  });

  return true;
};