import { colors } from "$core/client";
import { prisma } from "$core/utils/prisma";

export const checker = async(): Promise<boolean> => {
  // TODO: Not only for the "learn" column, but for all the feature columns if we add some along the way
  const users = await prisma.user.findMany({
    select: {
      userId: true,
      learn: true
    }
  });

  let someUserHasNoSomeColumn = false;
  for (const user of users) {
    if (!user.learn) {
      colors.debug(`User ${user.userId} has no "learn" column, creating it...`);
      someUserHasNoSomeColumn = true;
      await prisma.user.update({
        where: { userId: user.userId },
        data: { learn: { create: { subjects: {} } } }
      });
    }
  }

  return someUserHasNoSomeColumn;
};