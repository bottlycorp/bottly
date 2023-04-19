import { Command } from "$core/utils/config/message/command/command.type";

export const history = {
  config: {
    name: {
      "en-US": "history"
    },
    options: {
      page: {
        name: {
          "en-US": "page"
        },
        description: {
          "en-US": "The page to show",
          fr: "La page à afficher",
          "pt-BR": "A página a ser mostrada"
        }
      },
      per: {
        name: {
          "en-US": "per"
        },
        description: {
          "en-US": "The number of questions to show per page",
          fr: "Le nombre de questions à afficher par page",
          "pt-BR": "O número de perguntas a serem mostradas por página"
        }
      }
    },
    description: {
      "en-US": "Show the history of your asked questions",
      fr: "Affiche l'historique de vos questions posées",
      "pt-BR": "Mostra o histórico de suas perguntas feitas"
    },
    exec: {
      buttons: {
        autosave: {
          "en-US": "Autosave",
          fr: "Sauvegarde automatique",
          "pt-BR": "Salvar automaticamente"
        }
      },
      success: {
        footer: {
          "en-US": "{page}/{total} pages (x{per} per page)",
          fr: "{page}/{total} pages (x{per} par page)",
          "pt-BR": "{page}/{total} páginas (x{per} por página)"
        },
        line: {
          "en-US": "**{index}.** {question} - <t:{timestamp}:R>\n"
        },
        notPremiumLine: {
          "en-US": ":sparkles: You still have `{left}` free questions this month, upgrade to the Premium plan to ask an unlimited number",
          fr: [
            ":sparkles: Vous avez encore `{left}` questions gratuites ce mois-ci,",
            "passez au plan Premium pour poser un nombre illimité de questions"
          ].join(" "),
          "pt-BR": [
            ":sparkles: Você ainda tem `{left}` perguntas gratuitas este mês,",
            "atualize para o plano Premium para fazer um número ilimitado de perguntas"
          ].join(" ")
        },
        voterLine: {
          fr: [
            ":identification_card: Vous avez pour Bottly durant les dernières `12 heures`, ce qui vous permet d'être à 30 utilisations au lieu de 20"
          ].join(" "),
          "en-US": ":identification_card: You have Bottly for the last `12 hours`, which allows you to be at 30 uses instead of 20",
          "pt-BR": ":identification_card: Você tem Bottly por `12 horas`, o que permite que você esteja em 30 usos em vez de 20"
        },
        statsLine: {
          "en-US": ":bar_chart: You asked `{count}` questions this day, and `{total}` questions in total",
          fr: ":bar_chart: Vous avez posé `{count}` questions aujourd'hui, et `{total}` questions au total",
          "pt-BR": ":bar_chart: Você fez `{count}` perguntas hoje e `{total}` perguntas no total"
        },
        settings: {
          "en-US": ":gear: You can disable or enable the saving of your questions in your history by clicking on the `📥` button below",
          fr: [
            ":gear: Vous pouvez désactiver ou activer l'enregistrement de vos questions dans votre",
            "historique en cliquant sur le bouton `📥` ci-dessous"
          ].join(" "),
          "pt-BR": ":gear: Você pode desativar ou ativar o salvamento de suas perguntas em seu histórico clicando no botão `📥` abaixo"
        },
        endLine: {
          "en-US": ":clock1: Your last question was asked <t:{timestamp}:f>",
          fr: ":clock1: Votre dernière question a été posée <t:{timestamp}:f>",
          "pt-BR": ":clock1: Sua última pergunta foi feita <t:{timestamp}:f>"
        }
      }
    }
  }
} satisfies Record<string, Command>;