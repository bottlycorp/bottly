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
        "en-US": [
          "__May__:",
          "• `/premium` command, for give information about the premium and how to get it",
          [
            "• `/privacy` command, for give possibility to read the privacy policy of the bot, edit how the bot use your",
            "data and delete your data (🎗️)"
          ].join(" ")
        ].join("\n"),
        "fr": [
          "__Mai__ :",
          "• Commande `/premium`, pour donner des informations sur le premium et comment l'obtenir",
          [
            "• Commande `/privacy`, pour donner la possibilité de lire la politique de confidentialité du bot,",
            "modifier la façon dont le bot utilise vos données et supprimer vos données (🎗️)"
          ].join(" ")
        ].join("\n"),
        "pt-BR": [
          "__Maio__:",
          "• Comando `/premium`, para dar informações sobre o premium e como obtê-lo",
          [
            "• Comando `/privacy`, para dar a possibilidade de ler a política de privacidade do bot,",
            "editar como o bot usa seus dados e excluir seus dados (🎗️)"
          ].join(" ")
        ].join("\n")
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