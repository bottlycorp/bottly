import { Client, GatewayIntentBits, Collection} from "discord.js";
const { Guilds, MessageContent, GuildMessages, GuildMembers, GuildPresences } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers, GuildPresences ]})
import { Command } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
config()

client.slashCommands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
  require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.TOKEN)
