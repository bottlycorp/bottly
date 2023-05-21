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
          "pt-BR": "A pergunta a ser feita à Inteligência Artificial",
          ru: "Вопрос, который нужно задать искусственному интеллекту",
          uk: "Питання, яке потрібно задати штучному інтелекту",
          "es-ES": "La pregunta a hacer a la Inteligencia Artificial"
        }
      },
      context: {
        name: {
          "en-US": "context"
        },
        description: {
          "en-US": "Include an old question and answer in the request",
          fr: "Inclure une ancienne question et réponse dans la demande",
          "pt-BR": "Incluir uma pergunta e resposta antiga na solicitação",
          ru: "Включить старый вопрос и ответ в запрос",
          uk: "Включити старе питання та відповідь в запит",
          "es-ES": "Incluir una pregunta y respuesta antigua en la solicitud"
        }
      },
      lang: {
        name: {
          "en-US": "lang"
        },
        description: {
          "en-US": "The language in which the bot will answer",
          fr: "Langue dans la quel le bot va répondre",
          "pt-BR": "Língua na qual o bot irá responder",
          ru: "Язык, на котором бот будет отвечать",
          uk: "Мова, на якій бот буде відповідати",
          "es-ES": "Idioma en el que el bot responderá"
        }
      }
    },
    description: {
      "en-US": "Ask a question to the Artificial Intelligence",
      fr: "Posez une question à l'Intelligence Artificielle",
      "pt-BR": "Faça uma pergunta à Inteligência Artificial",
      ru: "Задайте вопрос искусственному интеллекту",
      uk: "Задайте питання штучному інтелекту",
      "es-ES": "Haz una pregunta a la Inteligencia Artificial"
    },
    exec: {
      success: {
        "en-US": "{response}"
      },
      error: {
        "en-US": "An error occurred while executing the command: **{error}**",
        fr: "Une erreur est survenue lors de l'exécution de la commande: **{error}**",
        "pt-BR": "Ocorreu um erro ao executar o comando: **{error}**",
        ru: "Произошла ошибка при выполнении команды: **{error}**",
        uk: "Виникла помилка при виконанні команди: **{error}**",
        "es-ES": "Se produjo un error al ejecutar el comando: **{error}**"
      },
      qrCodeDesc: {
        "en-US": "{emojiQRC} Here is the QR code related to the answer to your question",
        fr: "{emojiQRC} Voici le  QR code en lien avec la réponse à votre question",
        "pt-BR": "{emojiQRC} Aqui está o QR code relacionado à resposta da sua pergunta",
        ru: "{emojiQRC} Вот QR-код, связанный с ответом на ваш вопрос",
        uk: "{emojiQRC} Ось QR-код, пов'язаний з відповіддю на ваше запитання",
        "es-ES": "{emojiQRC} Aquí está el código QR relacionado con la respuesta a tu pregunta"
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
        ].join("\n"),
        ru: [
          "QR-код вопроса: {question}",
          "Язык: {lang}",
          "Ответ: {response}"
        ].join("\n"),
        uk: [
          "QR-код запитання: {question}",
          "Мова: {lang}",
          "Відповідь: {response}"
        ].join("\n"),
        "es-ES": [
          "Código QR de la pregunta: {question}",
          "Idioma: {lang}",
          "Respuesta: {response}"
        ].join("\n")
      },
      waiting: {
        "en-US": "{emojiTypingWumpus} I'm thinking about your question...",
        fr: "{emojiTypingWumpus} Je suis entrain de réfléchir à votre question...",
        "pt-BR": "{emojiTypingWumpus} Estou pensando na sua pergunta...",
        ru: "{emojiTypingWumpus} Я думаю над вашим вопросом...",
        uk: "{emojiTypingWumpus} Я думаю над вашим запитанням...",
        "es-ES": "{emojiTypingWumpus} Estoy pensando en tu pregunta..."
      }
    }
  }
} satisfies Record<string, Command>;