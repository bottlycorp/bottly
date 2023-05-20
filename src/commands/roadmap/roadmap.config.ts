import { Command } from "$core/utils/config/message/command/command.type";

export const roadmap = {
  config: {
    name: {
      "en-US": "roadmap"
    },
    options: {},
    description: {
      "en-US": "Show the roadmap of the bot",
      fr: "Affiche la feuille de route du bot",
      "pt-BR": "Mostra a roadmap do bot"
    },
    exec: {
      embedTitle: {
        "en-US": "Roadmap of the bot",
        fr: "Calendrier des sorties",
        "pt-BR": "Roadmap do bot"
      },
      "may": {
        "en-US": "__May__: All the roadmap tasks of the month are done",
        fr: "__Mai__ : Toutes les tâches de la feuille de route du mois sont terminées",
        "pt-BR": "__Maio__: Todas as tarefas da roadmap do mês estão concluídas"
      },
      "june": {
        "en-US": [
          "__June__:",
          "• Add new natives languages for the bot: Ukrainian, Russian and Spanish",
          "• Restore the context menu",
          "• Add models to commands {cmdAsk} and {cmdChat} (🎗️)"
        ].join("\n"),
        "fr": [
          "__Juin__ :",
          "• Ajout de nouvelles langues natives pour le bot : Ukrainien, Russe et Espagnol",
          "• Restauration des options menu contextuel",
          "• Ajout de modèles aux commandes {cmdAsk} et {cmdChat} (🎗️)"
        ].join("\n"),
        "pt-BR": [
          "__Junho__:",
          "• Adicionar novos idiomas nativos para o bot: Ucraniano, Russo e Espanhol",
          "• Restaurar o menu de contexto",
          "• Adicionar modelos aos comandos {cmdAsk} e {cmdChat} (🎗️)"
        ].join("\n")
      },
      priorityText: {
        "en-US": "🎗️: Priority of the month",
        fr: "🎗️: Priorité du mois",
        "pt-BR": "🎗️: Prioridade do mês"
      }
    }
  }
} satisfies Record<string, Command>;