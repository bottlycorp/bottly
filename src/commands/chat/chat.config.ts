import { Command } from "$core/utils/config/message/command/command.type";

export const chat = {
  config: {
    name: {
      "en-US": "chat"
    },
    description: {
      "en-US": "Principal command of the dialog thread with Bottly",
      fr: "Commande principale de la discussion avec Bottly",
      "pt-BR": "Comando principal da conversa com Bottly"
    },
    subcmds: {
      stop: {
        name: {
          "en-US": "stop"
        },
        description: {
          "en-US": "Stop the current dialog thread",
          fr: "Arrêtez la discussion en cours",
          "pt-BR": "Pare a conversa atual"
        }
      },
      talk: {
        name: {
          "en-US": "talk"
        },
        options: {
          context: {
            name: {
              "en-US": "context"
            },
            description: {
              "en-US": "Context of the dialog thread",
              fr: "Contexte de la discussion",
              "pt-BR": "Contexto da conversa"
            }
          },
          prompt: {
            name: {
              "en-US": "prompt"
            },
            description: {
              "en-US": "Initial question of the dialog thread",
              fr: "Question initiale de la discussion",
              "pt-BR": "Pergunta inicial da conversa"
            }
          },
          private: {
            name: {
              "en-US": "private"
            },
            description: {
              "en-US": "If the dialog thread is private",
              fr: "Si la discussion est privée",
              "pt-BR": "Se a conversa é privada"
            }
          }
        },
        description: {
          "en-US": "Open a dialog thread fastly with Bottly",
          fr: "Ouvrez une discussion rapide avec Bottly",
          "pt-BR": "Abra um diálogo rápido com Bottly"
        }
      }
    },
    exec: {
      buttons: {},
      channelTemporaryTitle: {
        "en-US": "Discussion with {user}",
        fr: "Discussion avec {user}",
        "pt-BR": "Conversa com {user}"
      },
      channelCreating: {
        "en-US": "<a:typing:1087703097498931290> Your discussion is being created please wait...",
        fr: "<a:typing:1087703097498931290> Votre discussion est en cours de création, veuillez patienter...",
        "pt-BR": "<a:typing:1087703097498931290> Sua conversa está sendo criada, por favor, aguarde..."
      }
    }
  }
} satisfies Record<string, Command>;