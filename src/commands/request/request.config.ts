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
      },
      question: {
        "en-US": [
          "This question was asked the <t:{date}:F> (<t:{date2}:R>) and has been answered in `{time}s`, ",
          "has been sent in `{channel}` from `{guild}`.",
          "\n\n**Question:** {question}\n**Answer:** {answer}"
        ].join(""),
        fr: [
          "Cette question a été posée le <t:{date}:F> (<t:{date2}:R>) et a été répondue en `{time}s`, ",
          "a été envoyée dans `{channel}` depuis `{guild}`.",
          "\n\n**Question:** {question}\n**Réponse:** {answer}"
        ].join(""),
        "pt-BR": [
          "Esta pergunta foi feita em <t:{date}:F> (<t:{date2}:R>) e foi respondida em `{time}s`, ",
          "foi enviada em `{channel}` de `{guild}`.",
          "\n\n**Pergunta:** {question}\n**Resposta:** {answer}"
        ].join("")
      }
    }
  }
} satisfies Record<string, Command>;