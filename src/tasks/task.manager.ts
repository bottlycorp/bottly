import { readdirSync } from "fs";
import Client from "$core/client";

export default class TaskManager {

  public async load() : Promise<void> {
    const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    let i = 0;
    for (const file of files) {
      const dynamicImport = await import(`./list/${file}`);
      new dynamicImport.default();
      i++;
    }

    Client.instance.colors.info(`${i} tasks loaded`);
  }

}