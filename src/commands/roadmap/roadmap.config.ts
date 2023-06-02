import { Command } from "$core/utils/config/message/command/command.type";

export const roadmap = {
  name: {
    "en-US": "roadmap"
  },
  options: {},
  description: {
    "en-US": "Show the roadmap of the bot",
    fr: "Affiche la feuille de route du bot",
    "pt-BR": "Mostra a roadmap do bot",
    ru: "Показать планы бота",
    uk: "Показати плани бота",
    "es-ES": "Muestra la hoja de ruta del bot",
    de: "Zeigen Sie die Roadmap des Bots an"
  },
  exec: {
    embedTitle: {
      "en-US": "Roadmap of the bot",
      fr: "Calendrier des sorties",
      "pt-BR": "Roadmap do bot",
      ru: "Планы бота",
      uk: "Плани бота",
      "es-ES": "Hoja de ruta del bot",
      de: "Roadmap des Bots"
    },
    "june": {
      "en-US": [
        "__June__:",
        "• ~~Add new natives languages for the bot: Ukrainian, Russian and Spanish~~",
        "• Restore the context menu",
        "• Add models to commands {cmdAsk} and {cmdChat} (🎗️)"
      ].join("\n"),
      fr: [
        "__Juin__ :",
        "• (✅) ~~Ajout de nouvelles langues natives pour le bot : Ukrainien, Russe et Espagnol~~",
        "• Restauration des options menu contextuel",
        "• Ajout de modèles aux commandes {cmdAsk} et {cmdChat} (🎗️)"
      ].join("\n"),
      "pt-BR": [
        "__Junho__:",
        "• (✅) ~~Adicionar novos idiomas nativos para o bot: Ucraniano, Russo e Espanhol~~",
        "• Restaurar o menu de contexto",
        "• Adicionar modelos aos comandos {cmdAsk} e {cmdChat} (🎗️)"
      ].join("\n"),
      ru: [
        "__Июнь__:",
        "• (✅) ~~Добавление новых родных языков для бота: украинский, русский и испанский~~",
        "• Восстановление контекстного меню",
        "• Добавление моделей к командам {cmdAsk} и {cmdChat} (🎗️)"
      ].join("\n"),
      uk: [
        "__Червень__:",
        "• (✅) ~~Додавання нових рідних мов для бота: українська, російська та іспанська~~",
        "• Відновлення контекстного меню",
        "• Додавання моделей до команд {cmdAsk} та {cmdChat} (🎗️)"
      ].join("\n"),
      "es-ES": [
        "__Junio__:",
        "• (✅) ~~Agregar nuevos idiomas nativos para el bot: ucraniano, ruso y español~~",
        "• Restaurar el menú contextual",
        "• Agregar modelos a los comandos {cmdAsk} y {cmdChat} (🎗️)"
      ].join("\n"),
      de: [
        "__Juni__:",
        "• (✅) ~~Hinzufügen neuer Muttersprachen für den Bot: Ukrainisch, Russisch und Spanisch~~",
        "• Wiederherstellen des Kontextmenüs",
        "• Hinzufügen von Modellen zu den Befehlen {cmdAsk} und {cmdChat} (🎗️)"
      ].join("\n")
    },
    priorityText: {
      "en-US": "🎗️: Priority of the month",
      fr: "🎗️: Priorité du mois",
      "pt-BR": "🎗️: Prioridade do mês",
      ru: "🎗️: Приоритет месяца",
      uk: "🎗️: Пріоритет місяця",
      "es-ES": "🎗️: Prioridad del mes",
      de: "🎗️: Priorität des Monats"
    }
  }
} satisfies Command;