import { Command } from "$core/utils/config/message/command/command.type";

export const history = {
  name: {
    "en-US": "history"
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
    "en-US": "Show the history of your asked questions",
    fr: "Affiche l'historique de vos questions posées",
    "pt-BR": "Mostra o histórico de suas perguntas feitas",
    ru: "Показать историю ваших заданных вопросов",
    uk: "Показати історію ваших заданих питань",
    "es-ES": "Muestra el historial de tus preguntas hechas",
    de: "Zeigt die Historie Ihrer gestellten Fragen"
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
      },
      lineQuestionWeb: {
        "en-US": ":globe_with_meridians: **{index}.** {question} - <t:{createdAt}:f>\n"
      },
      lineDiscussion: {
        "en-US": ":thought_balloon: **[{index}.]({link})** {title} - <t:{createdAt}:f> `{count} messages`\n"
      },
      lineDiscussionNoTitle: {
        "en-US": ":thought_balloon: **[{index}.]({link})** No messages sended for now - <t:{createdAt}:f>\n",
        fr: ":thought_balloon: **[{index}.]({link})** Aucun message envoyé pour le moment - <t:{createdAt}:f>\n",
        "pt-BR": ":thought_balloon: **[{index}.]({link})** Nenhuma mensagem enviada por enquanto - <t:{createdAt}:f>\n",
        ru: ":thought_balloon: **[{index}.]({link})** Нет сообщений, отправленных на данный момент - <t:{createdAt}:f>\n",
        uk: ":thought_balloon: **[{index}.]({link})** Немає повідомлень, відправлених на даний момент - <t:{createdAt}:f>\n",
        "es-ES": ":thought_balloon: **[{index}.]({link})** No hay mensajes enviados por ahora - <t:{createdAt}:f>\n",
        de: ":thought_balloon: **[{index}.]({link})** Keine Nachrichten bisher gesendet - <t:{createdAt}:f>\n"
      },
      notPremiumLine: {
        "en-US": ":sparkles: You still have `{left}` free requests this month, upgrade to the Premium plan to ask a larger usage of requests",
        fr: [
          ":sparkles: Vous avez encore `{left}` questions gratuites ce mois-ci,",
          "passez au plan Premium pour poser un usage plus important de requêtes"
        ].join(" "),
        "pt-BR": [
          ":sparkles: Você ainda tem `{left}` perguntas gratuitas neste mês,",
          "atualize para o plano Premium para fazer um uso maior de solicitações"
        ].join(" "),
        ru: [
          ":sparkles: У вас еще есть `{left}` бесплатных запросов в этом месяце,",
          "перейдите на платный тарифный план, чтобы задать большее количество запросов"
        ].join(" "),
        uk: [
          ":sparkles: У вас ще є `{left}` безкоштовних запитів у цьому місяці,",
          "перейдіть на платний тарифний план, щоб задати більшу кількість запитів"
        ].join(" "),
        "es-ES": [
          ":sparkles: Todavía tienes `{left}` solicitudes gratuitas este mes,",
          "actualiza al plan Premium para hacer un uso mayor de solicitudes"
        ].join(" "),
        de: [
          ":sparkles: Sie haben diesen Monat noch `{left}` kostenlose Anfragen,",
          "aktualisieren Sie auf den Premium-Plan, um eine größere Anzahl von Anfragen zu stellen"
        ].join(" ")
      },
      voterLine: {
        fr: [
          ":identification_card: Vous avez pour Bottly durant les dernières `12 heures`, ce qui vous permet d'être à 30 utilisations au lieu de 5"
        ].join(" "),
        "en-US": ":identification_card: You have Bottly for the last `12 hours`, which allows you to be at 30 uses instead of 5",
        "pt-BR": ":identification_card: Você tem Bottly por `12 horas`, o que permite que você esteja em 30 usos em vez de 5",
        ru: ":identification_card: У вас есть Bottly за последние `12 часов`, что позволяет вам быть в 30 использований вместо 5",
        uk: ":identification_card: У вас є Bottly за останні `12 годин`, що дозволяє вам бути в 30 використаннях замість 5",
        "es-ES": ":identification_card: Tienes Bottly durante las últimas `12 horas`, lo que te permite estar en 30 usos en lugar de 5",
        de: ":identification_card: Sie haben Bottly für die letzten `12 Stunden`, was Ihnen erlaubt, bei 30 Verwendungen anstelle von 5 zu sein"
      },
      statsLineQuestions: {
        "en-US": ":bar_chart: You asked `{count}` questions this day, and `{total}` questions in total",
        fr: ":bar_chart: Vous avez posé `{count}` questions aujourd'hui, et `{total}` questions au total",
        "pt-BR": ":bar_chart: Você fez `{count}` perguntas hoje e `{total}` perguntas no total",
        ru: ":bar_chart: Вы задали `{count}` вопросов сегодня и `{total}` вопросов всего",
        uk: ":bar_chart: Ви задали `{count}` питань сьогодні і `{total}` питань всього",
        "es-ES": ":bar_chart: Hiciste `{count}` preguntas hoy y `{total}` preguntas en total",
        de: ":bar_chart: Sie haben an diesem Tag `{count}` Fragen gestellt und insgesamt `{total}` Fragen"
      },
      statsLineDiscussions: {
        "en-US": ":bar_chart: You created `{count}` discussions this day, and `{total}` discussions in total",
        fr: ":bar_chart: Vous avez créé `{count}` discussions aujourd'hui, et `{total}` discussions au total",
        "pt-BR": ":bar_chart: Você criou `{count}` discussões hoje e `{total}` discussões no total",
        ru: ":bar_chart: Вы создали `{count}` обсуждений сегодня и `{total}` обсуждений всего",
        uk: ":bar_chart: Ви створили `{count}` обговорень сьогодні і `{total}` обговорень всього",
        "es-ES": ":bar_chart: Creaste `{count}` discusiones hoy y `{total}` discusiones en total",
        de: ":bar_chart: Sie haben `{count}` Diskussionen an diesem Tag erstellt und insgesamt `{total}` Diskussionen"
      },
      settings: {
        "en-US": ":gear: You can disable or enable the saving of your questions in your history by clicking on the `📥` button below",
        fr: [
          ":gear: Vous pouvez désactiver ou activer l'enregistrement de vos questions dans votre",
          "historique en cliquant sur le bouton `📥` ci-dessous"
        ].join(" "),
        "pt-BR": ":gear: Você pode desativar ou ativar o salvamento de suas perguntas em seu histórico clicando no botão `📥` abaixo",
        ru: ":gear: Вы можете отключить или включить сохранение ваших вопросов в вашей истории, нажав на кнопку `📥` ниже",
        uk: ":gear: Ви можете вимкнути або увімкнути збереження ваших питань у вашій історії, натиснувши на кнопку `📥` нижче",
        "es-ES": ":gear: Puedes desactivar o activar el guardado de tus preguntas en tu historial haciendo clic en el botón `📥` a continuación",
        de: [
          ":gear: Sie können das Speichern Ihrer Fragen in Ihrem Verlauf deaktivieren oder aktivieren, indem Sie auf die Schaltfläche `📥`",
          "unten klicken"
        ].join(" ")
      },
      endLine: {
        "en-US": ":clock1: Your last question was asked <t:{timestamp}:f>",
        fr: ":clock1: Votre dernière question a été posée <t:{timestamp}:f>",
        "pt-BR": ":clock1: Sua última pergunta foi feita <t:{timestamp}:f>",
        ru: ":clock1: Ваш последний вопрос был задан <t:{timestamp}:f>",
        uk: ":clock1: Ваш останній запит був заданий <t:{timestamp}:f>",
        "es-ES": ":clock1: Tu última pregunta fue hecha <t:{timestamp}:f>",
        de: ":clock1: Ihre letzte Frage wurde gestellt <t:{timestamp}:f>"
      }
    }
  }
} satisfies Command;