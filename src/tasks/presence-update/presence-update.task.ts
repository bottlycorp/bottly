import { client } from "$core/client";
import { EnableInDev } from "$core/utils/handler";
import { TaskExecute, TaskInterval } from "$core/utils/handler/task";
import { ActivityType } from "discord.js";
import { Activity } from "./presence-update.type";
import { getAvaibleUsers } from "$core/utils/function";
import { numberFormat } from "$core/utils/function";

const activitites: Activity[] = [
  { type: ActivityType.Watching, message: `${numberFormat(getAvaibleUsers())} users` },
  { type: ActivityType.Listening, message: "the questions" },
  { type: ActivityType.Watching, message: "IA domine the world" }
];

let index = 0;

export const interval: TaskInterval = "* * * * *";

export const enableInDev: EnableInDev = true;

export const execute: TaskExecute = async() => {
  const activity = activitites[index++ % activitites.length];
  if (!activity) return console.error("Activity is undefined");
  else client.user?.setActivity(activity.message, { type: activity.type });
};