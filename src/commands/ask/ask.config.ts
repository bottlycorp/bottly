import { Command } from "$core/utils/config/message/command/command.type";

export const models = {
  "fr": "Tu t'appelle Bottly, tu va répondre à {user} en {locale} qui a posé la question suivante : {question} ?",
  "en-US": "You are called Bottly, you will answer to {user} in {locale} who asked the following question: {question} ?",
  "pt-BR": "Você se chama Bottly, você responderá a {user} em {locale} que fez a seguinte pergunta: {question} ?"
};

export const ask = {
  config: {
    name: {
      "en-US": "ask"
    },
    options: {
      prompt: {
        name: {
          "en-US": "prompt"
        },
        description: {
          "en-US": "The question to ask to the Artificial Intelligence",
          fr: "La question à poser à l'Intelligence Artificielle",
          "pt-BR": "A pergunta a ser feita à Inteligência Artificial"
        }
      },
      context: {
        name: {
          "en-US": "context"
        },
        description: {
          "en-US": "Include an old question and answer in the request",
          fr: "Inclure une ancienne question et réponse dans la demande",
          "pt-BR": "Incluir uma pergunta e resposta antiga na solicitação"
        }
      },
      lang: {
        name: {
          "en-US": "lang"
        },
        description: {
          "en-US": "The language in which the bot will answer",
          fr: "Langue dans la quel le bot va répondre",
          "pt-BR": "Língua na qual o bot irá responder"
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
        "en-US": "{response}"
      },
      error: {
        "en-US": "An error occurred while executing the command: **{error}**",
        fr: "Une erreur est survenue lors de l'exécution de la commande: **{error}**",
        "pt-BR": "Ocorreu um erro ao executar o comando: **{error}**"
      },
      qrCodeDesc: {
        "en-US": "{emojiQRC} Here is the QR code related to the answer to your question",
        fr: "{emojiQRC} Voici le  QR code en lien avec la réponse à votre question",
        "pt-BR": "{emojiQRC} Aqui está o QR code relacionado à resposta da sua pergunta"
      },
      qrCode: {
        "en-US": [
          "QR Code of the question: {question}",
          "Language: {lang}",
          "Response: {response}"
        ].join("\n"),
        fr: [
          "QR Code de la question: {question}",
          "Langue: {lang}",
          "Réponse: {response}"
        ].join("\n"),
        "pt-BR": [
          "QR Code da pergunta: {question}",
          "Língua: {lang}",
          "Resposta: {response}"
        ].join("\n")
      },
      waiting: {
        "en-US": "{emojiTypingWumpus} Je suis entrain de réfléchir à votre question...",
        fr: "{emojiTypingWumpus} I'm thinking about your question...",
        "pt-BR": "{emojiTypingWumpus} Estou pensando na sua pergunta..."
      }
    }
  }
} satisfies Record<string, Command>;