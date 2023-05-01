import { Command } from "$core/utils/config/message/command/command.type";

export const privacy = {
  config: {
    exec: {
      buttons: {
        accept: {
          "en-US": "I accept",
          fr: "J'accepte",
          "pt-BR": "Eu aceito"
        },
        readFast: {
          "en-US": "I read fast",
          fr: "Je lis vite",
          "pt-BR": "Eu leio rápido"
        }
      },
      loading: {
        "en-US": "Loading...",
        fr: "Chargement...",
        "pt-BR": "Carregando..."
      },
      embedTitle: {
        "en-US": "Privacy management",
        fr: "Gestion de la confidentialité",
        "pt-BR": "Gerenciamento de privacidade"
      },
      doYouAccept: {
        "en-US": "Do you agree to the privacy policy?",
        fr: "Acceptez-vous la politique de confidentialité ?",
        "pt-BR": "Você aceita a política de privacidade?"
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
        ].join(" ")
      },
      accepted: {
        "en-US": "You have accepted the privacy policy, your data will be saved and you will be able to retrieve it next time.",
        fr: "Vous avez accepté la politique de confidentialité, vos données seront enregistrées et vous pourrez les récupérer la prochaine fois.",
        "pt-BR": "Você aceitou a política de privacidade, seus dados serão salvos e você poderá recuperá-los na próxima vez."
      },
      youCannotReadThatFast: {
        "en-US": "😡 It's literally impossible to read this text in `{seconds}s`, be serious! [📎]({postLinkedin})",
        fr: "😡 C'est littéralement impossible de lire ce texte en `{seconds}s`, soyez sérieux ! [📎]({postLinkedin})",
        "pt-BR": "😡 É literalmente impossível ler esse texto em `{seconds}s`, seja sério! [📎]({postLinkedin})"
      },
      ohOkay: {
        "en-US": "Ah sorry man, you know it happens so often, good use of the bot!",
        fr: "Ah désolé mec, tu sais que ça arrive souvent, bonne utilisation du bot !",
        "pt-BR": "Ah, desculpe, cara, você sabe que isso acontece muito, bom uso do bot!"
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
            "- You can delete your entire data by contacting support, in the future a command will be made to do this manually, for now you can",
            "contact support to do this.\n"
          ].join(" "), [
            "- The user's messages are stored from the moment you speak in a conversation or ask a question to be retrieved in the request",
            "history (accessible via {cmdHistory}) so that the AI keeps track of your old messages.\n"
          ].join(" "), [
            "- Please take the time to read this policy carefully and feel free to contact us with any questions you may have regarding the",
            "privacy practices of this bot.\n"
          ].join(" "),
          "You will be able to activate the automatic deletion or others (after 30 days) in the command that will arrive soon (see {cmdRoadmap})",
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
            "- Vous pouvez supprimer l'intégralité de vos données en contactant le support, à l'avenir une commande sera faite pour faire cela",
            "manuellement, pour l'instant vous pouvez contacter le support pour faire cela.\n"
          ].join(" "), [
            "- Les messages de l'utilisateur sont stockés à partir du moment où vous parlez dans une conversation ou posez une question pour",
            "être récupérés dans l'historique des demandes (accessible via {cmdHistory}) afin que l'IA garde une trace de vos anciens messages.\n"
          ].join(" "), [
            "- Veuillez prendre le temps de lire attentivement cette politique et n'hésitez pas à nous contacter pour toute question que vous",
            "pourriez avoir concernant les pratiques de confidentialité de ce bot.\n"
          ].join(" "),
          "Vous pourrez activer la suppression automatique ou autres (après 30 jours) dans la commande qui arrivera bientôt (voir {cmdRoadmap})",
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
            "- Você pode excluir todos os seus dados entrando em contato com o suporte, no futuro um comando será feito para fazer isso",
            "manualmente, por enquanto você pode entrar em contato com o suporte para fazer isso.\n"
          ].join(" "), [
            "- As mensagens do usuário são armazenadas a partir do momento em que você fala em uma conversa ou faz uma pergunta para",
            "ser recuperado no histórico de solicitações (acessível via {cmdHistory}) para que a IA acompanhe suas mensagens antigas.\n"
          ].join(" "), [
            "- Por favor, reserve um tempo para ler atentamente esta política e sinta-se à vontade para entrar em contato conosco com qualquer",
            "dúvida que possa ter sobre as práticas de privacidade deste bot.\n"
          ].join(" "),
          "Você poderá ativar a exclusão automática ou outras (após 30 dias) no comando que chegará em breve (veja {cmdRoadmap})",
          "Ao aceitar esta política de privacidade, você concorda que seus dados serão armazenados e usados ​​conforme descrito acima."
        ].join("\n")
      }
    }
  }
} satisfies Record<string, Command>;