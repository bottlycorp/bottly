import { Command } from "$core/utils/config/message/command/command.type";

export const favorites = {
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
        "pt-BR": "A página a ser mostrada",
        ru: "Страница для отображения",
        uk: "Сторінка для відображення",
        "es-ES": "La página a mostrar",
        de: "Die Seite, die angezeigt werden soll"
      }
    },
    per: {
      name: {
        "en-US": "per"
      },
      description: {
        "en-US": "The number of questions to show per page",
        fr: "Le nombre de questions à afficher par page",
        "pt-BR": "O número de perguntas a serem mostradas por página",
        ru: "Количество вопросов для отображения на странице",
        uk: "Кількість питань для відображення на сторінці",
        "es-ES": "El número de preguntas a mostrar por página",
        de: "Die Anzahl der Fragen, die pro Seite angezeigt werden sollen"
      }
    }
  },
  description: {
    "en-US": "Show the history of your asked questions marked as favorites",
    fr: "Affiche l'historique de vos questions posées marquées comme favorites",
    "pt-BR": "Mostra o histórico de suas perguntas feitas marcadas como favoritas",
    ru: "Показать историю ваших заданных вопросов, отмеченных как избранные",
    uk: "Показати історію ваших заданих питань, відмічених як вибрані",
    "es-ES": "Muestra el historial de tus preguntas hechas marcadas como favoritas",
    de: "Zeigt die Historie Ihrer gestellten Fragen, die als Favoriten markiert sind"
  },
  exec: {
    success: {
      footer: {
        "en-US": "{page}/{total} pages (x{per} per page)",
        fr: "{page}/{total} pages (x{per} par page)",
        "pt-BR": "{page}/{total} páginas (x{per} por página)",
        ru: "{page}/{total} страниц (x{per} на странице)",
        uk: "{page}/{total} сторінок (x{per} на сторінці)",
        "es-ES": "{page}/{total} páginas (x{per} por página)",
        de: "{page}/{total} Seiten (x{per} pro Seite)"
      },
      lineQuestion: {
        "en-US": ":grey_question: **{index}.** {question} - <t:{createdAt}:f>\n"
      }
    }
  }
} satisfies Command;