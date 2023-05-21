import { Command } from "$core/utils/config/message/command/command.type";

export const global = {
  config: {
    name: {},
    description: {},
    options: {},
    exec: {
      buttons: {
        premium: {
          "en-US": "Be Premium",
          fr: "Devenir Premium",
          "pt-BR": "Seja Premium",
          ru: "Стать премиумом",
          uk: "Стати преміумом",
          "es-ES": "Ser Premium"
        },
        vote: {
          "en-US": "Vote for me",
          fr: "Votez pour moi",
          "pt-BR": "Vote por mim",
          ru: "Проголосуйте за меня",
          uk: "Проголосуйте за мене",
          "es-ES": "Vota por mí"
        },
        reveal: {
          "en-US": "Reveal to public",
          fr: "Révéler au public",
          "pt-BR": "Revelar ao público",
          ru: "Раскрыть для общественности",
          uk: "Розкрити для громадськості",
          "es-ES": "Revelar al público"
        },
        usage: {
          "en-US": "{left}/{max}"
        },
        reveal_text: {
          "en-US": ":grey_question: {question}\n\n{response}",
          fr: ":grey_question: {question}\n\n{response}",
          "pt-BR": ":grey_question: {question}\n\n{response}",
          ru: ":grey_question: {question}\n\n{response}",
          uk: ":grey_question: {question}\n\n{response}",
          "es-ES": ":grey_question: {question}\n\n{response}"
        },
        revealed: {
          "en-US": ":smile: The question has been revealed to the public",
          fr: ":smile: La question a été révélée au public",
          "pt-BR": ":smile: A pergunta foi revelada ao público",
          ru: ":smile: Вопрос был раскрыт общественности",
          uk: ":smile: Питання було розкрито громадськості",
          "es-ES": ":smile: La pregunta ha sido revelada al público"
        },
        download: {
          "en-US": "🖨️ Download",
          fr: "🖨️ Télécharger",
          "pt-BR": "🖨️ Baixar",
          ru: "🖨️ Скачать",
          uk: "🖨️ Завантажити",
          "es-ES": "🖨️ Descargar"
        }
      },
      favorited: {
        "en-US": ":star: The question has been added to your favorites, you can find all your favorites by doing {cmdFavorites}",
        fr: ":star: La question a été ajoutée à vos favoris, vous pouvez retrouver tous vos favoris en faisant {cmdFavorites}",
        "pt-BR": ":star: A pergunta foi adicionada aos seus favoritos, você pode encontrar todos os seus favoritos fazendo {cmdFavorites}",
        ru: ":star: Вопрос был добавлен в избранное, вы можете найти все свои избранные, сделав {cmdFavorites}",
        uk: ":star: Питання було додано до вибраного, ви можете знайти всі свої вибрані, зробивши {cmdFavorites}",
        "es-ES": ":star: La pregunta ha sido añadida a tus favoritos, puedes encontrar todos tus favoritos haciendo {cmdFavorites}"
      },
      noMoreUsages: {
        fr: [
          "Il semblerait que vous ayez atteint le nombre maximum d'utilisation de mes fonctionnalitées pour aujourd'hui,",
          "revenez demain (<t:{unix}:R>) pour les utiliser à nouveau"
        ].join(" "),
        "en-US": [
          "It seems that you have reached the maximum number of uses of my features for today,",
          "come back tomorrow (<t:{unix}:R>) to use them again"
        ].join(" "),
        "pt-BR": [
          "Parece que você atingiu o número máximo de usos de minhas funcionalidades para hoje,",
          "volte amanhã para usá-los novamente (<t:{unix}:R>)"
        ].join(" "),
        ru: [
          "Похоже, вы достигли максимального количества использований моих функций на сегодня,",
          "вернитесь завтра (<t:{unix}:R>), чтобы использовать их снова"
        ].join(" "),
        uk: [
          "Схоже, ви досягли максимальної кількості використань моїх функцій на сьогодні,",
          "поверніться завтра (<t:{unix}:R>), щоб використовувати їх знову"
        ].join(" "),
        "es-ES": [
          "Parece que has alcanzado el número máximo de usos de mis funciones para hoy,",
          "vuelve mañana (<t:{unix}:R>) para usarlos de nuevo"
        ].join(" ")
      },
      orGetPremium: {
        fr: ":sparkles: Vous pouvez aussi devenir premium pour 5.00$/mois et augmenter votre nombre d'utilisation à 50/jour",
        "en-US": ":sparkles: You can also become premium for $5.00/month and increase your number of uses to 50/day",
        "pt-BR": ":sparkles: Você também pode se tornar premium por $5.00/mês e aumentar seu número de usos para 50/dia",
        ru: ":sparkles: Вы также можете стать премиумом за 5,00$/месяц и увеличить количество использований до 50/день",
        uk: ":sparkles: Ви також можете стати преміумом за 5,00$/місяць і збільшити кількість використань до 50/день",
        "es-ES": ":sparkles: También puedes convertirte en premium por $5.00/mes y aumentar tu número de usos a 50/día"
      },
      error: {
        "en-US": "An error occurred while executing the command: **{error}**",
        fr: "Une erreur s'est produite lors de l'exécution de la commande: **{error}**",
        "pt-BR": "Ocorreu um erro ao executar o comando: **{error}**",
        ru: "Произошла ошибка при выполнении команды: **{error}**",
        uk: "Виникла помилка при виконанні команди: **{error}**",
        "es-ES": "Se produjo un error al ejecutar el comando: **{error}**"
      },
      errorTooLong: {
        "en-US": "We have to stop the discussion here, sorry, it is too long. Please feel free to start a new one",
        fr: "Nous devons arrêter la discussion ici, désolé, elle est trop longue. N'hésitez pas à en commencer une nouvelle",
        "pt-BR": "Temos que parar a discussão aqui, desculpe, é muito longa. Sinta-se à vontade para iniciar uma nova",
        ru: "Мы должны остановить обсуждение здесь, извините, оно слишком длинное. Не стесняйтесь начать новый",
        uk: "Ми повинні зупинити обговорення тут, вибачте, воно занадто довге. Не соромтеся почати новий",
        "es-ES": "Tenemos que detener la discusión aquí, lo siento, es demasiado larga. No dude en comenzar uno nuevo"
      },
      notInAGuild: {
        "en-US": "Execute the command in a guild",
        fr: "Exécutez la commande dans un serveur",
        "pt-BR": "Execute o comando em um servidor",
        ru: "Выполните команду на сервере",
        uk: "Виконайте команду на сервері",
        "es-ES": "Ejecute el comando en un servidor"
      },
      notInATextChannel: {
        "en-US": "Execute the command in a text channel",
        fr: "Exécutez la commande dans un salon textuel",
        "pt-BR": "Execute o comando em um canal de texto",
        ru: "Выполните команду в текстовом канале",
        uk: "Виконайте команду в текстовому каналі",
        "es-ES": "Ejecute el comando en un canal de texto"
      },
      channelNotFound: {
        "en-US": "The channel was not found",
        fr: "Le salon n'a pas été trouvé",
        "pt-BR": "O canal não foi encontrado",
        ru: "Канал не найден",
        uk: "Канал не знайдено",
        "es-ES": "El canal no fue encontrado"
      },
      botPermissionsNotFound: {
        "en-US": "The permissions I have on this server do not allow me to execute this command, I need: {permissions}",
        fr: "Les permissions qu'on m'a donné sur ce serveur ne me permettent pas d'exécuter cette commande, il me faut: {permissions}",
        "pt-BR": "As permissões que me foram concedidas neste servidor não me permitem executar este comando, eu preciso de: {permissions}",
        ru: "Разрешения, которые я получил на этом сервере, не позволяют мне выполнять эту команду, мне нужно: {permissions}",
        uk: "Дозволи, які я отримав на цьому сервері, не дозволяють мені виконувати цю команду, мені потрібно: {permissions}",
        "es-ES": "Los permisos que tengo en este servidor no me permiten ejecutar este comando, necesito: {permissions}"
      },
      notInAThread: {
        "en-US": "Execute the command in a thread",
        fr: "Exécutez la commande dans un fil de discussion",
        "pt-BR": "Execute o comando em um thread",
        ru: "Выполните команду в треде",
        uk: "Виконайте команду в треді",
        "es-ES": "Ejecute el comando en un hilo"
      },
      parentNotFound: {
        "en-US": "The parent channel was not found",
        fr: "Le salon parent n'a pas été trouvé",
        "pt-BR": "O canal pai não foi encontrado",
        ru: "Родительский канал не найден",
        uk: "Батьківський канал не знайдено",
        "es-ES": "El canal principal no fue encontrado"
      }
    }
  }
} satisfies Record<string, Command>;