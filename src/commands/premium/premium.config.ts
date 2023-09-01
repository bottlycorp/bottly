import { Command } from "$core/utils/config/message/command/command.type";

export const premium = {
  name: {
    "en-US": "premium"
  },
  options: {},
  description: {
    "en-US": "See your premium status or what premium is.",
    fr: "Voir votre statut premium ou ce qu'est premium.",
    "pt-BR": "Veja seu status premium ou o que é premium.",
    ru: "Посмотреть ваш премиум-статус или то, что премиум.",
    uk: "Переглянути ваш преміум-статус або те, що преміум.",
    "es-ES": "Ver su estado premium o lo que es premium.",
    de: "Sehen Sie Ihren Premium-Status oder was Premium ist."
  },
  exec: {
    buttons: {
      manageSubscription: {
        "en-US": "Manage subscription",
        fr: "Gérer l'abonnement",
        "pt-BR": "Gerenciar assinatura",
        ru: "Управление подпиской",
        uk: "Управління підпискою",
        "es-ES": "Gestionar suscripción",
        de: "Abonnement verwalten"
      },
      becomePremium: {
        "en-US": "Become premium for $5,00/month",
        fr: "Devenir premium pour 5,00$/mois",
        "pt-BR": "Se tornar premium por 5,00$/mês",
        ru: "Стать премиумом за 5,00$/месяц",
        uk: "Стати преміумом за 5,00$/місяць",
        "es-ES": "Convertirse en premium por 5,00$/mes",
        de: "Werden Sie für 5,00$/Monat Premium"
      }
    },
    embed: {
      title: {
        "en-US": "Premium Subscription",
        fr: "Abonnement Premium",
        "pt-BR": "Assinatura Premium",
        ru: "Премиум-подписка",
        uk: "Преміум-підписка",
        "es-ES": "Suscripción Premium",
        de: "Premium-Abonnement"
      },
      descriptionPremium: {
        "en-US": [
          "{emojiPremium} You are a premium user, thank you for your support !",
          "\nYour subscription is active since <t:{firstF}:f>",
          "{activeSubscription}"
        ].join("\n"),
        fr: [
          "{emojiPremium} Vous êtes un utilisateur premium, merci pour votre soutien !",
          "\nAbonnement actif depuis le <t:{firstF}:F>",
          "{activeSubscription}"
        ].join("\n"),
        "pt-BR": [
          "{emojiPremium} Você é um usuário premium, obrigado pelo seu apoio !",
          "\nAssinatura ativa desde <t:{firstF}:F>",
          "{activeSubscription}"
        ].join("\n"),
        ru: [
          "{emojiPremium} Вы премиум-пользователь, спасибо за вашу поддержку !",
          "\nПодписка активна с <t:{firstF}:F>",
          "{activeSubscription}"
        ].join("\n"),
        uk: [
          "{emojiPremium} Ви преміум-користувач, дякуємо за вашу підтримку !",
          "\nПідписка активна з <t:{firstF}:F>",
          "{activeSubscription}"
        ].join("\n"),
        "es-ES": [
          "{emojiPremium} Eres un usuario premium, gracias por tu apoyo !",
          "\nSu suscripción está activa desde <t:{firstF}:F>",
          "{activeSubscription}"
        ].join("\n"),
        de: [
          "{emojiPremium} Sie sind ein Premium-Benutzer, danke für Ihre Unterstützung !",
          "\nIhr Abonnement ist seit <t:{firstF}:F> aktiv",
          "{activeSubscription}"
        ].join("\n")
      },
      activeSubscription: {
        "en-US": "The next billing will take place on <t:{next}:D>.",
        fr: "La prochaine facuration aura lieu le <t:{next}:D>.",
        "pt-BR": "A próxima cobrança ocorrerá em <t:{next}:D>.",
        ru: "Следующая выставление счета состоится <t:{next}:D>.",
        uk: "Наступне виставлення рахунку відбудеться <t:{next}:D>.",
        "es-ES": "La próxima facturación tendrá lugar el <t:{next}:D>.",
        de: "Die nächste Abrechnung findet am <t:{next}:D> statt."
      },
      canceledSubscription: {
        "en-US": [
          "You canceled your subscription on <t:{cancel}:D>, you will no longer be charged and you will lose your premium ",
          "status on <t:{next}:F>."
        ].join(" "),
        fr: "Vous avez annulé votre abonnement le <t:{cancel}:D>, vous ne serez plus facturé et vous perdrez votre statut premium le <t:{next}:F>.",
        "pt-BR": "Você cancelou sua assinatura em <t:{cancel}:D>, você não será mais cobrado e perderá seu status premium em <t:{next}:F>.",
        ru: "Вы отменили подписку <t:{cancel}:D>, вам больше не будут начисляться средства, и вы потеряете свой премиум-статус <t:{next}:F>.",
        uk: "Ви скасували підписку <t:{cancel}:D>, вам більше не будуть нараховуватися кошти, і ви втратите свій преміум-статус <t:{next}:F>.",
        "es-ES": "Ha cancelado su suscripción el <t:{cancel}:D>, ya no se le cobrará y perderá su estado premium el <t:{next}:F>.",
        de: [
          "Sie haben Ihr Abonnement am <t:{cancel}:D> gekündigt, Sie werden nicht mehr belastet und verlieren Ihren Premium-Status am",
          "<t:{next}:F>."
        ].join(" ")
      },
      descriptionNotPremium: {
        "en-US": [
          "{emojiPremium} You are not a premium user.",
          "\n**What are the advantages ?**",
          "• Use **GPT 4** and **GPT 4 (32k)** models instead of **GPT 3.5 Turbo** (You can still use GPT 3.5 Turbo)",
          "• You have 50 uses per day",
          "• You have priority access to support",
          "• You have 50% more writing power on your questions and discussions",
          "• Download discussions when finished",
          "• Regenerate your questions 10 times (per question) and not use your credits for it",
          "• Your cooldown for {cmdAsk} is `5 seconds` instead of `10 seconds`",
          "\n**How do I become premium and how much does it cost ?**",
          "• You can become premium by clicking on the button below, for a total of $5,00 per month.",
          "\n**Can I cancel my subscription, or refund it ?**",
          "• Yes, you can cancel your subscription at any time from Stripe and you will not be charged again. ",
          "• We do not refund the subscription, but you can cancel it at any time."
        ].join("\n"),
        fr: [
          "{emojiPremium} Vous n'êtes pas un utilisateur premium.",
          "\n**Quels sont les avantages ?**",
          "• Utilisez les modèles **GPT 4** et **GPT 4 (32k)** au lieu de **GPT 3.5 Turbo** (Vous pouvez toujours utiliser GPT 3.5 Turbo)",
          "• Vous avez 50 utilisations par jour",
          "• Vous avez un accès prioritaire au support",
          "• Vous avez 50% de puissance d'écriture en plus sur vos questions et discussions",
          "• Téléchargez les discussions une fois terminées",
          "• Régénérez vos questions 10 fois (par question) et n'utilisez pas vos utilisations pour cela",
          "• Votre cooldown pour {cmdAsk} est de `5 secondes` au lieu de `10 secondes`",
          "\n**Comment devenir premium et combien ça coûte ?**",
          "• Vous pouvez devenir premium en cliquant sur le bouton ci-dessous, pour un total de 5,00$ par mois.",
          "\n**Est-ce que je peux annuler mon abonnement, ou me faire rembourser ?**",
          "• Oui, vous pouvez annuler votre abonnement à tout moment depuis Stripe et vous ne serez plus facturé.",
          "• Nous ne remboursons pas l'abonnement, mais vous pouvez l'annuler à tout moment."
        ].join("\n"),
        "pt-BR": [
          "{emojiPremium} Você não é um usuário premium.",
          "\n**Quais são as vantagens ?**",
          "• Use os modelos **GPT 4** e **GPT 4 (32k)** em vez de **GPT 3.5 Turbo** (Você ainda pode usar o GPT 3.5 Turbo)",
          "• Você tem 50 usos por dia",
          "• Você tem acesso prioritário ao suporte",
          "• Você tem 50% a mais de poder de escrita em suas perguntas e discussões",
          "• Baixe as discussões quando terminar",
          "• Regenere suas perguntas 10 vezes (por pergunta) e não use seus usos para isso",
          "• Seu cooldown para {cmdAsk} é de `5 segundos` em vez de `10 segundos`",
          "\n**Como me tornar premium e quanto custa ?**",
          "• Você pode se tornar premium clicando no botão abaixo, por um total de 5,00$ por mês.",
          "\n**Posso cancelar minha assinatura ou reembolsá-la ?**",
          "• Sim, você pode cancelar sua assinatura a qualquer momento no Stripe e não será cobrado novamente.",
          "• Não reembolsamos a assinatura, mas você pode cancelá-la a qualquer momento."
        ].join("\n"),
        ru: [
          "{emojiPremium} Вы не являетесь премиум-пользователем.",
          "\n**Каковы преимущества ?**",
          "• Используйте модели **GPT 4** и **GPT 4 (32k)** вместо **GPT 3.5 Turbo** (Вы все еще можете использовать GPT 3.5 Turbo)",
          "• У вас есть 50 использований в день",
          "• У вас есть приоритетный доступ к поддержке",
          "• У вас на 50% больше мощности записи в ваших вопросах и обсуждениях",
          "• Загружайте обсуждения по завершении",
          "• Восстановите свои вопросы 10 раз (за вопрос) и не используйте их для этого",
          "• Ваш перезарядка для {cmdAsk} составляет `5 секунд` вместо `10 секунд`",
          "\n**Как стать премиумом и сколько это стоит ?**",
          "• Вы можете стать премиумом, нажав на кнопку ниже, на общую сумму 5,00$ в месяц.",
          "\n**Могу ли я отменить подписку или вернуть деньги ?**",
          "• Да, вы можете отменить подписку в любое время в Stripe, и вам больше не будут начисляться средства.",
          "• Мы не возвращаем подписку, но вы можете отменить ее в любое время."
        ].join("\n"),
        uk: [
          "{emojiPremium} Ви не є преміум-користувачем.",
          "\n**Які переваги ?**",
          "• Використовуйте моделі **GPT 4** і **GPT 4 (32k)** замість **GPT 3.5 Turbo** (Ви все ще можете використовувати GPT 3.5 Turbo)",
          "• У вас є 50 використань на день",
          "• У вас є пріоритетний доступ до підтримки",
          "• У вас на 50% більше потужності запису в ваших питаннях та обговореннях",
          "• Завантажуйте обговорення після завершення",
          "• Відновіть свої питання 10 разів (за питання) і не використовуйте їх для цього",
          "• Ваш перезарядка для {cmdAsk} становить `5 секунд` замість `10 секунд`",
          "\n**Як стати преміумом і скільки це коштує ?**",
          "• Ви можете стати преміумом, натиснувши на кнопку нижче, на загальну суму 5,00$ на місяць.",
          "\n**Чи можу я скасувати підписку або повернути гроші ?**",
          "• Так, ви можете скасувати підписку в будь-який час в Stripe, і вам більше не будуть нараховуватися кошти.",
          "• Ми не повертаємо підписку, але ви можете скасувати її в будь-який час."
        ].join("\n"),
        "es-ES": [
          "{emojiPremium} No eres un usuario premium.",
          "\n**¿Cuáles son las ventajas ?**",
          "• Use los modelos **GPT 4** y **GPT 4 (32k)** en lugar de **GPT 3.5 Turbo** (Todavía puede usar GPT 3.5 Turbo)",
          "• Tienes 50 usos por día",
          "• Tiene acceso prioritario al soporte",
          "• Tiene un 50% más de potencia de escritura en sus preguntas y discusiones",
          "• Descargue las discusiones cuando termine",
          "• Regenere sus preguntas 10 veces (por pregunta) y no las use para esto",
          "• Su tiempo de reutilización para {cmdAsk} es de `5 segundos` en lugar de `10 segundos`",
          "\n**¿Cómo me convierto en premium y cuánto cuesta ?**",
          "• Puede convertirse en premium haciendo clic en el botón de abajo, por un total de 5,00$ por mes.",
          "\n**¿Puedo cancelar mi suscripción o reembolsarla ?**",
          "• Sí, puede cancelar su suscripción en cualquier momento en Stripe y no se le cobrará nuevamente.",
          "• No reembolsamos la suscripción, pero puede cancelarla en cualquier momento."
        ].join("\n"),
        de: [
          "{emojiPremium} Sie sind kein Premium-Benutzer.",
          "\n**Was sind die Vorteile ?**",
          "• Verwenden Sie die Modelle **GPT 4** und **GPT 4 (32k)** anstelle von **GPT 3.5 Turbo** (Sie können immer noch GPT 3.5 Turbo verwenden)",
          "• Sie haben 50 Anwendungen pro Tag",
          "• Sie haben Prioritätszugang zum Support",
          "• Sie haben 50% mehr Schreibkraft bei Ihren Fragen und Diskussionen",
          "• Laden Sie Diskussionen herunter, wenn sie beendet sind",
          "• Stellen Sie Ihre Fragen 10-mal wieder her (pro Frage) und verwenden Sie sie nicht dafür",
          "• Ihre Wiederverwendungszeit für {cmdAsk} beträgt `5 Sekunden` anstelle von `10 Sekunden`",
          "\n**Wie werde ich Premium und wie viel kostet es ?**",
          "• Sie können Premium werden, indem Sie unten auf die Schaltfläche klicken, insgesamt 5,00$ pro Monat.",
          "\n**Kann ich mein Abonnement kündigen oder erstatten ?**",
          "• Ja, Sie können Ihr Abonnement jederzeit bei Stripe kündigen und es wird Ihnen nicht erneut in Rechnung gestellt.",
          "• Wir erstatten das Abonnement nicht, aber Sie können es jederzeit kündigen."
        ].join("\n")
      }
    }
  }
} satisfies Command;