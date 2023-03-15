import dayjs from "dayjs";
import { prisma } from "./Prisma";
import { getUser } from "./User";

export const startTrial = async(userId: string): Promise<boolean> => {
  const user = await getUser(userId);
  if (user.inTrial) return false;

  await prisma.user.update({ where: { id: userId }, data: { premium: true, inTrial: true, trialEnd: dayjs().add(1, "minutes").unix().toString() } });
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
  console.log(user.inTrial);
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