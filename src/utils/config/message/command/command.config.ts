import { Command } from "$core/utils/config/message/command/command.type";

export const global = {
  config: {
    name: {},
    description: {},
    options: {},
    exec: {
      error: {
        "en-US": "An error occurred while executing the command: **{error}**",
        fr: "Une erreur s'est produite lors de l'exécution de la commande: **{error}**",
        "pt-BR": "Ocorreu um erro ao executar o comando: **{error}**"
      },
      notInAGuild: {
        "en-US": "Execute the command in a guild",
        fr: "Exécutez la commande dans un serveur",
        "pt-BR": "Execute o comando em um servidor"
      },
      notInATextChannel: {
        "en-US": "Execute the command in a text channel",
        fr: "Exécutez la commande dans un salon textuel",
        "pt-BR": "Execute o comando em um canal de texto"
      },
      channelNotFound: {
        "en-US": "The channel was not found",
        fr: "Le salon n'a pas été trouvé",
        "pt-BR": "O canal não foi encontrado"
      },
      botPermissionsNotFound: {
        "en-US": "The permissions I have on this server do not allow me to execute this command, I need: {permissions}",
        fr: "Les permissions qu'on m'a donné sur ce serveur ne me permettent pas d'exécuter cette commande, il me faut: {permissions}",
        "pt-BR": "As permissões que me foram concedidas neste servidor não me permitem executar este comando, eu preciso de: {permissions}"
      },
      botNotFound: {
        "en-US": "I am not in this server",
        fr: "Je ne suis pas sur ce serveur",
        "pt-BR": "Eu não estou neste servidor"
      }
    }
  }
} satisfies Record<string, Command>;