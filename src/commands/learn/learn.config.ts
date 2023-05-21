import { Command } from "$core/utils/config/message/command/command.type";

export const support = {
  config: {
    name: {
      "en-US": "learn"
    },
    options: {},
    description: {
      "en-US": "Learn a little more about the world around you every day",
      fr: "Apprennez en un peu plus chaque jour sur le monde qui vous entoure",
      "pt-BR": "Aprenda um pouco mais sobre o mundo ao seu redor a cada dia",
      ru: "Узнайте немного больше о мире вокруг вас каждый день",
      uk: "Дізнайтеся трохи більше про світ навколо вас кожен день",
      "es-ES": "Aprende un poco más sobre el mundo que te rodea cada día"
    },
    exec: {
      embed: {
        title: {
          "en-US": "What is Time to Learn?",
          fr: "Qu'est-ce que Time to Learn?",
          "pt-BR": "O que é Time to Learn?",
          ru: "Что такое Time to Learn?",
          uk: "Що таке Time to Learn?",
          "es-ES": "¿Qué es Time to Learn?"
        },
        description: {
          "en-US": [
            ["• Every day at 12:00 (UTC+2), you will receive a private message from Bottly with",
              "information about the world around you (or not `👀` it can be another subject)"].join(" "),
            ["• You can react to this message with `👍` or `👎` to say if you liked",
              "or not the information received, so that we can improve the quality of the information"].join(" ")
          ].join("\n"),
          fr: [
            ["• Chaque jour à 12h00 (UTC+2), vous recevrez un message privé de Bottly avec",
              "des informations sur le monde qui vous entoure (ou pas `👀` ça peut être un autre sujet)"].join(" "),
            ["• Vous pouvez réagir à ce message avec `👍` ou `👎` pour dire si vous avez aimé",
              "ou non les informations reçues, afin que nous puissions améliorer la qualité des informations"].join(" ")
          ].join("\n"),
          "pt-BR": [
            ["• Todos os dias às 12:00 (UTC+2), você receberá uma mensagem privada do Bottly com",
              "informações sobre o mundo ao seu redor (ou não `👀` pode ser outro assunto)"].join(" "),
            ["• Você pode reagir a esta mensagem com `👍` ou `👎` para dizer se você gostou",
              "ou não das informações recebidas, para que possamos melhorar a qualidade das informações"].join(" ")
          ].join("\n"),
          ru: [
            ["• Каждый день в 12:00 (UTC+2) вы будете получать личное сообщение от Bottly с",
              "информацией о мире вокруг вас (или нет `👀` это может быть другая тема)"].join(" "),
            ["• Вы можете отреагировать на это сообщение с помощью `👍` или `👎` чтобы сказать, понравилась ли вам",
              "или нет полученная информация, чтобы мы могли улучшить качество информации"].join(" ")
          ].join("\n"),
          uk: [
            ["• Кожен день о 12:00 (UTC+2) ви будете отримувати особисте повідомлення від Bottly з",
              "інформацією про світ навколо вас (або ні `👀` це може бути інша тема)"
            ].join(" "),
            ["• Ви можете відреагувати на це повідомлення за допомогою `👍` або `👎` щоб сказати, чи сподобалась вам",
              "чи ні отримана інформація, щоб ми могли покращити якість інформації"].join(" ")
          ].join("\n"),
          "es-ES": [
            ["• Todos los días a las 12:00 (UTC+2), recibirás un mensaje privado de Bottly con",
              "información sobre el mundo que te rodea (o no `👀` puede ser otro tema)"].join(" "),
            ["• Puedes reaccionar a este mensaje con `👍` o `👎` para decir si te gustó",
              "o no la información recibida, para que podamos mejorar la calidad de la información"].join(" ")
          ].join("\n")
        }
      }
    },
    imgs: {
      "en-US": "https://cdn.discordapp.com/attachments/927843710669062204/1109868925002465401/en-US.png",
      fr: "https://cdn.discordapp.com/attachments/927843710669062204/1109868926743089193/fr.png",
      "pt-BR": "https://cdn.discordapp.com/attachments/927843710669062204/1109868923869991032/pt-BR.png",
      ru: "https://cdn.discordapp.com/attachments/927843710669062204/1109868928949297322/ru.png",
      uk: "https://cdn.discordapp.com/attachments/927843710669062204/1109868929985286174/uk.png",
      "es-ES": "https://cdn.discordapp.com/attachments/927843710669062204/1109868927745540116/es-ES.png"
    }
  }
} satisfies Record<string, Command>;