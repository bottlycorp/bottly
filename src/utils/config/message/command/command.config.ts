import { Command } from "./command.type";

export const models = {
  "fr": "Tu t'appelle Bottly, tu va répondre à {user} en {locale} qui a posé la question suivante : {question} ?",
  "en-US": "You are called Bottly, you will answer to {user} in {locale} who asked the following question: {question} ?",
  "pt-BR": "Você se chama Bottly, você responderá a {user} em {locale} que fez a seguinte pergunta: {question} ?",
  "es-ES": "Te llamas Bottly, responderás a {user} en {locale} que hizo la siguiente pregunta: {question} ?"
};

export const commands = {
  ask: {
    name: {
      "en-US": "ask"
    },
    options: {
      question: {
        name: {
          "en-US": "question",
          "pt-BR": "pergunta",
          "es-ES": "pregunta"
        },
        description: {
          "en-US": "The question to ask to the Artificial Intelligence",
          fr: "La question à poser à l'Intelligence Artificielle",
          "pt-BR": "A pergunta a ser feita à Inteligência Artificial",
          "es-ES": "La pregunta a hacer a la Inteligencia Artificial"
        }
      }
    },
    description: {
      "en-US": "Ask a question to the Artificial Intelligence",
      fr: "Posez une question à l'Intelligence Artificielle",
      "pt-BR": "Faça uma pergunta à Inteligência Artificial",
      "es-ES": "Haga una pregunta a la Inteligencia Artificial"
    },
    exec: {
      buttons: {
        reveal: {
          "en-US": "Reveal to public",
          fr: "Révéler au public",
          "pt-BR": "Revelar ao público",
          "es-ES": "Revelar al público"
        }
      },
      success: {
        "en-US": "{response}"
      },
      error: {
        "en-US": "An error occurred while executing the command: **{error}**",
        fr: "Une erreur est survenue lors de l'exécution de la commande: **{error}**",
        "pt-BR": "Ocorreu um erro ao executar o comando: **{error}**",
        "es-ES": "Se produjo un error al ejecutar el comando: **{error}**"
      }
    }
  }
} satisfies Record<string, Command>;