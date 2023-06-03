import { Command } from "$core/utils/config/message/command/command.type";

export const request = {
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
        "pt-BR": "A pergunta que você deseja obter",
        ru: "Вопрос, который вы хотите получить",
        uk: "Питання, яке ви хочете отримати",
        "es-ES": "La pregunta que desea obtener",
        de: "Die Frage, die Sie erhalten möchten"
      }
    }
  },
  description: {
    "en-US": "Get an previously asked question",
    fr: "Obtenir une question posée précédemment",
    "pt-BR": "Obtenha uma pergunta anteriormente feita",
    ru: "Получить ранее заданный вопрос",
    uk: "Отримати попередньо задане питання",
    "es-ES": "Obtener una pregunta hecha anteriormente",
    de: "Erhalten Sie eine zuvor gestellte Frage"
  },
  buttons: {
    knowMore: {
      "en-US": "Know more",
      fr: "En savoir plus",
      "pt-BR": "Saber mais",
      ru: "Узнать больше",
      uk: "Дізнатися більше",
      "es-ES": "Saber más",
      de: "Mehr wissen"
    }
  },
  exec: {
    auto: {
      "en-US": "At {date}",
      fr: "Le {date}",
      "pt-BR": "Em {date}",
      ru: "В {date}",
      uk: "В {date}",
      "es-ES": "En {date}",
      de: "Am {date}"
    },
    thisQuestionDoesNotExist: {
      "en-US": "The question you want to recover does not exist, or it is not yours!",
      fr: "La question que vous voulez récupérer n'existe pas, ou elle ne vous appartient pas !",
      "pt-BR": "A pergunta que você deseja recuperar não existe ou não é sua!",
      ru: "Вопрос, который вы хотите восстановить, не существует или не принадлежит вам!",
      uk: "Питання, яке ви хочете відновити, не існує або не належить вам!",
      "es-ES": "¡La pregunta que desea recuperar no existe o no es suya!",
      de: "Die Frage, die Sie wiederherstellen möchten, existiert nicht oder gehört Ihnen nicht!"
    },
    question: {
      "en-US": [
        "This question was asked the <t:{date}:F> (<t:{date2}:R>) and has been answered in `{time}s`, ",
        "has been sent in `{channel}` from `{guild}`.\n",
        "{favoriteLine}",
        "{regeneratedManyTimes}",
        "\n\n**Question:** {question}\n**Answer:** {answer}"
      ].join(""),
      fr: [
        "Cette question a été posée le <t:{date}:F> (<t:{date2}:R>) et a été répondue en `{time}s`, ",
        "a été envoyée dans `{channel}` depuis `{guild}`.\n",
        "{favoriteLine}",
        "{regeneratedManyTimes}",
        "\n\n**Question:** {question}\n**Réponse:** {answer}"
      ].join(""),
      "pt-BR": [
        "Esta pergunta foi feita em <t:{date}:F> (<t:{date2}:R>) e foi respondida em `{time}s`, ",
        "foi enviada em `{channel}` de `{guild}`.\n",
        "{favoriteLine}",
        "{regeneratedManyTimes}",
        "\n\n**Pergunta:** {question}\n**Resposta:** {answer}"
      ].join(""),
      ru: [
        "Этот вопрос был задан <t:{date}:F> (<t:{date2}:R>) и был ответ в `{time}s`, ",
        "был отправлен в `{channel}` из `{guild}`.\n",
        "{favoriteLine}",
        "{regeneratedManyTimes}",
        "\n\n**Вопрос:** {question}\n**Ответ:** {answer}"
      ].join(""),
      uk: [
        "Це питання було задано <t:{date}:F> (<t:{date2}:R>) і було відповідь в `{time}s`, ",
        "був відправлений в `{channel}` з `{guild}`.\n",
        "{favoriteLine}",
        "{regeneratedManyTimes}",
        "\n\n**Питання:** {question}\n**Відповідь:** {answer}"
      ].join(""),
      "es-ES": [
        "Esta pregunta fue hecha el <t:{date}:F> (<t:{date2}:R>) y fue respondida en `{time}s`, ",
        "fue enviada en `{channel}` de `{guild}`.\n",
        "{favoriteLine}",
        "{regeneratedManyTimes}",
        "\n\n**Pregunta:** {question}\n**Respuesta:** {answer}"
      ].join(""),
      de: [
        "Diese Frage wurde am <t:{date}:F> (<t:{date2}:R>) gestellt und wurde in `{time}s` beantwortet, ",
        "wurde in `{channel}` von `{guild}` gesendet.\n",
        "{favoriteLine}",
        "{regeneratedManyTimes}",
        "\n\n**Frage:** {question}\n**Antwort:** {answer}"
      ].join("")
    },
    favoriteLine: {
      "en-US": "\n`⭐` This question has been marked as favorite the <t:{date}:F>",
      fr: "\n`⭐` Cette question a été marquée comme favorite le <t:{date}:F>",
      "pt-BR": "\n`⭐` Esta pergunta foi marcada como favorita em <t:{date}:F>",
      ru: "\n`⭐` Этот вопрос был отмечен как избранный <t:{date}:F>",
      uk: "\n`⭐` Це питання було позначено як вибране <t:{date}:F>",
      "es-ES": "\n`⭐` Esta pregunta ha sido marcada como favorita el <t:{date}:F>",
      de: "\n`⭐` Diese Frage wurde am <t:{date}:F> als Favorit markiert"
    },
    regeneratedManyTimes: {
      "en-US": "\n`✨` This question has been regenerated `{times}` times",
      fr: "\n`✨` Cette question a été régénérée `{times}` fois",
      "pt-BR": "\n`✨` Esta pergunta foi regenerada `{times}` vezes",
      ru: "\n`✨` Этот вопрос был восстановлен `{times}` раз",
      uk: "\n`✨` Це питання було відновлено `{times}` разів",
      "es-ES": "\n`✨` Esta pregunta ha sido regenerada `{times}` veces",
      de: "\n`✨` Diese Frage wurde `{times}` Mal regeneriert"
    },
    linksTitle: {
      "en-US": "{emojiBeta} Answer generated based on these links:",
      fr: "{emojiBeta} Réponse générée à partir de ces liens :",
      "pt-BR": "{emojiBeta} Resposta gerada com base nestes links:",
      ru: "{emojiBeta} Ответ, сгенерированный на основе этих ссылок:",
      uk: "{emojiBeta} Відповідь, згенерована на основі цих посилань:",
      "es-ES": "{emojiBeta} Respuesta generada en base a estos enlaces:",
      de: "{emojiBeta} Antwort, die auf diesen Links basiert, generiert:"
    },
    links: {
      "en-US": "`➡️` [{title}]({url})\n"
    }
  }
} satisfies Command;