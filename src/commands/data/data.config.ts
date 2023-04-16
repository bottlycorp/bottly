import { Command } from "$core/utils/config/message/command/command.type";

export const data = {
  config: {
    name: {
      "en-US": "data"
    },
    description: {
      "en-US": "Manage how Bottly stores your data",
      fr: "Gérer la manière dont Bottly stocke vos données",
      "pt-BR": "Gerencie como o Bottly armazena seus dados"
    },
    exec: {
      explain: {
        "en-US": [
          "You can delete all your data that is linked to your Discord ID by execute the `/data delete` command.",
          "The `📥` button allows you to enable or disable automatic deletion when you finish a conversation with Bottly.",
          "The `📅` button allows you to enable automatic data deletion after 30 days.\n",
          "If the button is `Blue` (primary), the feature is enabled, if it is `Grey` (secondary), the feature is disabled.\n"
        ].join("\n\n"),
        fr: [
          "Vous pouvez supprimer toute vos données qui sont liées à votre ID Discord en exécutant la commande `/data delete`.",
          "Le bouton `📥` vous permet d'activer ou désactiver la suppression automatique lors ce que vous finissez une conversation avec Bottly.",
          "Le bouton `📅` vous permet d'activer la suppression automatique des données après 30 jours.",
          "Si le bouton est `Bleu` (primaire), la fonctionnalité est activée, si il est `Gris` (secondaire), la fonctionnalité est désactivée."
        ].join("\n\n"),
        "pt-BR": [
          "Você pode excluir todos os seus dados vinculados ao seu ID do Discord executando o comando `/data delete`.",
          "O botão `📥` permite que você ative ou desative a exclusão automática quando terminar uma conversa com o Bottly.",
          "O botão `📅` permite que você ative a exclusão automática dos dados após 30 dias.",
          "Se o botão estiver `Azul` (primário), o recurso estiver ativado, se estiver `Cinza` (secundário), o recurso estiver desativado."
        ].join("\n\n")
      },
      delete_confirm: {
        "en-US": [
          "Are you sure you want to delete all your data?",
          "All your data from <t:{date}:F> will be deleted definitively and cannot be recovered.",
          "If you want to confirm the deletion, click on the `🗑️` button.",
          "If you want to cancel the deletion, click on the `❌` button."
        ].join("\n"),
        fr: [
          "Êtes-vous sûr de vouloir supprimer toutes vos données?",
          "Toutes vos données du <t:{date}:F> seront supprimées définitivement et ne pourront pas être récupérées.",
          "Si vous voulez confirmer la suppression, cliquez sur le bouton `🗑️`.",
          "Si vous voulez annuler la suppression, cliquez sur le bouton `❌`."
        ].join("\n"),
        "pt-BR": [
          "Tem certeza de que deseja excluir todos os seus dados?",
          "Todos os seus dados de <t:{date}:F> serão excluídos definitivamente e não poderão ser recuperados.",
          "Se você quiser confirmar a exclusão, clique no botão `🗑️`.",
          "Se você quiser cancelar a exclusão, clique no botão `❌`."
        ].join("\n")
      },
      error: {
        "en-US": "An error occurred while executing the command: **{error}**",
        fr: "Une erreur est survenue lors de l'exécution de la commande: **{error}**",
        "pt-BR": "Ocorreu um erro ao executar o comando: **{error}**"
      }
    }
  }
} satisfies Record<string, Command>;