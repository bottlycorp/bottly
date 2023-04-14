import { Client as DiscordClient } from "discord.js";
import { load as loadTasks } from "$core/utils/handler/task";
import { load as loadEvents } from "$core/utils/handler/event";
import { listener, load as loadCommands, register } from "$core/utils/handler/command";
import { version } from "../package.json";
import { getStringEnv } from "./utils/env-variable";
import { sep } from "path";
import { prisma } from "./utils/prisma";
import { BColors } from "bettercolors";

export const client = new DiscordClient({
  intents: [
  ],
  partials: [
  ]
});

export const colors = new BColors({
  date: {
    enabled: true,
    format: "HH:mm:ss",
    surrounded: "[]"
  }
});

colors.info(`Starting Bottly v${version}...`);
client.login(getStringEnv("BOT_TOKEN"));

client.once("ready", async() => {
  const loadedEvents = await loadEvents(client, `${__dirname}${sep}events`);
  colors.info(`${loadedEvents} events have been loaded`);

  const loadedTasks = await loadTasks(`${__dirname}${sep}tasks`);
  colors.info(`${loadedTasks} tasks have been loaded`);

  const loadedCommands = await loadCommands(`${__dirname}${sep}commands`);
  colors.info(`${loadedCommands.builders.size} commands have been loaded`);

  listener(client, loadedCommands.commands);
  await register(client, loadedCommands.builders);
  colors.info("Successfully registered application (/) commands");

  colors.success("The client has been successfully started!");

  registerGuilds();
});

const registerGuilds = async(): Promise<void> => {
  const guilds = await client.guilds.fetch();

  const res = await prisma.guild.createMany({
    data: guilds.map((guild) => ({ id: guild.id })),
    skipDuplicates: true
  });

  if (res.count > 0) colors.info(`The bot has joined ${res.count} server(s) during his offline time`);
};