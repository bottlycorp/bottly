import { Command } from "$core/utils/config/message/command/command.type";

export const chat = {
  config: {
    name: {
      "en-US": "chat"
    },
    description: {
      "en-US": "Principal command of the dialog thread with Bottly",
      fr: "Commande principale de la discussion avec Bottly",
      "pt-BR": "Comando principal da conversa com Bottly"
    },
    subcmds: {
      stop: {
        name: {
          "en-US": "stop"
        },
        description: {
          "en-US": "Stop the current dialog thread",
          fr: "Arrêtez la discussion en cours",
          "pt-BR": "Pare a conversa atual"
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
              "pt-BR": "Contexto da conversa"
            }
          },
          prompt: {
            name: {
              "en-US": "prompt"
            },
            description: {
              "en-US": "Initial question of the dialog thread",
              fr: "Question initiale de la discussion",
              "pt-BR": "Pergunta inicial da conversa"
            }
          },
          private: {
            name: {
              "en-US": "private"
            },
            description: {
              "en-US": "If the dialog thread is private",
              fr: "Si la discussion est privée",
              "pt-BR": "Se a conversa é privada"
            }
          }
        },
        description: {
          "en-US": "Open a dialog thread fastly with Bottly",
          fr: "Ouvrez une discussion rapide avec Bottly",
          "pt-BR": "Abra um diálogo rápido com Bottly"
        }
      }
    },
    exec: {
      buttons: {
        hidePremiumTip: {
          "en-US": "Don't show this tip again",
          fr: "Ne plus afficher ce conseil",
          "pt-BR": "Não mostre este conselho novamente"
        }
      },
      channelTemporaryTitle: {
        "en-US": "Discussion with {user}",
        fr: "Discussion avec {user}",
        "pt-BR": "Conversa com {user}"
      },
      channelCreating: {
        "en-US": "{emojiTyping} Your discussion is being created please wait...",
        fr: "{emojiTyping} Votre discussion est en cours de création, veuillez patienter...",
        "pt-BR": "{emojiTyping} Sua conversa está sendo criada, por favor, aguarde..."
      },
      alreadyActiveDiscussion: {
        "en-US": "You already have an active discussion, you can stop it with the command {chatStop} in the <#{thread}> channel",
        fr: "Vous avez déjà une discussion active, vous pouvez l'arrêter avec la commande {chatStop} dans le salon <#{thread}>",
        "pt-BR": "Você já tem uma conversa ativa, você pode pará-la com o comando {chatStop} no canal <#{thread}>"
      },
      notHaveActiveDiscussion: {
        "en-US": "You don't have an active discussion, you can start one with the command {chatTalk}",
        fr: "Vous n'avez pas de discussion active, vous pouvez en démarrer une avec la commande {chatTalk}",
        "pt-BR": "Você não tem uma conversa ativa, você pode começar uma com o comando {chatTalk}"
      },
      notTheAuthor: {
        "en-US": "You are not the author of this discussion so you can stop it",
        fr: "Vous n'êtes pas l'auteur de cette discussion, vous ne pouvez donc pas l'arrêter",
        "pt-BR": "Você não é o autor desta conversa, portanto não pode pará-la"
      },
      stopped: {
        "en-US": "The discussion has been stopped correctly, there was a total of `{count}` messages exchanged.",
        fr: "La discussion a correctement été arrêtée, il y a eu un total de `{count}` messages échangés.",
        "pt-BR": "A conversa foi parada corretamente, houve um total de `{count}` mensagens trocadas."
      },
      creatingFile: {
        "en-US": "{emojiTyping} Your discussion is being downloaded, please wait...",
        fr: "{emojiTyping} Votre discussion est en cours de téléchargement, veuillez patienter...",
        "pt-BR": "{emojiTyping} Sua conversa está sendo baixada, por favor, aguarde..."
      },
      createdFile: {
        "en-US": "Your discussion has been downloaded you can download it with the file below",
        fr: "Votre discussion a été téléchargée, vous pouvez la télécharger avec le fichier ci-dessous",
        "pt-BR": "Sua conversa foi baixada, você pode baixá-la com o arquivo abaixo"
      },
      downloadCommand: {
        "en-US": "If you are a **Premium {emojiPremium}** user you can use the {chatDownload} command to get the conversation in HTML format",
        fr: [
          "Si vous êtes un utilisateur **Premium {emojiPremium}** vous pouvez utiliser la commande {chatDownload} pour obtenir la",
          "conversation au format HTML"
        ].join(" "),
        "pt-BR": "Se você é um usuário **Premium {emojiPremium}**, pode usar o comando {chatDownload} para obter a conversa no formato HTML"
      },
      private: {
        "en-US": "private",
        fr: "privée",
        "pt-BR": "privada"
      },
      public: {
        "en-US": "public",
        fr: "publique",
        "pt-BR": "pública"
      },
      channelCreated: {
        "en-US": "Your `{type}` discussion is created, you can start talking to me in the <#{id}> channel",
        fr: "Votre discussion `{type}` est créée, vous pouvez commencer à parler avec moi dans le salon <#{id}>",
        "pt-BR": "Sua conversa `{type}` foi criada, você pode começar a falar comigo no canal <#{id}>"
      },
      deletedData: {
        "en-US": [
          "The data of this discussion has been deleted because you have set that you don't want your data to be saved in your",
          "privacy settings."
        ].join(" "),
        fr: [
          "Les données de cette conversation viennent d'être supprimées parce que vous avez défini que vous ne voulez pas que vos",
          "données soient enregistrées dans vos paramètres de vie privée."
        ].join(" "),
        "pt-BR": [
          "Os dados desta conversa foram excluídos porque você definiu que não deseja que seus dados sejam salvos em seu",
          "configurações de privacidade."
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
        ].join("\n")
      },
      discussionOpenedPremium: {
        "en-US": "{emojiPremium} Once you have stopped the discussion, you will be able to download it in HTML format",
        fr: "{emojiPremium} Une fois que vous aurez arrêté la discussion, vous pourrez la télécharger au format HTML",
        "pt-BR": "{emojiPremium} Depois de parar a conversa, você pode baixá-la no formato HTML"
      },
      premiumTip: {
        "en-US": "With **Premium {emojiPremium}** you can download the discussion in HTML format as soon as you stop it",
        fr: "Avec **Premium {emojiPremium}** vous pouvez téléchargez la discussion au format HTML dès que vous l'auriez arrêtée",
        "pt-BR": "Com **Premium {emojiPremium}** você pode baixar a conversa no formato HTML assim que pará-la"
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
        ].join(" ")
      }
    }
  }
} satisfies Record<string, Command>;