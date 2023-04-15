import { User } from "discord.js";
import { prisma } from "../prisma";
import { colors } from "$core/client";

export const userExist = async(userToFind: User): Promise<boolean> => {
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

export const newUser = async(userToCreate: User): Promise<boolean> => {
  await prisma.user.create({
    data: {
      username: userToCreate.username,
      userId: userToCreate.id,
      questions: {},
      contexts: {},
      subscription: {},
      usages: {
        create: {
          cmdAsk: 20,
          cmdChat: 20,
          cmdTranslate: 20,
          ctxAsk: 20,
          ctxContext: 20,
          ctxTranslate: 20,
          id: userToCreate.id
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