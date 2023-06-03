import { Command } from "$core/utils/config/message/command";

export const privacy = {
  name: {
    "en-US": "privacy"
  },
  description: {
    "en-US": "Manage your privacy settings.",
    fr: "Gérez vos paramètres de confidentialité.",
    "pt-BR": "Gerencie suas configurações de privacidade.",
    ru: "Управляйте настройками конфиденциальности.",
    uk: "Керуйте налаштуваннями конфіденційності.",
    "es-ES": "Administrar la configuración de privacidad.",
    de: "Verwalten Sie Ihre Datenschutzeinstellungen."
  },
  exec: {
    deleted: {
      title: {
        "en-US": "Data deleted",
        fr: "Données supprimées",
        "pt-BR": "Dados excluídos",
        ru: "Данные удалены",
        uk: "Дані видалені",
        "es-ES": "Datos eliminados",
        de: "Daten gelöscht"
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
        ].join("\n"),
        ru: [
          "Рад встрече {username}, ваши вопросы, сообщения чата были успешно удалены",
          "\nВот данные, которые остаются о вас:",
          "- Ваше имя пользователя",
          "- Ваш Discord ID",
          "- Язык вашего клиента Discord",
          "- Ваш статус подписки (Premium)",
          "- Дата первого использования бота",
          "- **Для вас**: Количество оставшихся использований на сегодня ({usage}/{maxUsage})",
          "\nВот данные, которые были удалены:",
          "- Ваши сообщения чата",
          "- Ваши вопросы",
          "- Ваши обсуждения",
          "- Количество использований и отправленных сообщений в обсуждениях"
        ].join("\n"),
        uk: [
          "Радий зустрічі {username}, ваші запитання, повідомлення чату були успішно видалені",
          "\nОсь дані, які залишаються про вас:",
          "- Ваше ім'я користувача",
          "- Ваш Discord ID",
          "- Мова вашого клієнта Discord",
          "- Ваш статус підписки (Premium)",
          "- Дата першого використання бота",
          "- **Для вас**: Кількість залишилися використання на сьогодні ({usage}/{maxUsage})",
          "\nОсь дані, які були видалені:",
          "- Ваші повідомлення чату",
          "- Ваші запитання",
          "- Ваші обговорення",
          "- Кількість використань та відправлених повідомлень в обговореннях"
        ].join("\n"),
        "es-ES": [
          "Encantado de conocerte {username}, tus preguntas, mensajes de chat han sido eliminados con éxito",
          "\nAquí están los datos que quedan sobre ti:",
          "- Tu nombre de usuario",
          "- Tu ID de Discord",
          "- El idioma de tu cliente de Discord",
          "- Tu estado de suscripción (Premium)",
          "- La fecha de primera utilización del bot",
          "- **Para ti**: El número de usos restantes para hoy ({usage}/{maxUsage})",
          "\nAquí están los datos que se han eliminado:",
          "- Tus mensajes de chat",
          "- Tus preguntas",
          "- Tus discusiones",
          "- El número de usos y mensajes enviados en las discusiones"
        ].join("\n"),
        de: [
          "Schön dich kennenzulernen {username}, deine Fragen, Chat-Nachrichten wurden erfolgreich gelöscht",
          "\nHier sind die Daten, die über dich übrig sind:",
          "- Dein Benutzername",
          "- Deine Discord-ID",
          "- Die Sprache deines Discord-Clients",
          "- Dein Abonnementstatus (Premium)",
          "- Dein Bot-Erstanwendungsdatum",
          "- **Für dich**: Die Anzahl der verbleibenden Verwendungen für heute ({usage}/{maxUsage})",
          "\nHier sind die Daten, die gelöscht wurden:",
          "- Deine Chat-Nachrichten",
          "- Deine Fragen",
          "- Deine Diskussionen",
          "- Die Anzahl der Verwendungen und Nachrichten, die in den Diskussionen gesendet wurden"
        ].join("\n")
      }
    },
    deleteEmbed: {
      title: {
        "en-US": "Are you sure?",
        fr: "Êtes-vous sûr ?",
        "pt-BR": "Você tem certeza?",
        ru: "Вы уверены?",
        uk: "Ви впевнені?",
        "es-ES": "¿Estás seguro?",
        de: "Bist du sicher?"
      },
      description: {
        "en-US": "Are you sure you want to delete all your data? This action is irreversible.",
        fr: "Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.",
        "pt-BR": "Você tem certeza que deseja excluir todos os seus dados? Esta ação é irreversível.",
        ru: "Вы уверены, что хотите удалить все свои данные? Это действие необратимо.",
        uk: "Ви впевнені, що хочете видалити всі свої дані? Ця дія є незворотньою.",
        "es-ES": "¿Estás seguro de que quieres eliminar todos tus datos? Esta acción es irreversible.",
        de: "Bist du sicher, dass du alle deine Daten löschen möchtest? Diese Aktion ist nicht rückgängig zu machen."
      }
    },
    embed: {
      title: {
        "en-US": "Privacy settings",
        fr: "Paramètres de confidentialité",
        "pt-BR": "Configurações de privacidade",
        ru: "Настройки конфиденциальности",
        uk: "Налаштування конфіденційності",
        "es-ES": "Configuración de privacidad",
        de: "Datenschutzeinstellungen"
      },
      description: {
        "en-US": [
          "You can manage your privacy settings by clicking on the buttons below.",
          "**NOTE:** Buttons grayed is for disabled settings, and buttons colored is for enabled settings.",
          [
            "\nChat collect `💾`: When you open a conversation, the bot will automatically save each message you send. If the setting",
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
            "\nCollecte de discussions `💾`: Lorsque vous ouvrez une conversation, le bot enregistre automatiquement chaque message que",
            "vous envoyez. Si le paramètre est désactivé, après avoir fermé la conversation, le bot supprimera tous les messages que",
            "vous avez envoyés et les données sur **cette** conversation."
          ].join(" "),
          [
            "\nAuto-suppression `🔥`: Tous les 30 jours, toutes vos données (sauf vos paramètres de confidentialité) seront supprimées,",
            "si le paramètre est désactivé, vos données seront conservées jusqu'à ce que vous choisissiez de les supprimer."
          ].join(" "),
          "\n**NOTE:** Si vous souhaitez supprimer vos données, vous pouvez utiliser le bouton `🗑️` ci-dessous."
        ].join("\n"),
        "pt-BR": [
          "Você pode gerenciar suas configurações de privacidade clicando nos botões abaixo.",
          "**NOTA:** Os botões em cinza são para configurações desativadas e os botões coloridos são para configurações ativadas.",
          [
            "\nColeta de bate-papo `💾`: Quando você abre uma conversa, o bot salva automaticamente cada mensagem que você envia. Se a configuração",
            "está desativado, depois de fechar a conversa, o bot irá excluir todas as mensagens que você enviou e os dados sobre **esta** conversa."
          ].join(" "),
          [
            "\nAuto-exclusão `🔥`: A cada 30 dias, todos os seus dados (exceto suas configurações de privacidade) serão excluídos,",
            "se a configuração estiver desativada, seus dados serão mantidos até que você escolha excluí-los."
          ].join(" "),
          "\n**NOTA:** Se você quiser excluir seus dados, pode usar o botão `🗑️` abaixo."
        ].join("\n"),
        ru: [
          "Вы можете управлять настройками конфиденциальности, нажав на кнопки ниже.",
          "**ПРИМЕЧАНИЕ:** Серые кнопки предназначены для отключенных настроек, а цветные кнопки - для включенных настроек.",
          [
            "\nСбор чата `💾`: Когда вы открываете разговор, бот автоматически сохраняет каждое сообщение, которое вы отправляете. Если настройка",
            "отключена, после закрытия разговора бот удалит все отправленные вами сообщения и данные об **этом** разговоре."
          ].join(" "),
          [
            "\nАвтоудаление `🔥`: Каждые 30 дней все ваши данные (кроме настроек конфиденциальности) будут удалены,",
            "если настройка отключена, ваши данные будут сохранены, пока вы не решите их удалить."
          ].join(" "),
          "\n**ПРИМЕЧАНИЕ:** Если вы хотите удалить свои данные, вы можете использовать кнопку `🗑️` ниже."
        ].join("\n"),
        uk: [
          "Ви можете керувати налаштуваннями конфіденційності, натиснувши на кнопки нижче.",
          "**ПРИМІТКА:** Сірі кнопки призначені для вимкнених налаштувань, а кольорові кнопки - для увімкнених налаштувань.",
          [
            "\nЗбір чату `💾`: Коли ви відкриваєте розмову, бот автоматично зберігає кожне повідомлення, яке ви надсилаєте. Якщо налаштування",
            "вимкнено, після закриття розмови бот видалить всі повідомлення, які ви надіслали, та дані про **цю** розмову."
          ].join(" "),
          [
            "\nАвтоудаление `🔥`: Кожні 30 днів всі ваші дані (крім налаштувань конфіденційності) будуть видалені,",
            "якщо налаштування вимкнено, ваші дані будуть збережені, доки ви не вирішите їх видалити."
          ].join(" "),
          "\n**ПРИМІТКА:** Якщо ви хочете видалити свої дані, ви можете використовувати кнопку `🗑️` нижче."
        ].join("\n"),
        "es-ES": [
          "Puede administrar su configuración de privacidad haciendo clic en los botones a continuación.",
          "**NOTA:** Los botones en gris son para configuraciones desactivadas y los botones en color son para configuraciones activadas.",
          [
            "\nRecopilación de chat `💾`: Cuando abre una conversación, el bot guarda automáticamente cada mensaje que envía. Si la configuración",
            "está desactivado, después de cerrar la conversación, el bot eliminará todos los mensajes que envió y los datos sobre",
            "**esta** conversación."
          ].join(" "),
          [
            "\nAuto-eliminación `🔥`: Cada 30 días, todos sus datos (excepto su configuración de privacidad) se eliminarán,",
            "si la configuración está desactivada, sus datos se mantendrán hasta que elija eliminarlos."
          ].join(" "),
          "\n**NOTA:** Si desea eliminar sus datos, puede usar el botón `🗑️` a continuación."
        ].join("\n"),
        de: [
          "Sie können Ihre Datenschutzeinstellungen verwalten, indem Sie auf die Schaltflächen unten klicken.",
          "**HINWEIS:** Graue Schaltflächen sind für deaktivierte Einstellungen und farbige Schaltflächen für aktivierte Einstellungen.",
          [
            "\nChat-Sammlung `💾`: Wenn Sie ein Gespräch öffnen, speichert der Bot automatisch jede Nachricht, die Sie senden. Wenn die Einstellung",
            "ist deaktiviert, nachdem Sie das Gespräch geschlossen haben, löscht der Bot alle Nachrichten, die Sie gesendet haben, und Daten über",
            "**dieses** Gespräch."
          ].join(" "),
          [
            "\nAuto-Löschen `🔥`: Alle 30 Tage werden alle Ihre Daten (außer Ihren Datenschutzeinstellungen) gelöscht,",
            "wenn die Einstellung deaktiviert ist, werden Ihre Daten gespeichert, bis Sie sich entscheiden, sie zu löschen."
          ].join(" "),
          "\n**HINWEIS:** Wenn Sie Ihre Daten löschen möchten, können Sie die Schaltfläche `🗑️` unten verwenden."
        ].join("\n")
      }
    }
  }
} satisfies Command;