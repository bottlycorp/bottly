import { Client } from "discord.js";
import { existsSync, readdirSync, statSync } from "fs";
import { sep } from "path";
import { EnableInDev } from "../handler.type";
import { isDevEnvironment } from "$core/utils/environment";
import { EventExecute, EventName, EventOnce } from "./event.type";

export const load = async(client: Client, eventsFolder: string): Promise<number> => {
  const folders = readdirSync(eventsFolder);
  let loadedEvents = 0;

  for (const folder of folders) {
    const path = `${eventsFolder}${sep}${folder}${sep}`;

    if (!statSync(path).isDirectory()) continue;

    const eventFileName = `${folder}.event.ts`;

    if (!existsSync(`${path}${eventFileName}`)) throw new Error(`"${eventFileName}" file can't be found in \`${path}\``);

    const dynamicImport = await import(`${path}${eventFileName}`);
    const enableInDev: EnableInDev = dynamicImport.enableInDev ?? false;

    if (!enableInDev && isDevEnvironment) continue;

    const eventName: EventName = dynamicImport.event;

    if (!eventName) throw new Error(`"event" isn't defined in ${path}${eventFileName}`);

    const execute: EventExecute<EventName> = dynamicImport.execute;

    if (!execute) throw new Error(`"execute" isn't defined in ${path}${eventFileName}`);

    const isOnce: EventOnce = dynamicImport.once ?? false;

    client[isOnce ? "once" : "on"](eventName, (...args) => execute(...args));

    loadedEvents++;
  }

  return loadedEvents;
};