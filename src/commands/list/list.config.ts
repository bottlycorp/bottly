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
    }
  }
} satisfies Command;