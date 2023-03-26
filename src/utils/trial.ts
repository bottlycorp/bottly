import dayjs from "dayjs";
import { prisma } from "./prisma";
import { getUser } from "./user";

export const startTrial = async(userId: string): Promise<boolean> => {
  const user = await getUser(userId);
  if (user.inTrial) return false;

  await prisma.user.update({ where: { id: userId }, data: { premium: true, inTrial: true, trialEnd: dayjs().add(3, "days").unix().toString() } });
  return true;
};

export const endTrial = async(userId: string): Promise<boolean> => {
  const user = await getUser(userId);
  if (!user.inTrial) return false;

  await prisma.user.update({ where: { id: userId }, data: { inTrial: false, alreadyTried: true, premium: false, trialEnd: "0" } });
  return true;
};

export const checkTrial = async(userId: string): Promise<boolean> => {
  const user = await getUser(userId);
  if (!user.inTrial) return false;

  if (dayjs().isAfter(dayjs(user.trialEnd))) {
    await endTrial(userId);
    return true;
  }

  return false;
};

export const checkTrialEnd = async(userId: string): Promise<boolean> => {
  const user = await getUser(userId);
  if (!user.inTrial) return false;

  if (dayjs().isAfter(dayjs(user.trialEnd))) {
    return true;
  }

  return false;
};