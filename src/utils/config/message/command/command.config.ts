import { Command } from "./command.type";

export const commands = {
  ping: {
    name: {
      "en-US": "ping",
      fr: "ping"
    },
    description: {
      "en-US": "Check the ping of the bot.",
      fr: "Vérifier le ping du bot.",
      "pt-BR": "Verifique o ping do bot."
    },
    exec: {
      success: {
        "en-US": "The ping is **{timestamp}**ms",
        fr: "Le ping est de **{timestamp}**ms",
        "pt-BR": "O ping é **{timestamp}**ms"
      }
    }
  }
} satisfies Record<string, Command>;