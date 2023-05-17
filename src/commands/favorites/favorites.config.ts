import { Command } from "$core/utils/config/message/command/command.type";

export const favorites = {
  config: {
    name: {
      "en-US": "favorites"
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
      "en-US": "Show the history of your asked questions marked as favorites",
      fr: "Affiche l'historique de vos questions posées marquées comme favorites",
      "pt-BR": "Mostra o histórico de suas perguntas feitas marcadas como favoritas"
    },
    exec: {
      success: {
        footer: {
          "en-US": "{page}/{total} pages (x{per} per page)",
          fr: "{page}/{total} pages (x{per} par page)",
          "pt-BR": "{page}/{total} páginas (x{per} por página)"
        },
        lineQuestion: {
          "en-US": ":grey_question: **{index}.** {question} - <t:{createdAt}:f>\n"
        }
      }
    }
  }
} satisfies Record<string, Command>;