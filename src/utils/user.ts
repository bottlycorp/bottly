import { prisma } from "$core/utils/prisma";
import { User } from "$core/utils/types/user.types";
import "dotenv/config";
import { Request } from "$core/utils/types/request.types";
import dayjs from "dayjs";

/**
 * @param id
 * @returns {Promise<boolean>}
 * @description Checks if the user exists in the database, if not, it creates it.
 * @example const userExists = await checkUser(interaction.user.id);
 * if (!userExists) return interaction.reply({ content: "You've been registered successfuly", ephemeral: true });
 */
export const checkUser = async(id: string) : Promise<boolean> => {
  if (!(await prisma.user.findUnique({ where: { id } }))) {
    await prisma.user.create({ data: { id, createdAt: dayjs().unix().toString() } });
    return false;
  }

  return true;
};

/**
 * @param id
 * @returns {Promise<User>}
 * @description Gets the user from the database.
 * @example const user = await getUser(interaction.user.id);
 * if (user.monthly == 0) return interaction.reply({ content: "Your free trial expired (wait next month)", ephemeral: true });
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

export function isPremium(user: User) : boolean {
  return user.premium || user.id == process.env.OWNER_ID;
}

export function typePremium(type: string) : boolean {
  switch (type) {
    case "active": return true;
    case "trialing": return true;
    case "canceled": return false;
    case "inactive": return false;
    default: return false;
  }
}

export const getRequests = async(userId: string, contain?: string) : Promise<Request[]> => {
  const response = await prisma.requests.findMany({
    where: {
      userId: userId,
      question: {
        contains: contain == undefined ? " " : contain
      }
    }
  });

  if (!response) throw new Error("Request not found");
  if (response.length == 0) return [];
  return response;
};

export const getRequest = async(id: string) : Promise<Request> => {
  const response = await prisma.requests.findUnique({ where: { id } });
  if (!response) throw new Error("Request not found");
  return response;
};