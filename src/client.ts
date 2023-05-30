import { Client as DiscordClient, GatewayIntentBits, Partials } from "discord.js";
import { load as loadTasks } from "$core/utils/handler/task";
import { load as loadEvents } from "$core/utils/handler/event";
import { listener, load as loadCommands, register } from "$core/utils/handler/command";
import { version } from "../package.json";
import { getStringEnv } from "./utils/env-variable";
import { sep } from "path";
import { Configuration, OpenAIApi } from "openai";
import { AutoPoster } from "topgg-autoposter";
import { isDevEnvironment } from "./utils/environment";
import { DayJS } from "./utils/day-js";
import { BColors } from "bettercolors";
import { DataBeyond } from "@bottlycorp/beyond2021";

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
    format: "DD/MM/YYYY HH:mm:ss",
    surrounded: "[]",
    timezone: "Europe/Paris"
  }
});

export const openai = new OpenAIApi(new Configuration({
  apiKey: getStringEnv("OPENAI_API_KEY"),
  organization: getStringEnv("OPENAI_ORGANIZATION_ID") ?? ""
}));

export const web = new DataBeyond({
  GOOGLE_SEARCH_API_KEY: getStringEnv("GOOGLE_SEARCH_API_KEY"),
  MULTIPLE_SEARCH_API_KEYS: getStringEnv("MULTIPLE_SEARCH_API_KEYS").split(","),
  GOOGLE_SEARCH_ENGINE_ID: getStringEnv("GOOGLE_SEARCH_ENGINE_ID"),
  OPENAI_API_KEY: getStringEnv("OPENAI_API_KEY"),
  OPENAI_ORGANIZATION_ID: getStringEnv("OPENAI_ORGANIZATION_ID") ?? "",
  LOGGER: {
    LOG_ERRORS: true,
    LOG_REQUESTS: true,
    LOG_RESPONSES: true
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