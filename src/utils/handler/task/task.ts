import { existsSync, readdirSync, statSync } from "fs";
import { sep } from "path";
import { TaskExecute, TaskInterval } from "./task.type";
import { EnableInDev } from "../handler.type";
import { isDevEnvironment } from "$core/utils/environment";
import { startCronJob } from "$core/utils/cron";

export const load = async(tasksFolder: string): Promise<number> => {
  const folders = readdirSync(tasksFolder);
  let tasksLoaded = 0;

  for (const folder of folders) {
    const path = `${tasksFolder}${sep}${folder}${sep}`;

    if (!statSync(path).isDirectory()) continue;

    const taskFileName = `${folder}.task.ts`;

    if (!existsSync(`${path}${taskFileName}`)) throw new Error(`"${taskFileName}" file can't be found in \`${path}\``);

    const dynamicImport = await import(`${path}${taskFileName}`);
    const enableInDev: EnableInDev = dynamicImport.enableInDev ?? false;

    if (!enableInDev && isDevEnvironment) continue;

    const taskInterval: TaskInterval = dynamicImport.interval;

    if (!taskInterval) throw new Error(`"interval" isn't defined in ${path}${taskFileName}`);

    const execute: TaskExecute = dynamicImport.execute;

    if (!execute) throw new Error(`"execute" isn't defined in ${path}${taskFileName}`);

    startCronJob(taskInterval, execute);

    tasksLoaded++;
  }

  return tasksLoaded;
};