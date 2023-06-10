import { Command } from "$core/utils/config/message/command/command.type";

export const list = {
  name: {
    "en-US": "list"
  },
  description: {
    "en-US": "Make a list of questions to retrieve easily",
    fr: "Faites une liste de questions pour récupérer facilement",
    "pt-BR": "Crie uma lista de perguntas para recuperar facilmente",
    ru: "Сделайте список вопросов для легкого извлечения",
    uk: "Створіть список питань для легкого вилучення",
    "es-ES": "Haga una lista de preguntas para recuperar fácilmente",
    de: "Erstellen Sie eine Liste von Fragen, um sie leicht abzurufen"
  },
  subcmds: {
    create: {
      name: { "en-US": "create" },
      description: {
        "en-US": "Create a list of questions to retrieve easily",
        fr: "Créez une liste de questions pour les récupérer facilement",
        "pt-BR": "Crie uma lista de perguntas para recuperar facilmente",
        ru: "Создайте список вопросов для легкого извлечения",
        uk: "Створіть список питань для легкого вилучення",
        "es-ES": "Crea una lista de preguntas para recuperar fácilmente",
        de: "Erstellen Sie eine Liste von Fragen, um sie leicht abzurufen"
      },
      options: {
        name: {
          name: { "en-US": "name" },
          description: {
            "en-US": "The name of the list",
            fr: "Le nom de la liste",
            "pt-BR": "O nome da lista",
            ru: "Название списка",
            uk: "Назва списку",
            "es-ES": "El nombre de la lista",
            de: "Der Name der Liste"
          }
        }
      }
    },
    delete: {
      name: { "en-US": "delete" },
      description: {
        "en-US": "Delete a list of questions",
        fr: "Supprimer une liste de questions",
        "pt-BR": "Exclua uma lista de perguntas",
        ru: "Удалить список вопросов",
        uk: "Видалити список питань",
        "es-ES": "Eliminar una lista de preguntas",
        de: "Löschen Sie eine Liste von Fragen"
      },
      options: {
        name: {
          name: { "en-US": "name" },
          description: {
            "en-US": "The name of the list",
            fr: "Le nom de la liste",
            "pt-BR": "O nome da lista",
            ru: "Название списка",
            uk: "Назва списку",
            "es-ES": "El nombre de la lista",
            de: "Der Name der Liste"
          }
        }
      }
    },
    add: {
      name: { "en-US": "add" },
      description: {
        "en-US": "Add a question to a list",
        fr: "Ajouter une question à une liste",
        "pt-BR": "Adicione uma pergunta a uma lista",
        ru: "Добавить вопрос в список",
        uk: "Додати питання до списку",
        "es-ES": "Agregar una pregunta a una lista",
        de: "Fügen Sie eine Frage zu einer Liste hinzu"
      },
      options: {
        name: {
          name: { "en-US": "name" },
          description: {
            "en-US": "The name of the list",
            fr: "Le nom de la liste",
            "pt-BR": "O nome da lista",
            ru: "Название списка",
            uk: "Назва списку",
            "es-ES": "El nombre de la lista",
            de: "Der Name der Liste"
          }
        },
        question: {
          name: { "en-US": "question" },
          description: {
            "en-US": "The question to add",
            fr: "La question à ajouter",
            "pt-BR": "A pergunta a adicionar",
            ru: "Вопрос для добавления",
            uk: "Питання для додавання",
            "es-ES": "La pregunta a agregar",
            de: "Die Frage hinzufügen"
          }
        }
      }
    },
    remove: {
      name: { "en-US": "remove" },
      description: {
        "en-US": "Remove a question from a list",
        fr: "Supprimer une question d'une liste",
        "pt-BR": "Remova uma pergunta de uma lista",
        ru: "Удалить вопрос из списка",
        uk: "Видалити питання зі списку",
        "es-ES": "Eliminar una pregunta de una lista",
        de: "Entfernen Sie eine Frage aus einer Liste"
      },
      options: {
        name: {
          name: { "en-US": "name" },
          description: {
            "en-US": "The name of the list",
            fr: "Le nom de la liste",
            "pt-BR": "O nome da lista",
            ru: "Название списка",
            uk: "Назва списку",
            "es-ES": "El nombre de la lista",
            de: "Der Name der Liste"
          }
        },
        question: {
          name: { "en-US": "question" },
          description: {
            "en-US": "The question to remove",
            fr: "La question à supprimer",
            "pt-BR": "A pergunta a remover",
            ru: "Вопрос для удаления",
            uk: "Питання для видалення",
            "es-ES": "La pregunta a eliminar",
            de: "Die Frage entfernen"
          }
        }
      }
    },
    list: {
      name: { "en-US": "list" },
      description: {
        "en-US": "List all questions in a list",
        fr: "Listez toutes les questions d'une liste",
        "pt-BR": "Liste todas as perguntas de uma lista",
        ru: "Список всех вопросов в списке",
        uk: "Список всіх питань у списку",
        "es-ES": "Enumere todas las preguntas en una lista",
        de: "Liste alle Fragen in einer Liste auf"
      },
      options: {
        name: {
          name: { "en-US": "name" },
          description: {
            "en-US": "The name of the list",
            fr: "Le nom de la liste",
            "pt-BR": "O nome da lista",
            ru: "Название списка",
            uk: "Назва списку",
            "es-ES": "El nombre de la lista",
            de: "Der Name der Liste"
          }
        }
      }
    },
    lists: {
      name: { "en-US": "lists" },
      description: {
        "en-US": "List all lists of questions",
        fr: "Listez toutes les listes de questions",
        "pt-BR": "Liste todas as listas de perguntas",
        ru: "Список всех списков вопросов",
        uk: "Список всіх списків питань",
        "es-ES": "Enumere todas las listas de preguntas",
        de: "Liste alle Listen von Fragen auf"
      }
    },
    rename: {
      name: { "en-US": "rename" },
      description: {
        "en-US": "Rename a list of questions",
        fr: "Renommer une liste de questions",
        "pt-BR": "Renomeie uma lista de perguntas",
        ru: "Переименовать список вопросов",
        uk: "Перейменувати список питань",
        "es-ES": "Renombrar una lista de preguntas",
        de: "Benennen Sie eine Liste von Fragen um"
      },
      options: {
        name: {
          name: { "en-US": "name" },
          description: {
            "en-US": "The name of the list",
            fr: "Le nom de la liste",
            "pt-BR": "O nome da lista",
            ru: "Название списка",
            uk: "Назва списку",
            "es-ES": "El nombre de la lista",
            de: "Der Name der Liste"
          }
        },
        newname: {
          name: { "en-US": "newname" },
          description: {
            "en-US": "The new name of the list",
            fr: "Le nouveau nom de la liste",
            "pt-BR": "O novo nome da lista",
            ru: "Новое название списка",
            uk: "Нова назва списку",
            "es-ES": "El nuevo nombre de la lista",
            de: "Der neue Name der Liste"
          }
        }
      }
    }
  },
  "exec": {
    "no-lists": {
      "en-US": "You have not created any question lists yet. Create one with {cmdListCreate} and add questions to it with {cmdListAdd}",
      fr: "Vous n'avez pour l'instant créer aucune liste de questions. Créez-en une avec {cmdListNew} et ajoutez-y des questions avec {cmdListAdd}",
      "pt-BR": "Você ainda não criou nenhuma lista de perguntas. Crie uma com {cmdListCreate} e adicione perguntas a ela com {cmdListAdd}",
      ru: "Вы еще не создали ни одного списка вопросов. Создайте его с помощью {cmdListCreate} и добавьте вопросы в него с помощью {cmdListAdd}",
      uk: "Ви ще не створили жодного списку питань. Створіть один з {cmdListCreate} та додайте до нього питання з {cmdListAdd}",
      "es-ES": "Aún no ha creado ninguna lista de preguntas. Cree uno con {cmdListCreate} y agregue preguntas a él con {cmdListAdd}",
      de: "Sie haben noch keine Fragenlisten erstellt. Erstellen Sie eine mit {cmdListCreate} und fügen Sie Fragen mit {cmdListAdd} hinzu"
    },
    "list-create": {
      "select-choose-placeholder": {
        "en-US": "Select a question to add to the list",
        fr: "Sélectionnez une question à ajouter à la liste",
        "pt-BR": "Selecione uma pergunta para adicionar à lista",
        ru: "Выберите вопрос для добавления в список",
        uk: "Виберіть питання для додавання до списку",
        "es-ES": "Seleccione una pregunta para agregar a la lista",
        de: "Wählen Sie eine Frage aus, die Sie der Liste hinzufügen möchten"
      },
      "already-exists": {
        "en-US": "A list with the name `{name}` already exists",
        fr: "Une liste avec le nom `{name}` existe déjà",
        "pt-BR": "Uma lista com o nome `{name}` já existe",
        ru: "Список с названием `{name}` уже существует",
        uk: "Список з назвою `{name}` вже існує",
        "es-ES": "Ya existe una lista con el nombre `{name}`",
        de: "Eine Liste mit dem Namen `{name}` existiert bereits"
      },
      "created": {
        "en-US": "You have successfully created the list `{name}`, now choose questions to add to it via the menu below",
        fr: "Vous avez créé avec succès la liste `{name}`, choisissez maintenant des questions à y ajouter via le menu ci-dessous",
        "pt-BR": "Você criou com sucesso a lista `{name}`, agora escolha perguntas para adicionar a ela no menu abaixo",
        ru: "Вы успешно создали список `{name}`, теперь выберите вопросы для добавления в него в меню ниже",
        uk: "Ви успішно створили список `{name}`, тепер виберіть питання для додавання до нього в меню нижче",
        "es-ES": "Ha creado con éxito la lista `{name}`, ahora elija preguntas para agregar a ella en el menú a continuación",
        de: "Sie haben die Liste `{name}` erfolgreich erstellt. Wählen Sie nun Fragen aus, die Sie im folgenden Menü hinzufügen möchten"
      },
      "no-questions": {
        "en-US": "You have not added any questions to the list yet. Add some with {cmdListAdd}",
        fr: "Toutes vos questions ont déjà été ajoutés à une liste, vous pouvez poser une nouvelle question avec {cmdAsk}",
        "pt-BR": "Você ainda não adicionou nenhuma pergunta à lista. Adicione algumas com {cmdListAdd}",
        ru: "Вы еще не добавили вопросы в список. Добавьте некоторые с помощью {cmdListAdd}",
        uk: "Ви ще не додали жодного питання до списку. Додайте деякі з {cmdListAdd}",
        "es-ES": "Aún no ha agregado ninguna pregunta a la lista. Agregue algunos con {cmdListAdd}",
        de: "Sie haben noch keine Fragen zur Liste hinzugefügt. Fügen Sie einige mit {cmdListAdd} hinzu"
      },
      "added": {
        "en-US": "You have successfully added `{count}` question(s) to the list `{name}`",
        fr: "Vous avez ajouté avec succès `{count}` question(s) à la liste `{name}`",
        "pt-BR": "Você adicionou com sucesso `{count}` pergunta(s) à lista `{name}`",
        ru: "Вы успешно добавили `{count}` вопрос(ов) в список `{name}`",
        uk: "Ви успішно додали `{count}` питання(ь) до списку `{name}`",
        "es-ES": "Ha agregado con éxito `{count}` pregunta(s) a la lista `{name}`",
        de: "Sie haben `{count}` Frage(n) erfolgreich zur Liste `{name}` hinzugefügt"
      }
    },
    "lists": {
      "title": {
        "en-US": "Question Lists",
        fr: "Listes de questions",
        "pt-BR": "Listas de perguntas",
        ru: "Списки вопросов",
        uk: "Списки питань",
        "es-ES": "Listas de preguntas",
        de: "Fragenlisten"
      },
      "list": {
        "en-US": "List `{name}`",
        fr: "Liste `{name}`",
        "pt-BR": "Lista `{name}`",
        ru: "Список `{name}`",
        uk: "Список `{name}`",
        "es-ES": "Lista `{name}`",
        de: "Liste `{name}`"
      },
      "list_line": {
        "en-US": "{name} ({count} questions)",
        fr: "{name} ({count} questions)",
        "pt-BR": "{name} ({count} perguntas)",
        ru: "{name} ({count} вопросов)",
        uk: "{name} ({count} питань)",
        "es-ES": "{name} ({count} preguntas)",
        de: "{name} ({count} Fragen)"
      }
    },
    "list-renamed": {
      "en-US": "You've successfully renamed the list `{name}` to `{newname}`",
      fr: "Vous avez renommé avec succès la liste `{name}` en `{newname}`",
      "pt-BR": "Você renomeou com sucesso a lista `{name}` para `{newname}`",
      ru: "Вы успешно переименовали список `{name}` в `{newname}`",
      uk: "Ви успішно перейменували список `{name}` в `{newname}`",
      "es-ES": "Ha cambiado el nombre de la lista `{name}` a `{newname}`",
      de: "Sie haben die Liste `{name}` erfolgreich in `{newname}` umbenannt"
    },
    "list-deleted": {
      "en-US": "You've successfully deleted the list `{name}`",
      fr: "Vous avez supprimé avec succès la liste `{name}`",
      "pt-BR": "Você excluiu com sucesso a lista `{name}`",
      ru: "Вы успешно удалили список `{name}`",
      uk: "Ви успішно видалили список `{name}`",
      "es-ES": "Ha eliminado con éxito la lista `{name}`",
      de: "Sie haben die Liste `{name}` erfolgreich gelöscht"
    },
    "list-added": {
      "en-US": "You've successfully added the question `{question}` to the list `{name}`",
      fr: "Vous avez ajouté avec succès la question `{question}` à la liste `{name}`",
      "pt-BR": "Você adicionou com sucesso a pergunta `{question}` à lista `{name}`",
      ru: "Вы успешно добавили вопрос `{question}` в список `{name}`",
      uk: "Ви успішно додали питання `{question}` до списку `{name}`",
      "es-ES": "Ha agregado con éxito la pregunta `{question}` a la lista `{name}`",
      de: "Sie haben die Frage `{question}` erfolgreich der Liste `{name}` hinzugefügt"
    },
    "list-removed": {
      "en-US": "You've successfully removed the question `{question}` from the list `{name}`",
      fr: "Vous avez supprimé avec succès la question `{question}` de la liste `{name}`",
      "pt-BR": "Você removeu com sucesso a pergunta `{question}` da lista `{name}`",
      ru: "Вы успешно удалили вопрос `{question}` из списка `{name}`",
      uk: "Ви успішно видалили питання `{question}` зі списку `{name}`",
      "es-ES": "Ha eliminado con éxito la pregunta `{question}` de la lista `{name}`",
      de: "Sie haben die Frage `{question}` erfolgreich aus der Liste `{name}` entfernt"
    },
    "list-cleared": {
      "en-US": "You've successfully cleared the list `{name}`",
      fr: "Vous avez vidé avec succès la liste `{name}`",
      "pt-BR": "Você limpou com sucesso a lista `{name}`",
      ru: "Вы успешно очистили список `{name}`",
      uk: "Ви успішно очистили список `{name}`",
      "es-ES": "Ha limpiado con éxito la lista `{name}`",
      de: "Sie haben die Liste `{name}` erfolgreich geleert"
    }
  }
} satisfies Command;