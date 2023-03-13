import dayjs from "dayjs";
import { prisma } from "./Prisma";
import { getUser } from "./User";

export const startTrial = async(userId: string): Promise<boolean> => {
  const user = await getUser(userId);
  if (user.inTrial) return false;

  await prisma.user.update({ where: { id: userId }, data: { premium: true, inTrial: true, trialEnd: dayjs().add(3, "day").unix().toString() } });
  return true;
};

export const endTrial = async(userId: string): Promise<boolean> => {
  const user = await getUser(userId);
  if (!user.inTrial) return false;

  prisma.user.update({ where: { id: userId }, data: { inTrial: false, alreadyTried: true, premium: false } });
  return true;
};

export const checkTrial = async(userId: string): Promise<boolean> => {
  const user = await getUser(userId);
  if (!user.inTrial) return false;

  if (dayjs().isAfter(dayjs(user.trialEnd))) {
    await endTrial(userId);
    return false;
  }

  return true;
};

export const checkTrialEnd = async(userId: string): Promise<boolean> => {
  const user = await getUser(userId);
  if (!user.inTrial) return false;

  if (dayjs().isAfter(dayjs(user.trialEnd))) {
    return true;
  }

  return false;
};