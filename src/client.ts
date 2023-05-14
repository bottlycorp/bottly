import { Client as DiscordClient, GatewayIntentBits, Partials } from "discord.js";
import { load as loadTasks } from "$core/utils/handler/task";
import { load as loadEvents } from "$core/utils/handler/event";
import { listener, load as loadCommands, register } from "$core/utils/handler/command";
import { version } from "../package.json";
import { getStringEnv } from "./utils/env-variable";
import { sep } from "path";
import { BColors } from "bettercolors";
import { Configuration, OpenAIApi } from "openai";
import { AutoPoster } from "topgg-autoposter";
import { isDevEnvironment } from "./utils/environment";
import { DayJS } from "./utils/day-js";

export let today = DayJS().day();
export let month = DayJS().month();

export const client = new DiscordClient({
  intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

if (!isDevEnvironment) {
  const poster = AutoPoster(getStringEnv("TOPGG_TOKEN"), client);

  poster.on("posted", () => {
    colors.success("Posted stats to Top.gg!");
  });
}

export const colors = new BColors({
  date: {
    enabled: true,
    format: "HH:mm:ss",
    surrounded: "[]"
  }
});

export const openai = new OpenAIApi(new Configuration({
  apiKey: getStringEnv("OPENAI_API_KEY")
}));

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

  const members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
  colors.log(`Bottly in ready for ${client.guilds.cache.size} guilds and ${members} users!`);
  colors.success("The client has been successfully started!");
});

export const changeToday = (to: number): void => {
  if (today !== to) today = to;
};

export const changeMonth = (to: number): void => {
  if (month !== to) month = to;
};