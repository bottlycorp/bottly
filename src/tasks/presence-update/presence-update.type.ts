import { ActivityType } from "discord.js";

export type Activity = {
  type: Exclude<ActivityType, ActivityType.Custom>;
  message: string;
};