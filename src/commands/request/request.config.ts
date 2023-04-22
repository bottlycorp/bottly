import { Command } from "$core/utils/config/message/command/command.type";

export const request = {
  config: {
    name: {
      "en-US": "request"
    },
    options: {
      question: {
        name: {
          "en-US": "question"
        },
        description: {
          "en-US": "The question you want get",
          fr: "La question que vous voulez obtenir",
          "pt-BR": "A pergunta que você deseja obter"
        }
      }
    },
    description: {
      "en-US": "Get an previously asked question",
      fr: "Obtenir une question posée précédemment",
      "pt-BR": "Obtenha uma pergunta anteriormente feita"
    },
    exec: {
      buttons: {},
      auto: {
        "en-US": "At {date}",
        fr: "Le {date}",
        "pt-BR": "Em {date}"
      },
      thisQuestionDoesNotExist: {
        "en-US": "The question you want to recover does not exist, or it is not yours!",
        fr: "La question que vous voulez récupérer n'existe pas, ou elle ne vous appartient pas !",
        "pt-BR": "A pergunta que você deseja recuperar não existe ou não é sua!"
      }
    }
  }
} satisfies Record<string, Command>;