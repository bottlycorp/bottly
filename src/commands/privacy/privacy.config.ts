import { Command } from "$core/utils/config/message/command/command.type";

export const privacy = {
  config: {
    name: {
      "en-US": "privacy"
    },
    description: {
      "en-US": "Manage your privacy settings.",
      fr: "Gérez vos paramètres de confidentialité.",
      "pt-BR": "Gerencie suas configurações de privacidade."
    },
    exec: {
      deleted: {
        title: {
          "en-US": "Data deleted",
          fr: "Données supprimées",
          "pt-BR": "Dados excluídos"
        },
        description: {
          "en-US": [
            "Nice to meet you {username}, your questions, chat messages have been successfully deleted",
            "\nHere are the data that remains about you:",
            "- Your username",
            "- Your Discord ID",
            "- The language of your Discord client",
            "- Your subscription status (Premium)",
            "- Your bot first use date",
            "- **For you**: The number of remaining uses for today ({usage}/{maxUsage})",
            "\nHere are the data that have been deleted:",
            "- Your chat messages",
            "- Your questions",
            "- Your discussions",
            "- The number of uses and messages sent in the discussions"
          ].join("\n"),
          fr: [
            "Heureux de vous avoir connu {username}, vos questions, messages de discussions ont été supprimées avec succès",
            "\nVoici les données qu'il reste sur vous :",
            "- Votre nom d'utilisateur",
            "- Votre identifiant Discord",
            "- La langue de votre client Discord",
            "- Votre status d'abonnement (Premium)",
            "- Votre date de première utilisation du bot",
            "- **Pour vous**: Le nombre d'usage restant pour aujourd'hui ({usage}/{maxUsage})",
            "\nVoici les données qui ont été supprimées :",
            "- Vos messages de discussions",
            "- Vos questions",
            "- Vos discussions",
            "- Le nombre d'utilisations et de messages envoyés dans les discussions"
          ].join("\n"),
          "pt-BR": [
            "Foi um prazer conhecê-lo {username}, suas perguntas, mensagens de bate-papo foram excluídas com sucesso",
            "\nAqui estão os dados que restam sobre você:",
            "- Seu nome de usuário",
            "- Seu ID do Discord",
            "- O idioma do seu cliente Discord",
            "- Seu status de assinatura (Premium)",
            "- Sua data de primeira utilização do bot",
            "- **Para você**: O número de usos restantes para hoje ({usage}/{maxUsage})",
            "\nAqui estão os dados que foram excluídos:",
            "- Suas mensagens de bate-papo",
            "- Suas perguntas",
            "- Suas discussões",
            "- O número de usos e mensagens enviadas nas discussões"
          ].join("\n")
        }
      },
      deleteEmbed: {
        title: {
          "en-US": "Are you sure?",
          fr: "Êtes-vous sûr ?",
          "pt-BR": "Você tem certeza?"
        },
        description: {
          "en-US": "Are you sure you want to delete all your data? This action is irreversible.",
          fr: "Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.",
          "pt-BR": "Você tem certeza que deseja excluir todos os seus dados? Esta ação é irreversível."
        }
      },
      embed: {
        title: {
          "en-US": "Privacy settings",
          fr: "Paramètres de confidentialité",
          "pt-BR": "Configurações de privacidade"
        },
        description: {
          "en-US": [
            "You can manage your privacy settings by clicking on the buttons below.",
            "**NOTE:** Buttons grayed is for disabled settings, and buttons colored is for enabled settings.",
            [
              "\nAuto-save `💾`: When you open a conversation, the bot will automatically save each message you send. If the setting",
              "is disabled, after you close the conversation, the bot will delete all messages you sent and data about **this** conversation."
            ].join(" "),
            [
              "\nAuto-delete `🔥`: Each 30 days, all your data (except your privacy settings be deleted,",
              "if the setting is disabled, your data will be kept until you choose to delete them."
            ].join(" "),
            "\n**NOTE:** If you want to delete your data, you can use the button `🗑️` below."
          ].join("\n"),
          fr: [
            "Vous pouvez gérer vos paramètres de confidentialité en cliquant sur les boutons ci-dessous.",
            "**NOTE:** Les boutons grisés sont pour les paramètres désactivés, et les boutons colorés sont pour les paramètres activés.",
            [
              "\nAuto-save `💾`: Lorsque vous ouvrez une conversation, le bot enregistre automatiquement chaque message que vous envoyez.",
              "Si le paramètre est désactivé, après avoir fermé la conversation, le bot supprimera tous les messages que vous avez envoyés",
              "et les données sur **cette** conversation."
            ].join(" "),
            [
              "\nAuto-delete `🔥`: Tous les 30 jours, toutes vos données (sauf vos paramètres de confidentialité) seront supprimées,",
              "si le paramètre est désactivé, vos données seront conservées jusqu'à ce que vous choisissiez de les supprimer."
            ].join(" "),
            "\n**NOTE:** Si vous souhaitez supprimer vos données, vous pouvez utiliser le bouton `🗑️` ci-dessous."
          ].join("\n"),
          "pt-BR": [
            "Você pode gerenciar suas configurações de privacidade clicando nos botões abaixo.",
            "**NOTA:** Botões cinzas são para configurações desativadas, e botões coloridos são para configurações ativadas.",
            [
              "\nAuto-save `💾`: Quando você abre uma conversa, o bot salva automaticamente cada mensagem que você envia. Se a configuração",
              "estiver desativada, depois de fechar a conversa, o bot excluirá todas as mensagens que você enviou e os dados sobre **esta** conversa."
            ].join(" "),
            [
              "\nAuto-delete `🔥`: A cada 30 dias, todos os seus dados (exceto suas configurações de privacidade) serão excluídos,",
              "se a configuração estiver desativada, seus dados serão mantidos até que você escolha excluí-los."
            ].join(" "),
            "\n**NOTA:** Se você quiser excluir seus dados, pode usar o botão `🗑️` abaixo."
          ].join("\n")
        }
      }
    }
  }
} satisfies Record<string, Command>;