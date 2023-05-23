import { Command } from "$core/utils/config/message/command/command.type";

export const learn = {
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
    buttons: {
      enable: {
        "en-US": "Enable this feature",
        fr: "Activer cette fonctionnalitée",
        "pt-BR": "Ativar este recurso",
        ru: "Включить эту функцию",
        uk: "Увімкніть цю функцію",
        "es-ES": "Habilitar esta función"
      },
      disable: {
        "en-US": "Disable this feature",
        fr: "Désactiver cette fonctionnalitée",
        "pt-BR": "Desativar este recurso",
        ru: "Отключить эту функцию",
        uk: "Вимкніть цю функцію",
        "es-ES": "Deshabilitar esta función"
      }
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
        titleInterests: {
          "en-US": "What are your interests?",
          fr: "Vos centres d'intérêts",
          "pt-BR": "Seus interesses",
          ru: "Ваши интересы",
          uk: "Ваші інтереси",
          "es-ES": "Tus intereses"
        },
        description: {
          fr: [
            "• Activer cette fonctionnalitée pour recevoir tout les jours à `{time}` une information sur un ou plusieurs centres d'intérêts",
            ["• Vous pouvez choisir vos centres d'intérêts une fois la fonctionnalitée activée, vous pourrez en ajouter ou en supprimer",
              "à tout moment"].join(" "),
            [
              "\n:information_source: Les utilisateurs `Premium` peuvent choisir l'heure à laquelle ils souhaitent recevoir leurs informations,",
              "et peuvent séléectionner jusqu'à 10 centres d'intérêts maximum (contre 5 pour les utilisateurs non `Premium`)"
            ].join(" ")
          ].join("\n")
        },
        descriptionInterests: {
          fr: [
            "Time to Learn est maintenant activé, vous recevrez un message tout les jours à `{time}`, sélectionnez maintenant",
            "vos centres d'intérêts avec le select ci-dessous"
          ].join(" ")
        }
      },
      interestPlaceholder: {
        "en-US": "Select your interests",
        fr: "Sélectionnez vos centres d'intérêts",
        "pt-BR": "Selecione seus interesses",
        ru: "Выберите ваши интересы",
        uk: "Виберіть ваші інтереси",
        "es-ES": "Selecciona tus intereses"
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