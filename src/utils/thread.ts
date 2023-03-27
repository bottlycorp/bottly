import { prisma } from "$core/utils/prisma";
import { Thread } from "$core/utils/types/thread.types";

/**
 * @param threadId
 * @returns {Promise<boolean>}
 * @description Checks if the thread is a discussion thread.
*/
export const checkThread = async(threadId: string) : Promise<boolean> => {
  if (!(await prisma.thread.findUnique({ where: { threadId } }))) {
    return false;
  }

  return true;
};

/**
 * @param threadId
 * @returns {Promise<Thread>}
 * @description Gets the thread from the database.
 * @example const thread = await getThread(interaction.channelId);
 * if (thread.monthly == 0) return interaction.reply({ content: "Your free trial expired (wait next month)", ephemeral: true });
*/
export const getThread = async(threadId: string) : Promise<Thread> => {
  const thread = await prisma.thread.findUnique({ where: { threadId } });
  if (!thread) throw new Error("Thread not found");
  return thread;
};

/**
 * @param threadId
 * @returns {Promise<void>}
 * @description Updates the thread
 * @example await updateThread(interaction.channelId, { monthly: 0 });
*/
export const updateThread = async(threadId: string, data: Partial<Thread>) : Promise<void> => {
  await prisma.thread.update({ where: { threadId }, data });
};

/**
 * @param threadId
 * @returns {Promise<void>}
 * @description Creates the thread
 * @example await createThread(interaction.channelId, { monthly: 0 });
*/
export const createThread = async(threadId: string, data: Partial<Thread>) : Promise<void> => {
  await prisma.thread.create({ data: {
    threadId,
    ...data
  } });
};