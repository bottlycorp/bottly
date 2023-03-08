import { prisma } from "$core/utils/Prisma";
import { User } from "$core/utils/types/user.types";

/**
 * @param id
 * @returns {Promise<boolean>}
 * @description Checks if the user exists in the database, if not, it creates it.
 * @example const userExists = await checkUser(interaction.user.id);
 * @example if (!userExists) return interaction.reply({ content: "You've been registered successfuly", ephemeral: true });
 */
export const checkUser = async(id: string) : Promise<boolean> => {
  if (!(await prisma.user.findUnique({ where: { id } }))) {
    await prisma.user.create({ data: { id } });
    return false;
  }

  return true;
};

/**
 * @param id
 * @returns {Promise<User>}
 * @description Gets the user from the database.
 * @example const user = await getUser(interaction.user.id);
 * @example if (user.monthly == 0) return interaction.reply({ content: "Your free trial expired (wait next month)", ephemeral: true });
 */
export const getUser = async(id: string) : Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return user;
};

/**
 * @param id
 * @returns {Promise<void>}
 * @description Updates the user
 * @example await updateUser(interaction.user.id, { monthly: 0 });
*/
export const updateUser = async(id: string, data: Partial<User>) : Promise<void> => {
  await prisma.user.update({ where: { id }, data });
};