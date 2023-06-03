import { Command } from "$core/utils/config/message/command/command.type";

export const privacy = {
    exec: {
      buttons: {
        accept: {
          "en-US": "I accept",
          fr: "J'accepte",
          "pt-BR": "Eu aceito",
          ru: "Я принимаю",
          uk: "Я приймаю",
          "es-ES": "Acepto",
          de: "Ich akzeptiere"
        },
        readFast: {
          "en-US": "I read fast",
          fr: "Je lis vite",
          "pt-BR": "Eu leio rápido",
          ru: "Я читаю быстро",
          uk: "Я читаю швидко",
          "es-ES": "Leo rápido",
          de: "Ich lese schnell"
        }
      },
      loading: {
        "en-US": "Loading...",
        fr: "Chargement...",
        "pt-BR": "Carregando...",
        ru: "Загрузка...",
        uk: "Завантаження...",
        "es-ES": "Cargando...",
        de: "Wird geladen..."
      },
      embedTitle: {
        "en-US": "Privacy management",
        fr: "Gestion de la confidentialité",
        "pt-BR": "Gerenciamento de privacidade",
        ru: "Управление конфиденциальностью",
        uk: "Управління конфіденційністю",
        "es-ES": "Gestión de la privacidad",
        de: "Datenschutzverwaltung"
      },
      doYouAccept: {
        "en-US": "Do you agree to the privacy policy?",
        fr: "Acceptez-vous la politique de confidentialité ?",
        "pt-BR": "Você aceita a política de privacidade?",
        ru: "Вы согласны с политикой конфиденциальности?",
        uk: "Ви згодні з політикою конфіденційності?",
        "es-ES": "¿Acepta la política de privacidad?",
        de: "Stimmen Sie der Datenschutzrichtlinie zu?"
      },
      declined: {
        "en-US": "You have declined the privacy policy, your data will be deleted automatically after using any command that save your data.",
        fr: [
          "Vous avez refusé la politique de confidentialité, les données enregistées seront supprimées automatiquement une fois que",
          "vous aurez utilisé une commande qui enregistre quelque chose."
        ].join(" "),
        "pt-BR": [
          "Você recusou a política de privacidade, os dados salvos serão excluídos automaticamente após o uso de qualquer comando que",
          "salve seus dados."
        ].join(" "),
        ru: [
          "Вы отказались от политики конфиденциальности, ваши данные будут удалены автоматически после использования любой команды,",
          "которая сохраняет ваши данные."
        ].join(" "),
        uk: [
          "Ви відмовилися від політики конфіденційності, ваші дані будуть видалені автоматично після використання будь-якої команди,",
          "яка зберігає ваші дані."
        ].join(" "),
        "es-ES": [
          "Ha rechazado la política de privacidad, sus datos se eliminarán automáticamente después de usar cualquier comando que",
          "guarde sus datos."
        ].join(" "),
        de: [
          "Sie haben die Datenschutzrichtlinie abgelehnt, Ihre Daten werden automatisch gelöscht, nachdem Sie einen Befehl verwendet haben,",
          "der Ihre Daten speichert."
        ].join(" ")
      },
      accepted: {
        "en-US": "You have accepted the privacy policy, your data will be saved and you will be able to retrieve it next time.",
        fr: "Vous avez accepté la politique de confidentialité, vos données seront enregistrées et vous pourrez les récupérer la prochaine fois.",
        "pt-BR": "Você aceitou a política de privacidade, seus dados serão salvos e você poderá recuperá-los na próxima vez.",
        ru: "Вы приняли политику конфиденциальности, ваши данные будут сохранены, и вы сможете получить их в следующий раз.",
        uk: "Ви прийняли політику конфіденційності, ваші дані будуть збережені, і ви зможете отримати їх наступного разу.",
        "es-ES": "Ha aceptado la política de privacidad, sus datos se guardarán y podrá recuperarlos la próxima vez.",
        de: "Sie haben die Datenschutzrichtlinie akzeptiert, Ihre Daten werden gespeichert und Sie können sie beim nächsten Mal abrufen."
      },
      acceptedNotifyExecuted: {
        "en-US": "The command will be executed in a few seconds.",
        fr: "La commande sera exécutée dans quelques secondes.",
        "pt-BR": "O comando será executado em alguns segundos.",
        ru: "Команда будет выполнена через несколько секунд.",
        uk: "Команда буде виконана через кілька секунд.",
        "es-ES": "El comando se ejecutará en unos segundos.",
        de: "Der Befehl wird in wenigen Sekunden ausgeführt."
      },
      privacyPolicy: {
        "en-US": [
          "**Privacy Policy**:\n", [
            "- We use the information you provide only to respond to your requests and to improve our services.",
            "We will not share, sell, or use your information for any purpose other than as set forth in this Privacy Policy\n"
          ].join(" "), [
            "- We take steps to ensure that the information you provide to us is secure. Data transmitted over the Internet cannot be guaranteed to",
            "be 100% secure; however, we take steps to ensure that your information is handled securely and in accordance with applicable laws.\n"
          ].join(" "), [
            "- We may change this privacy notice from time to time. If we make such a change, we will notify you by the bot or by posting a notice",
            "on the Discord servers or on our [support server]({discordLink}).\n"
          ].join(" "), [
            "- You can delete your entire data by contacting support or with the {cmdPrivacy} command"
          ].join(" "), [
            "- The user's messages are stored from the moment you speak in a conversation or ask a question to be retrieved in the request",
            "history (accessible via {cmdHistory}) so that the AI keeps track of your old messages.\n"
          ].join(" "), [
            "- Please take the time to read this policy carefully and feel free to contact us with any questions you may have regarding the",
            "privacy practices of this bot.\n"
          ].join(" "),
          "You will be able to activate the automatic deletion or others (after 30 days) in the {cmdPrivacyDeletion} command",
          "By accepting this privacy policy, you agree that your data will be stored and used as described above."
        ].join("\n"),
        fr: [
          "**Politique de confidentialité**:\n", [
            "- Nous utilisons les informations que vous fournissez uniquement pour répondre à vos demandes et pour améliorer nos services.",
            "Nous ne partagerons, ne vendrons ni n'utiliserons vos informations à aucune autre fin que celles énoncées dans la présente politique de",
            "confidentialité.\n"
          ].join(" "), [
            "- Nous prenons des mesures pour garantir que les informations que vous nous fournissez sont sécurisées. Les données transmises sur",
            "Internet ne peuvent pas être garanties à 100% sécurisées; cependant, nous prenons des mesures pour garantir que vos informations",
            "sont traitées de manière sécurisée et conformément aux lois applicables.\n"
          ].join(" "), [
            "- Nous pouvons modifier cet avis de confidentialité de temps à autre. Si nous apportons une telle modification, nous vous en",
            "aviserons par le bot ou en publiant un avis sur les serveurs Discord ou sur notre [serveur de support]({discordLink}).\n"
          ].join(" "), [
            "- Vous pouvez supprimer l'intégralité de vos données en contactant le support ou avec la commande {cmdPrivacy}"
          ].join(" "), [
            "- Les messages de l'utilisateur sont stockés à partir du moment où vous parlez dans une conversation ou posez une question pour",
            "être récupérés dans l'historique des demandes (accessible via {cmdHistory}) afin que l'IA garde une trace de vos anciens messages.\n"
          ].join(" "), [
            "- Veuillez prendre le temps de lire attentivement cette politique et n'hésitez pas à nous contacter pour toute question que vous",
            "pourriez avoir concernant les pratiques de confidentialité de ce bot.\n"
          ].join(" "),
          "Vous pourrez activer la suppression automatique ou autres (après 30 jours) dans la commande {cmdPrivacyDeletion}",
          "En acceptant cette politique de confidentialité, vous acceptez que vos données soient stockées et utilisées comme décrit ci-dessus."
        ].join("\n"),
        "pt-BR": [
          "**Política de Privacidade**:\n", [
            "- Usamos as informações que você fornece apenas para responder às suas solicitações e melhorar nossos serviços.",
            "Não compartilharemos, venderemos ou usaremos suas informações para qualquer finalidade que não seja a estabelecida nesta Política de",
            "Privacidade.\n"
          ].join(" "), [
            "- Tomamos medidas para garantir que as informações que você nos fornece sejam seguras. Os dados transmitidos pela Internet não",
            "podem ser garantidos como 100% seguros; no entanto, tomamos medidas para garantir que suas informações sejam tratadas com segurança",
            "e de acordo com as leis aplicáveis.\n"
          ].join(" "), [
            "- Podemos alterar este aviso de privacidade de tempos em tempos. Se fizermos tal alteração, notificaremos você pelo bot ou",
            "publicando um aviso nos servidores do Discord ou em nosso [servidor de suporte]({discordLink}).\n"
          ].join(" "), [
            "- Você pode excluir todos os seus dados entrando em contato com o suporte ou com o comando {cmdPrivacy}"
          ].join(" "), [
            "- As mensagens do usuário são armazenadas a partir do momento em que você fala em uma conversa ou faz uma pergunta para",
            "ser recuperado no histórico de solicitações (acessível via {cmdHistory}) para que a IA acompanhe suas mensagens antigas.\n"
          ].join(" "), [
            "- Por favor, reserve um tempo para ler atentamente esta política e sinta-se à vontade para entrar em contato conosco com qualquer",
            "dúvida que possa ter sobre as práticas de privacidade deste bot.\n"
          ].join(" "),
          "Você poderá ativar a exclusão automática ou outras (após 30 dias) no comando {cmdPrivacyDeletion}",
          "Ao aceitar esta política de privacidade, você concorda que seus dados serão armazenados e usados ​​conforme descrito acima."
        ].join("\n"),
        ru: [
          "**Политика конфиденциальности**:\n", [
            "- Мы используем предоставленную вами информацию только для ответа на ваши запросы и для улучшения наших услуг.",
            "Мы не будем передавать, продавать или использовать ваши данные для каких-либо целей, кроме указанных в настоящей Политике",
            "конфиденциальности.\n"
          ].join(" "), [
            "- Мы предпринимаем меры для обеспечения безопасности предоставляемой вами информации. Данные, передаваемые через Интернет, не",
            "могут быть гарантированы как 100% безопасные; однако мы предпринимаем меры для обеспечения безопасной обработки ваших данных",
            "в соответствии с применимыми законами.\n"
          ].join(" "), [
            "- Мы можем время от времени изменять это уведомление о конфиденциальности. Если мы внесем такое изменение, мы уведомим вас",
            "через бота или разместим уведомление на серверах Discord или на нашем [сервере поддержки]({discordLink}).\n"
          ].join(" "), [
            "- Вы можете удалить все свои данные, связавшись со службой поддержки или с помощью команды {cmdPrivacy}"
          ].join(" "), [
            "- Сообщения пользователя хранятся с момента, когда вы говорите в разговоре или задаете вопрос, чтобы получить доступ к",
            "истории запросов (доступной через {cmdHistory}), чтобы ИИ отслеживал ваши старые сообщения.\n"
          ].join(" "), [
            "- Пожалуйста, посвятите время внимательному прочтению этой политики и не стесняйтесь обращаться к нам с любыми вопросами,",
            "которые у вас могут возникнуть относительно практик конфиденциальности этого бота.\n"
          ].join(" "),
          "Вы сможете активировать автоматическое удаление или другие (через 30 дней) в команде {cmdPrivacyDeletion}",
          "Принимая эту политику конфиденциальности, вы соглашаетесь с тем, что ваши данные будут храниться и использоваться, как описано выше."
        ].join("\n"),
        uk: [
          "**Політика конфіденційності**:\n", [
            "- Ми використовуємо надану вами інформацію лише для відповіді на ваші запити та для поліпшення наших послуг.",
            "Ми не будемо передавати, продавати або використовувати ваші дані для будь-яких цілей, крім вказаних у цій Політиці",
            "конфіденційності.\n"
          ].join(" "), [
            "- Ми вживаємо заходів для забезпечення безпеки наданої вами інформації. Дані, передані через Інтернет, не можуть бути",
            "гарантовані як 100% безпечні; однак ми вживаємо заходів для забезпечення безпечної обробки ваших даних відповідно до",
            "застосовних законів.\n"
          ].join(" "), [
            "- Ми можемо час від часу змінювати це повідомлення про конфіденційність. Якщо ми внесемо таку зміну, ми повідомимо вас",
            "через бота або розмістимо повідомлення на серверах Discord або на нашому [сервері підтримки]({discordLink}).\n"
          ].join(" "), [
            "- Ви можете видалити всі свої дані, зв'язавшись зі службою підтримки або за допомогою команди {cmdPrivacy}"
          ].join(" "), [
            "- Повідомлення користувача зберігаються з моменту, коли ви говорите в розмові або задаєте питання, щоб отримати доступ до",
            "історії запитів (доступно через {cmdHistory}), щоб ШІ відстежував ваші старі повідомлення.\n"
          ].join(" "), [
            "- Будь ласка, приділіть час уважному прочитанню цієї політики і не соромтеся звертатися до нас з будь-якими питаннями,",
            "які у вас можуть виникнути щодо практик конфіденційності цього бота.\n"
          ].join(" "),
          "Ви зможете активувати автоматичне видалення або інші (через 30 днів) в команді {cmdPrivacyDeletion}",
          "Приймаючи цю політику конфіденційності, ви погоджуєтеся з тим, що ваші дані будуть збережені та використовуватися, як описано вище."
        ].join("\n"),
        "es-ES": [
          "**Política de privacidad**:\n", [
            "- Utilizamos la información que nos proporciona solo para responder a sus solicitudes y mejorar nuestros servicios.",
            "No compartiremos, venderemos ni utilizaremos su información para ningún otro propósito que no sea el establecido en esta Política",
            "de privacidad.\n"
          ].join(" "), [
            "- Tomamos medidas para garantizar que la información que nos proporciona sea segura. Los datos transmitidos a través de Internet",
            "no pueden garantizarse como 100% seguros; sin embargo, tomamos medidas para garantizar que su información se maneje de manera",
            "segura y de acuerdo con las leyes aplicables.\n"
          ].join(" "), [
            "- Podemos cambiar este aviso de privacidad de vez en cuando. Si hacemos dicho cambio, le notificaremos por el bot o publicando",
            "un aviso en los servidores de Discord o en nuestro [servidor de soporte]({discordLink}).\n"
          ].join(" "), [
            "- Puede eliminar todos sus datos poniéndose en contacto con el soporte o con el comando {cmdPrivacy}"
          ].join(" "), [
            "- Los mensajes del usuario se almacenan desde el momento en que habla en una conversación o hace una pregunta para que se",
            "recupere en el historial de solicitudes (accesible a través de {cmdHistory}) para que la IA realice un seguimiento de sus",
            "mensajes antiguos.\n"
          ].join(" "), [
            "- Tómese el tiempo para leer atentamente esta política y no dude en contactarnos si tiene alguna pregunta sobre las prácticas",
            "de privacidad de este bot.\n"
          ].join(" "),
          "Podrá activar la eliminación automática u otras (después de 30 días) en el comando {cmdPrivacyDeletion}",
          "Al aceptar esta política de privacidad, acepta que sus datos se almacenarán y utilizarán como se describe anteriormente."
        ].join("\n"),
        de: [
          "**Datenschutzrichtlinie**:\n", [
            "- Wir verwenden die von Ihnen bereitgestellten Informationen nur, um auf Ihre Anfragen zu antworten und unsere Dienstleistungen",
            "zu verbessern. Wir werden Ihre Informationen nicht weitergeben, verkaufen oder für andere Zwecke verwenden, als in dieser",
            "Datenschutzrichtlinie beschrieben.\n"
          ].join(" "), [
            "- Wir ergreifen Maßnahmen, um sicherzustellen, dass die von Ihnen bereitgestellten Informationen sicher sind. Über das Internet",
            "übertragene Daten können nicht zu 100% sicher garantiert werden. Wir ergreifen jedoch Maßnahmen, um sicherzustellen, dass Ihre",
            "Informationen sicher und in Übereinstimmung mit den geltenden Gesetzen behandelt werden.\n"
          ].join(" "), [
            "- Wir können diese Datenschutzerklärung von Zeit zu Zeit ändern. Wenn wir eine solche Änderung vornehmen, werden wir Sie über",
            "den Bot oder durch Veröffentlichung eines Hinweises in den Discord-Servern oder auf unserem [Support-Server]({discordLink})",
            "benachrichtigen.\n"
          ].join(" "), [
            "- Sie können Ihre gesamten Daten löschen, indem Sie sich an den Support wenden oder den Befehl {cmdPrivacy} verwenden"
          ].join(" "), [
            "- Die Nachrichten des Benutzers werden ab dem Zeitpunkt gespeichert, an dem Sie in einem Gespräch sprechen oder eine Frage stellen,",
            "um im Anforderungsverlauf (über {cmdHistory} zugänglich) abgerufen zu werden, damit die KI Ihre alten Nachrichten verfolgen kann.\n"
          ].join(" "), [
            "- Bitte nehmen Sie sich die Zeit, diese Richtlinie sorgfältig zu lesen, und zögern Sie nicht, uns bei Fragen zu den",
            "Datenschutzpraktiken dieses Bots zu kontaktieren.\n"
          ].join(" "),
          "Sie können die automatische Löschung oder andere (nach 30 Tagen) im Befehl {cmdPrivacyDeletion} aktivieren", [
            "Durch die Annahme dieser Datenschutzrichtlinie erklären Sie sich damit einverstanden, dass Ihre Daten wie oben beschrieben",
            "gespeichert und verwendet werden."
          ].join(" ")
        ].join("\n")
      }
    }
} satisfies Command;