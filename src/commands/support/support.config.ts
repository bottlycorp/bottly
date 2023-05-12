import { Command } from "$core/utils/config/message/command/command.type";

export const support = {
  config: {
    name: {
      "en-US": "support"
    },
    options: {},
    description: {
      "en-US": "Get the support discord server",
      fr: "Obtenir le serveur discord de support",
      "pt-BR": "Obter o servidor de suporte do discord"
    },
    exec: {
      embedTitle: {
        "en-US": "Support discord server",
        fr: "Serveur discord de support",
        "pt-BR": "Servidor de suporte do discord"
      },
      link: "{discordLink}"
    }
  }
} satisfies Record<string, Command>;