import { Command } from "$core/utils/config/message/command/command.type";

export const premium = {
  config: {
    name: {
      "en-US": "premium"
    },
    options: {},
    description: {
      "en-US": "See your premium status or what premium is.",
      fr: "Voir votre statut premium ou ce qu'est premium.",
      "pt-BR": "Veja seu status premium ou o que é premium."
    },
    exec: {
      buttons: {
        manageSubscription: {
          "en-US": "Manage subscription",
          fr: "Gérer l'abonnement",
          "pt-BR": "Gerenciar assinatura"
        },
        becomePremium: {
          "en-US": "Become premium for $5.00/month",
          fr: "Devenir premium pour 5.00$/mois",
          "pt-BR": "Se tornar premium por R$ 5,00/mês"
        }
      },
      embed: {
        title: {
          "en-US": "Premium Subscription",
          fr: "Abonnement Premium",
          "pt-BR": "Assinatura Premium"
        },
        descriptionPremium: {
          "en-US": [
            "{emojiPremium} You are a premium user, thank you for your support !",
            "\nYour subscription is active since <t:{firstF}:f> (<t:{firstR}:R>).",
            "{activeSubscription}"
          ].join("\n"),
          fr: [
            "{emojiPremium} Vous êtes un utilisateur premium, merci pour votre soutien !",
            "\nAbonnement actif depuis le <t:{firstF}:f> (<t:{firstR}:R>).",
            "{activeSubscription}"
          ].join("\n"),
          "pt-BR": [
            "{emojiPremium} Você é um usuário premium, obrigado pelo seu apoio !",
            "\nAssinatura ativa desde <t:{firstF}:f> (<t:{firstR}:R>).",
            "{activeSubscription}"
          ].join("\n")
        },
        activeSubscription: {
          "en-US": "The next billing will take place on <t:{next}:F>.",
          fr: "La prochaine facuration aura lieu le <t:{next}:F>.",
          "pt-BR": "A próxima cobrança ocorrerá em <t:{next}:F>."
        },
        canceledSubscription: {
          "en-US": "Your subscription has been canceled, you will no longer be charged and will lose your premium status on <t:{next}:F>.",
          fr: "Votre abonnement a été annulé, vous ne serez plus facturé et vous perdrez votre statut premium le <t:{next}:F>.",
          "pt-BR": "Sua assinatura foi cancelada, você não será mais cobrado e perderá seu status premium em <t:{next}:F>."
        },
        descriptionNotPremium: {
          "en-US": [
            "{emojiPremium} You are not a premium user.",
            "\n**What are the advantages ?**",
            "• You have 50 uses per day",
            "• You have priority access to support",
            "• You have 50% more writing power on your questions and discussions",
            "• Download discussions when finished",
            "\n**How do I become premium and how much does it cost ?**",
            "• You can become premium by clicking on the button below, for a total of $4.99 per month.",
            "\n**Can I cancel my subscription ?**",
            "• Yes, you can cancel your subscription at any time from Stripe.",
            "\n**Can I get a refund ?**",
            "• Yes, you can get a refund within 14 days of purchase.",
            "\n**Is there a free trial ?**",
            "• Try for free for 7 days with the {cmdPremiumTrial} command."
          ].join("\n"),
          fr: [
            "{emojiPremium} Vous n'êtes pas un utilisateur premium.",
            "\n**Quels sont les avantages ?**",
            "• Vous avez 50 utilisations par jour",
            "• Vous avez un accès prioritaire au support",
            "• Vous avez 50% de puissance d'écriture en plus sur vos questions et discussions",
            "• Téléchargez les discussions une fois terminées",
            "\n**Comment devenir premium et combien ça coûte ?**",
            "• Vous pouvez devenir premium en cliquant sur le bouton ci-dessous, pour un total de 4.99$ par mois.",
            "\n**Est-ce que je peux annuler mon abonnement ?**",
            "• Oui, vous pouvez annuler votre abonnement à tout moment depuis Stripe.",
            "\n**Est-ce que je peux me faire rembourser ?**",
            "• Oui, vous pouvez vous faire rembourser dans les 14 jours suivant votre achat.",
            "\n**Y a t'il un essai gratuit ?**",
            "• Essayer gratuitement pendant 7 jours avec la commande {cmdPremiumTrial}."
          ].join("\n"),
          "pt-BR": [
            "{emojiPremium} Você não é um usuário premium.",
            "\n**Quais são as vantagens ?**",
            "• Você tem 50 usos por dia",
            "• Você tem acesso prioritário ao suporte",
            "• Você tem 50% a mais de poder de escrita em suas perguntas e discussões",
            "• Baixe as discussões quando terminar",
            "\n**Como me tornar premium e quanto custa ?**",
            "• Você pode se tornar premium clicando no botão abaixo, por um total de R$ 4,99 por mês.",
            "\n**Posso cancelar minha assinatura ?**",
            "• Sim, você pode cancelar sua assinatura a qualquer momento no Stripe.",
            "\n**Posso ser reembolsado ?**",
            "• Sim, você pode ser reembolsado dentro de 14 dias após a compra.",
            "\n**Há um teste gratuito ?**",
            "• Experimentar gratuitamente por 7 dias com o comando {cmdPremiumTrial}."
          ].join("\n")
        }
      }
    }
  }
} satisfies Record<string, Command>;