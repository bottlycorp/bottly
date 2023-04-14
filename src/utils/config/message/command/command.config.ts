import { Command } from "./command.type";

export const commands = {
  ask: {
    name: {
      "en-US": "ask",
      fr: "ask"
    },
    options: {
      question: {
        name: {
          "en-US": "question",
          fr: "question",
          "pt-BR": "pergunta"
        },
        description: {
          "en-US": "The question to ask to the Artificial Intelligence",
          fr: "La question à poser à l'Intelligence Artificielle",
          "pt-BR": "A pergunta a ser feita à Inteligência Artificial"
        }
      }
    },
    description: {
      "en-US": "Ask a question to the Artificial Intelligence",
      fr: "Posez une question à l'Intelligence Artificielle",
      "pt-BR": "Faça uma pergunta à Inteligência Artificial"
    },
    exec: {
      success: {
        "en-US": "{response}",
        fr: "{response}",
        "pt-BR": "{response}"
      },
      error: {
        "en-US": "An error occurred while executing the command: **{error}**"
      }
    }
  }
} satisfies Record<string, Command>;