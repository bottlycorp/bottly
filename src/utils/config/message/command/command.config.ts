import { Command } from "$core/utils/config/message/command/command.type";

export const global = {
  buttons: {
    premium: {
      "en-US": "Be Premium",
      fr: "Devenir Premium",
      "pt-BR": "Seja Premium",
      ru: "Стать премиумом",
      uk: "Стати преміумом",
      "es-ES": "Ser Premium",
      de: "Sei Premium"
    },
    vote: {
      "en-US": "Vote for me",
      fr: "Votez pour moi",
      "pt-BR": "Vote por mim",
      ru: "Проголосуйте за меня",
      uk: "Проголосуйте за мене",
      "es-ES": "Vota por mí",
      de: "Stimmen Sie für mich"
    },
    usage: {
      "en-US": "{left}/{max}"
    },
    regeneration: {
      "en-US": "Regeneration in progress",
      fr: "Régénération en cours",
      "pt-BR": "Regeneração em andamento",
      ru: "Восстановление в процессе",
      uk: "Відновлення в процесі",
      "es-ES": "Regeneración en progreso",
      de: "Regeneration im Gange"
    }
  },
  exec: {
    revealed_text: {
      "en-US": ":grey_question: {question}\n\n{response}"
    },
    favorited: {
      "en-US": ":star: The question has been added to your favorites, you can find all your favorites by doing {cmdFavorites}",
      fr: ":star: La question a été ajoutée à vos favoris, vous pouvez retrouver tous vos favoris en faisant {cmdFavorites}",
      "pt-BR": ":star: A pergunta foi adicionada aos seus favoritos, você pode encontrar todos os seus favoritos fazendo {cmdFavorites}",
      ru: ":star: Вопрос был добавлен в избранное, вы можете найти все свои избранные, сделав {cmdFavorites}",
      uk: ":star: Питання було додано до вибраного, ви можете знайти всі свої вибрані, зробивши {cmdFavorites}",
      "es-ES": ":star: La pregunta ha sido añadida a tus favoritos, puedes encontrar todos tus favoritos haciendo {cmdFavorites}",
      de: ":star: Die Frage wurde zu Ihren Favoriten hinzugefügt. Sie können alle Ihre Favoriten finden, indem Sie {cmdFavorites} machen"
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
      ].join(" "),
      de: [
        "Es scheint, dass Sie die maximale Anzahl der Verwendungen meiner Funktionen für heute erreicht haben,",
        "kommen Sie morgen wieder (<t:{unix}:R>), um sie erneut zu verwenden"
      ].join(" ")
    },
    orGetPremium: {
      "en-US": ":sparkles: You can get premium for $5.00/month and increase your usage to 50/day",
      fr: ":sparkles: Vous pouvez obtenir le premium pour 5.00$/mois et augmenter votre nombre d'utilisation à 50/jour",
      "pt-BR": ":sparkles: Você pode obter premium por $5.00/mês e aumentar seu uso para 50/dia",
      ru: ":sparkles: Вы можете получить премиум за 5,00$/месяц и увеличить количество использований до 50/день",
      uk: ":sparkles: Ви можете отримати преміум за 5,00$/місяць і збільшити кількість використань до 50/день",
      "es-ES": ":sparkles: Puede obtener premium por $5.00/mes y aumentar su uso a 50/día",
      de: ":sparkles: Sie können Premium für 5,00 $ / Monat erhalten und Ihre Nutzung auf 50/Tag erhöhen"
    },
    orGetPremiumGPT4: {
      "en-US": ":sparkles: The use of GPT 4 is reserved for premium members, you can become premium for $5.00/month",
      fr: ":sparkles: L'utilisation de GPT 4 est réservée aux membres premium, vous pouvez devenir premium pour 5.00$/mois",
      "pt-BR": ":sparkles: O uso do GPT 4 é reservado para membros premium, você pode se tornar premium por $5.00/mês",
      ru: ":sparkles: Использование GPT 4 зарезервировано для премиум-пользователей, вы можете стать премиумом за 5,00$/месяц",
      uk: ":sparkles: Використання GPT 4 зарезервовано для преміум-користувачів, ви можете стати преміумом за 5,00$/місяць",
      "es-ES": ":sparkles: El uso de GPT 4 está reservado para miembros premium, puede convertirse en premium por $5.00/mes",
      de: ":sparkles: Die Verwendung von GPT 4 ist Premium-Mitgliedern vorbehalten. Sie können für 5,00 $ / Monat Premium werden"
    },
    error: {
      "en-US": "An error occurred while executing the command: **{error}**",
      fr: "Une erreur s'est produite lors de l'exécution de la commande: **{error}**",
      "pt-BR": "Ocorreu um erro ao executar o comando: **{error}**",
      ru: "Произошла ошибка при выполнении команды: **{error}**",
      uk: "Виникла помилка при виконанні команди: **{error}**",
      "es-ES": "Se produjo un error al ejecutar el comando: **{error}**",
      de: "Beim Ausführen des Befehls ist ein Fehler aufgetreten: **{error}**"
    },
    errorTooLong: {
      "en-US": "We have to stop the discussion here, sorry, it is too long. Please feel free to start a new one",
      fr: "Nous devons arrêter la discussion ici, désolé, elle est trop longue. N'hésitez pas à en commencer une nouvelle",
      "pt-BR": "Temos que parar a discussão aqui, desculpe, é muito longa. Sinta-se à vontade para iniciar uma nova",
      ru: "Мы должны остановить обсуждение здесь, извините, оно слишком длинное. Не стесняйтесь начать новый",
      uk: "Ми повинні зупинити обговорення тут, вибачте, воно занадто довге. Не соромтеся почати новий",
      "es-ES": "Tenemos que detener la discusión aquí, lo siento, es demasiado larga. No dude en comenzar uno nuevo",
      de: "Wir müssen die Diskussion hier beenden, tut mir leid, sie ist zu lang. Bitte zögern Sie nicht, eine neue zu starten"
    },
    notInAGuild: {
      "en-US": "Execute the command in a guild",
      fr: "Exécutez la commande dans un serveur",
      "pt-BR": "Execute o comando em um servidor",
      ru: "Выполните команду на сервере",
      uk: "Виконайте команду на сервері",
      "es-ES": "Ejecute el comando en un servidor",
      de: "Führen Sie den Befehl in einer Gilde aus"
    },
    notInATextChannel: {
      "en-US": "Execute the command in a text channel",
      fr: "Exécutez la commande dans un salon textuel",
      "pt-BR": "Execute o comando em um canal de texto",
      ru: "Выполните команду в текстовом канале",
      uk: "Виконайте команду в текстовому каналі",
      "es-ES": "Ejecute el comando en un canal de texto",
      de: "Führen Sie den Befehl in einem Textkanal aus"
    },
    channelNotFound: {
      "en-US": "The channel was not found",
      fr: "Le salon n'a pas été trouvé",
      "pt-BR": "O canal não foi encontrado",
      ru: "Канал не найден",
      uk: "Канал не знайдено",
      "es-ES": "El canal no fue encontrado",
      de: "Der Kanal wurde nicht gefunden"
    },
    botPermissionsNotFound: {
      "en-US": "The permissions I have on this server do not allow me to execute this command, I need: {permissions}",
      fr: "Les permissions qu'on m'a donné sur ce serveur ne me permettent pas d'exécuter cette commande, il me faut: {permissions}",
      "pt-BR": "As permissões que me foram concedidas neste servidor não me permitem executar este comando, eu preciso de: {permissions}",
      ru: "Разрешения, которые я получил на этом сервере, не позволяют мне выполнять эту команду, мне нужно: {permissions}",
      uk: "Дозволи, які я отримав на цьому сервері, не дозволяють мені виконувати цю команду, мені потрібно: {permissions}",
      "es-ES": "Los permisos que tengo en este servidor no me permiten ejecutar este comando, necesito: {permissions}",
      de: "Die Berechtigungen, die ich auf diesem Server habe, erlauben es mir nicht, diesen Befehl auszuführen, ich brauche: {permissions}"
    },
    notInAThread: {
      "en-US": "Execute the command in a thread",
      fr: "Exécutez la commande dans un fil de discussion",
      "pt-BR": "Execute o comando em um thread",
      ru: "Выполните команду в треде",
      uk: "Виконайте команду в треді",
      "es-ES": "Ejecute el comando en un hilo",
      de: "Führen Sie den Befehl in einem Thread aus"
    },
    parentNotFound: {
      "en-US": "The parent channel was not found",
      fr: "Le salon parent n'a pas été trouvé",
      "pt-BR": "O canal pai não foi encontrado",
      ru: "Родительский канал не найден",
      uk: "Батьківський канал не знайдено",
      "es-ES": "El canal principal no fue encontrado",
      de: "Der übergeordnete Kanal wurde nicht gefunden"
    }
  }
} satisfies Command;