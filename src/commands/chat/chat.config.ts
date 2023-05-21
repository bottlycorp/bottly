import { Command } from "$core/utils/config/message/command/command.type";

export const chat = {
  config: {
    name: {
      "en-US": "chat"
    },
    description: {
      "en-US": "Principal command of the dialog thread with Bottly",
      fr: "Commande principale de la discussion avec Bottly",
      "pt-BR": "Comando principal da conversa com Bottly",
      ru: "Основная команда диалоговой нити с Bottly",
      uk: "Основна команда діалогової нитки з Bottly",
      "es-ES": "Comando principal del hilo de diálogo con Bottly",
      de: "Hauptbefehl des Dialogthreads mit Bottly"
    },
    subcmds: {
      stop: {
        name: {
          "en-US": "stop"
        },
        description: {
          "en-US": "Stop the current dialog thread",
          fr: "Arrêtez la discussion en cours",
          "pt-BR": "Pare a conversa atual",
          ru: "Остановить текущую диалоговую нить",
          uk: "Зупинити поточну діалогову нитку",
          "es-ES": "Detener el hilo de diálogo actual",
          de: "Stoppen Sie den aktuellen Dialogthread"
        }
      },
      download: {
        name: {
          "en-US": "download"
        },
        description: {
          "en-US": "Download the current dialog thread (once finished)",
          fr: "Téléchargez la discussion en cours (une fois terminée)",
          "pt-BR": "Baixe a conversa atual (uma vez concluída)",
          ru: "Загрузить текущую диалоговую нить (после завершения)",
          uk: "Завантажити поточну діалогову нитку (після завершення)",
          "es-ES": "Descargue el hilo de diálogo actual (una vez finalizado)",
          de: "Laden Sie den aktuellen Dialogthread herunter (nach Abschluss)"
        }
      },
      talk: {
        name: {
          "en-US": "talk"
        },
        options: {
          context: {
            name: {
              "en-US": "context"
            },
            description: {
              "en-US": "Context of the dialog thread",
              fr: "Contexte de la discussion",
              "pt-BR": "Contexto da conversa",
              ru: "Контекст диалоговой нити",
              uk: "Контекст діалогової нитки",
              "es-ES": "Contexto del hilo de diálogo",
              de: "Kontext des Dialogthreads"
            }
          },
          prompt: {
            name: {
              "en-US": "prompt"
            },
            description: {
              "en-US": "Initial question of the dialog thread",
              fr: "Question initiale de la discussion",
              "pt-BR": "Pergunta inicial da conversa",
              ru: "Начальный вопрос диалоговой нити",
              uk: "Початкове запитання діалогової нитки",
              "es-ES": "Pregunta inicial del hilo de diálogo",
              de: "Initiale Frage des Dialogthreads"
            }
          },
          private: {
            name: {
              "en-US": "private"
            },
            description: {
              "en-US": "If the dialog thread is private",
              fr: "Si la discussion est privée",
              "pt-BR": "Se a conversa é privada",
              ru: "Если диалоговая нить является частной",
              uk: "Якщо діалогова нитка є приватною",
              "es-ES": "Si el hilo de diálogo es privado",
              de: "Wenn der Dialogthread privat ist"
            }
          }
        },
        description: {
          "en-US": "Open a dialog thread fastly with Bottly",
          fr: "Ouvrez une discussion rapide avec Bottly",
          "pt-BR": "Abra um diálogo rápido com Bottly",
          ru: "Быстро откройте диалоговую нить с Bottly",
          uk: "Швидко відкрийте діалогову нитку з Bottly",
          "es-ES": "Abra un hilo de diálogo rápidamente con Bottly",
          de: "Öffnen Sie einen Dialogthread schnell mit Bottly"
        }
      }
    },
    exec: {
      buttons: {
        hidePremiumTip: {
          "en-US": "Don't show this tip again",
          fr: "Ne plus afficher ce conseil",
          "pt-BR": "Não mostre este conselho novamente",
          ru: "Больше не показывать эту подсказку",
          uk: "Більше не показувати цей підказку",
          "es-ES": "No vuelva a mostrar este consejo",
          de: "Diesen Tipp nicht mehr anzeigen"
        }
      },
      notPremiumDownload: {
        "en-US": "You can't download the dialog thread because you are not a premium user.",
        fr: "Vous ne pouvez pas télécharger la discussion car vous n'êtes pas un utilisateur premium.",
        "pt-BR": "Você não pode baixar a conversa porque não é um usuário premium.",
        ru: "Вы не можете загрузить диалоговую нить, потому что вы не являетесь премиум-пользователем.",
        uk: "Ви не можете завантажити діалогову нитку, тому що ви не є преміум-користувачем.",
        "es-ES": "No puede descargar el hilo de diálogo porque no es un usuario premium.",
        de: "Sie können den Dialogthread nicht herunterladen, da Sie kein Premium-Benutzer sind."
      },
      channelTemporaryTitle: {
        "en-US": "Discussion with {user}",
        fr: "Discussion avec {user}",
        "pt-BR": "Conversa com {user}",
        ru: "Обсуждение с {user}",
        uk: "Обговорення з {user}",
        "es-ES": "Discusión con {user}",
        de: "Diskussion mit {user}"
      },
      channelCreating: {
        "en-US": "{emojiTyping} Your discussion is being created please wait...",
        fr: "{emojiTyping} Votre discussion est en cours de création, veuillez patienter...",
        "pt-BR": "{emojiTyping} Sua conversa está sendo criada, por favor, aguarde...",
        ru: "{emojiTyping} Ваша диалоговая нить создается, подождите...",
        uk: "{emojiTyping} Ваша діалогова нитка створюється, зачекайте...",
        "es-ES": "{emojiTyping} Su hilo de diálogo se está creando, espere...",
        de: "{emojiTyping} Ihr Dialogthread wird erstellt, bitte warten Sie..."
      },
      alreadyActiveDiscussion: {
        "en-US": "You already have an active discussion, you can stop it with the command {chatStop} in the <#{thread}> channel",
        fr: "Vous avez déjà une discussion active, vous pouvez l'arrêter avec la commande {chatStop} dans le salon <#{thread}>",
        "pt-BR": "Você já tem uma conversa ativa, você pode pará-la com o comando {chatStop} no canal <#{thread}>",
        ru: "У вас уже есть активное обсуждение, вы можете остановить его с помощью команды {chatStop} в канале <#{thread}>",
        uk: "У вас вже є активне обговорення, ви можете зупинити його за допомогою команди {chatStop} в каналі <#{thread}>",
        "es-ES": "Ya tiene un hilo de discusión activo, puede detenerlo con el comando {chatStop} en el canal <#{thread}>",
        de: "Sie haben bereits eine aktive Diskussion, Sie können sie mit dem Befehl {chatStop} im Kanal <#{thread}> stoppen"
      },
      notHaveActiveDiscussion: {
        "en-US": "You don't have an active discussion, you can start one with the command {chatTalk}",
        fr: "Vous n'avez pas de discussion active, vous pouvez en démarrer une avec la commande {chatTalk}",
        "pt-BR": "Você não tem uma conversa ativa, você pode começar uma com o comando {chatTalk}",
        ru: "У вас нет активного обсуждения, вы можете начать одно с помощью команды {chatTalk}",
        uk: "У вас немає активного обговорення, ви можете почати одне за допомогою команди {chatTalk}",
        "es-ES": "No tiene un hilo de discusión activo, puede iniciar uno con el comando {chatTalk}",
        de: "Sie haben keine aktive Diskussion, Sie können mit dem Befehl {chatTalk} eine starten"
      },
      notTheAuthor: {
        "en-US": "You are not the author of this discussion so you can stop it or download it",
        fr: "Vous n'êtes pas l'auteur de cette discussion, vous ne pouvez donc pas l'arrêter ou la télécharger",
        "pt-BR": "Você não é o autor desta conversa, portanto não pode pará-la ou baixá-la",
        ru: "Вы не автор этого обсуждения, поэтому не можете остановить его или загрузить",
        uk: "Ви не автор цього обговорення, тому не можете зупинити його або завантажити",
        "es-ES": "No eres el autor de esta discusión, por lo que no puedes detenerla o descargarla",
        de: "Sie sind nicht der Autor dieser Diskussion, daher können Sie sie nicht stoppen oder herunterladen"
      },
      stopped: {
        "en-US": "The discussion has been stopped correctly, there was a total of `{count}` messages exchanged.",
        fr: "La discussion a correctement été arrêtée, il y a eu un total de `{count}` messages échangés.",
        "pt-BR": "A conversa foi parada corretamente, houve um total de `{count}` mensagens trocadas.",
        ru: "Обсуждение было остановлено правильно, было обменено `{count}` сообщений.",
        uk: "Обговорення було зупинено правильно, було обмінено `{count}` повідомлень.",
        "es-ES": "La discusión se ha detenido correctamente, hubo un total de `{count}` mensajes intercambiados.",
        de: "Die Diskussion wurde korrekt gestoppt, es wurden insgesamt `{count}` Nachrichten ausgetauscht."
      },
      creatingFile: {
        "en-US": "{emojiTyping} Your discussion is being downloaded, please wait...",
        fr: "{emojiTyping} Votre discussion est en cours de téléchargement, veuillez patienter...",
        "pt-BR": "{emojiTyping} Sua conversa está sendo baixada, por favor, aguarde...",
        ru: "{emojiTyping} Ваша диалоговая нить загружается, подождите...",
        uk: "{emojiTyping} Ваша діалогова нитка завантажується, зачекайте...",
        "es-ES": "{emojiTyping} Su hilo de diálogo se está descargando, espere...",
        de: "{emojiTyping} Ihr Dialogthread wird heruntergeladen, bitte warten Sie..."
      },
      createdFile: {
        "en-US": "Your discussion has been downloaded you can download it with the file below",
        fr: "Votre discussion a été téléchargée, vous pouvez la télécharger avec le fichier ci-dessous",
        "pt-BR": "Sua conversa foi baixada, você pode baixá-la com o arquivo abaixo",
        ru: "Ваша диалоговая нить была загружена, вы можете загрузить ее с помощью файла ниже",
        uk: "Ваша діалогова нитка була завантажена, ви можете завантажити її за допомогою файлу нижче",
        "es-ES": "Su hilo de diálogo ha sido descargado, puede descargarlo con el archivo a continuación",
        de: "Ihr Dialogthread wurde heruntergeladen, Sie können ihn mit der folgenden Datei herunterladen"
      },
      downloadCommand: {
        "en-US": "If you are a **Premium {emojiPremium}** user you can use the {chatDownload} command to get the conversation in HTML format",
        fr: [
          "Si vous êtes un utilisateur **Premium {emojiPremium}** vous pouvez utiliser la commande {chatDownload} pour obtenir la",
          "conversation au format HTML"
        ].join(" "),
        "pt-BR": "Se você é um usuário **Premium {emojiPremium}**, pode usar o comando {chatDownload} para obter a conversa no formato HTML",
        ru: [
          "Если вы являетесь пользователем **Premium {emojiPremium}**, вы можете использовать команду {chatDownload}, чтобы получить",
          "беседу в формате HTML"
        ].join(" "),
        uk: [
          "Якщо ви є користувачем **Premium {emojiPremium}**, ви можете використовувати команду {chatDownload}, щоб отримати",
          "розмову в форматі HTML"
        ].join(" "),
        "es-ES": "Si es un usuario **Premium {emojiPremium}**, puede usar el comando {chatDownload} para obtener la conversación en formato HTML",
        de: [
          "Wenn Sie ein **Premium {emojiPremium}**-Benutzer sind, können Sie den Befehl {chatDownload} verwenden, um das Gespräch im",
          "HTML-Format zu erhalten"
        ].join(" ")
      },
      private: {
        "en-US": "private",
        fr: "privée",
        "pt-BR": "privada",
        ru: "частный",
        uk: "приватний",
        "es-ES": "privado",
        de: "privat"
      },
      public: {
        "en-US": "public",
        fr: "publique",
        "pt-BR": "pública",
        ru: "общественное",
        uk: "публічний",
        "es-ES": "público",
        de: "öffentlich"
      },
      channelCreated: {
        "en-US": "Your `{type}` discussion is created, you can start talking to me in the <#{id}> channel",
        fr: "Votre discussion `{type}` est créée, vous pouvez commencer à parler avec moi dans le salon <#{id}>",
        "pt-BR": "Sua conversa `{type}` foi criada, você pode começar a falar comigo no canal <#{id}>",
        ru: "Ваша диалоговая нить `{type}` создана, вы можете начать разговаривать со мной в канале <#{id}>",
        uk: "Ваша діалогова нитка `{type}` створена, ви можете почати розмовляти зі мною в каналі <#{id}>",
        "es-ES": "Su hilo de diálogo `{type}` se ha creado, puede comenzar a hablar conmigo en el canal <#{id}>",
        de: "Ihr `{type}`-Diskussionsthread wurde erstellt, Sie können in den Kanal <#{id}> starten"
      },
      channelNotCreated: {
        "en-US": "Your `{type}` discussion is failed to create, please try again later or check permissions",
        fr: "Votre discussion `{type}` n'a pas pu être créée, veuillez réessayer plus tard ou vérifier les permissions",
        "pt-BR": "Seu thread `{type}` não pôde ser criado, tente novamente mais tarde ou verifique as permissões",
        ru: "Ваше обсуждение `{type}` не удалось создать, пожалуйста, повторите попытку позже или проверьте разрешения",
        uk: "Ваше обговорення `{type} не вдалося створити, будь ласка, спробуйте пізніше або перевірте дозволи",
        "es-ES": "No se ha podido crear el debate `{type}`, inténtelo de nuevo más tarde o compruebe los permisos.",
        de: "Ihr Thema `{type}` konnte nicht erstellt werden, bitte versuchen Sie es später noch einmal oder überprüfen Sie die Berechtigungen"
      },
      deletedData: {
        "en-US": [
          ":wave: <@{id}> The data of this discussion has been deleted because you have set that you don't want your data to be saved in your",
          "privacy settings."
        ].join(" "),
        fr: [
          ":wave: <@{id}> Les données de cette conversation viennent d'être supprimées parce que vous avez défini que vous ne voulez pas que vos",
          "données soient enregistrées dans vos paramètres de vie privée."
        ].join(" "),
        "pt-BR": [
          ":wave: <@{id}> Os dados desta conversa foram excluídos porque você definiu que não deseja que seus dados sejam salvos em seu",
          "configurações de privacidade."
        ].join(" "),
        ru: [
          ":wave: <@{id}> Данные этого обсуждения были удалены, потому что вы установили, что не хотите, чтобы ваши данные сохранялись в вашем",
          "настройки конфиденциальности."
        ].join(" "),
        uk: [
          ":wave: <@{id}> Дані цього обговорення були видалені, оскільки ви встановили, що не хочете, щоб ваші дані зберігалися в вашому",
          "налаштування конфіденційності."
        ].join(" "),
        "es-ES": [
          ":wave: <@{id}> Los datos de esta discusión se han eliminado porque ha establecido que no desea que sus datos se guarden en su",
          "configuraciones de privacidad."
        ].join(" "),
        de: [
          ":wave: <@{id}> Die Daten dieser Diskussion wurden gelöscht, da Sie festgelegt haben, dass Ihre Daten nicht gespeichert werden sollen",
          "Datenschutzeinstellungen."
        ].join(" ")
      },
      discussionOpened: {
        "en-US": [
          ":wave: I'm here to help you, you can start talking to me\n",
          "- If you want to stop the discussion, use the command {chatStop}",
          ["- You can speak with other people with a `.` before your message or if your message contains `@mention` (or reply",
            "to a message with ping enabled)"].join(" "),
          "- Each message you send count for 1 usage (check your quota with the command {history})"
        ].join("\n"),
        fr: [
          ":wave: Je suis là pour vous aider, vous pouvez commencer à parler avec moi\n",
          "- Si vous voulez arrêter la discussion, utilisez la commande {chatStop}",
          ["- Vous pouvez parler avec d'autres personnes en mettant un `.` avant votre message ou si votre message contient `@mention`",
            "(ou en répondant à un message avec le ping activé)"].join(" "),
          "- Chaque message que vous envoyez compte pour 1 utilisation (vérifiez votre quota avec la commande {history})"
        ].join("\n"),
        "pt-BR": [
          ":wave: Estou aqui para ajudá-lo, você pode começar a falar comigo\n",
          "- Se você quiser parar a conversa, use o comando {chatStop}",
          ["- Você pode falar com outras pessoas colocando um `.` antes da sua mensagem ou se a sua mensagem contiver `@mention` (ou responder",
            "a uma mensagem com ping ativado)"].join(" "),
          "- Cada mensagem que você enviar conta como 1 uso (verifique sua cota com o comando {history})"
        ].join("\n"),
        ru: [
          ":wave: Я здесь, чтобы помочь вам, вы можете начать со мной разговаривать\n",
          "- Если вы хотите остановить обсуждение, используйте команду {chatStop}",
          ["- Вы можете говорить с другими людьми, поставив `.` перед своим сообщением или если ваше сообщение содержит `@mention` (или ответить",
            "на сообщение с включенным пингом)"].join(" "),
          "- Каждое сообщение, которое вы отправляете, считается за 1 использование (проверьте свою квоту с помощью команды {history})"
        ].join("\n"),
        uk: [
          ":wave: Я тут, щоб допомогти вам, ви можете почати зі мною розмовляти\n",
          "- Якщо ви хочете зупинити обговорення, використовуйте команду {chatStop}",
          ["- Ви можете говорити з іншими людьми, поставивши `.` перед своїм повідомленням або якщо ваше повідомлення містить `@mention`",
            "(або відповісти на повідомлення з увімкненим пінгом)"].join(" "),
          "- Кожне повідомлення, яке ви надсилаєте, вважається за 1 використання (перевірте свою квоту за допомогою команди {history})"
        ].join("\n"),
        "es-ES": [
          ":wave: Estoy aquí para ayudarte, puedes empezar a hablar conmigo\n",
          "- Si quieres detener la discusión, usa el comando {chatStop}",
          ["- Puedes hablar con otras personas poniendo un `.` antes de tu mensaje o si tu mensaje contiene `@mention` (o responder",
            "a un mensaje con ping activado)"].join(" "),
          "- Cada mensaje que envíes cuenta como 1 uso (verifica tu cuota con el comando {history})"
        ].join("\n"),
        de: [
          ":wave: Ich bin hier, um dir zu helfen, du kannst anfangen mit mir zu reden\n",
          "- Wenn Sie die Diskussion beenden möchten, verwenden Sie den Befehl {chatStop}",
          ["- Sie können mit anderen Personen sprechen, indem Sie ein `.` vor Ihrer Nachricht platzieren oder wenn Ihre Nachricht `@mention` enthält",
            "(oder auf eine Nachricht mit aktiviertem Ping antworten)"].join(" "),
          "- Jede Nachricht, die Sie senden, zählt als 1 Verwendung (überprüfen Sie Ihr Kontingent mit dem Befehl {history})"
        ].join("\n")
      },
      discussionOpenedPremium: {
        "en-US": "{emojiPremium} Once you have stopped the discussion, you will be able to download it in HTML format",
        fr: "{emojiPremium} Une fois que vous aurez arrêté la discussion, vous pourrez la télécharger au format HTML",
        "pt-BR": "{emojiPremium} Depois de parar a conversa, você pode baixá-la no formato HTML",
        ru: "{emojiPremium} После остановки обсуждения вы сможете загрузить его в формате HTML",
        uk: "{emojiPremium} Після зупинки обговорення ви зможете завантажити його у форматі HTML",
        "es-ES": "{emojiPremium} Una vez que haya detenido la discusión, podrá descargarla en formato HTML",
        de: "{emojiPremium} Sobald Sie die Diskussion gestoppt haben, können Sie sie im HTML-Format herunterladen"
      },
      premiumTip: {
        "en-US": "With **Premium {emojiPremium}** you can download the discussion in HTML format as soon as you stop it",
        fr: "Avec **Premium {emojiPremium}** vous pouvez téléchargez la discussion au format HTML dès que vous l'auriez arrêtée",
        "pt-BR": "Com **Premium {emojiPremium}** você pode baixar a conversa no formato HTML assim que pará-la",
        ru: "С **Premium {emojiPremium}** вы можете загрузить обсуждение в формате HTML, как только остановите его",
        uk: "З **Premium {emojiPremium}** ви можете завантажити обговорення в форматі HTML, як тільки зупините його",
        "es-ES": "Con **Premium {emojiPremium}** puede descargar el hilo de diálogo en formato HTML tan pronto como lo detenga",
        de: "Mit **Premium {emojiPremium}** können Sie den Dialogthread im HTML-Format herunterladen, sobald Sie ihn stoppen"
      },
      premiumTipAre: {
        "en-US": "You are a **Premium {emojiPremium}** user, you can download the discussion in HTML format",
        fr: [
          "Vous êtes un utilisateur **Premium {emojiPremium}**, vous pouvez téléchargez la discussion au format",
          "HTML en cliquant sur le bouton ci-dessous"
        ].join(" "),
        "pt-BR": [
          "Você é um usuário **Premium {emojiPremium}**, você pode baixar a conversa no formato",
          "HTML clicando no botão abaixo"
        ].join(" "),
        ru: [
          "Вы являетесь пользователем **Premium {emojiPremium}**, вы можете загрузить обсуждение в формате",
          "HTML, нажав на кнопку ниже"
        ].join(" "),
        uk: [
          "Ви є користувачем **Premium {emojiPremium}**, ви можете завантажити обговорення в форматі",
          "HTML, натиснувши на кнопку нижче"
        ].join(" "),
        "es-ES": [
          "Eres un usuario **Premium {emojiPremium}**, puedes descargar la discusión en formato",
          "HTML haciendo clic en el botón de abajo"
        ].join(" "),
        de: [
          "Sie sind ein **Premium {emojiPremium}**-Benutzer, Sie können den Dialogthread im Format",
          "HTML herunterladen, indem Sie auf die Schaltfläche unten klicken"
        ].join(" ")
      }
    }
  }
} satisfies Record<string, Command>;