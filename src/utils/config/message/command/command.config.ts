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
        },
        reveal_text: {
          "en-US": ":grey_question: {question}\n\n{response}",
          fr: ":grey_question: {question}\n\n{response}",
          "pt-BR": ":grey_question: {question}\n\n{response}",
          "es-ES": ":grey_question: {question}\n\n{response}"
        },
        revealed: {
          "en-US": ":smile: The question has been revealed to the public",
          fr: ":smile: La question a été révélée au public",
          "pt-BR": ":smile: A pergunta foi revelada ao público",
          "es-ES": ":smile: La pregunta ha sido revelada al público"
        },
        reveal_timeout: {
          "en-US": [
            "The reveal time has elapsed, the question has not been revealed to the public",
            "\n\n- You can find the question in your history by doing `/history`"].join(""),
          fr: [
            "Le temps de révélation est écoulé, la question n'a pas été révélée au public",
            "\n\n- Vous pouvez retrouver la question dans votre historique en faisant `/history`"].join(""),
          "pt-BR": [
            "O tempo de revelação expirou, a pergunta não foi revelada ao público",
            "\n\n- Você pode encontrar a pergunta em seu histórico fazendo `/history`"].join(""),
          "es-ES": [
            "Se ha agotado el tiempo de revelación, la pregunta no se ha revelado al público",
            "\n\n- Puede encontrar la pregunta en su historial haciendo `/history`"].join("")
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