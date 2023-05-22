import { LocalizationMap } from "discord.js";

type EmojiWithMap = {
  localization: LocalizationMap;
  emoji: string;
}

export const interests: Record<string, EmojiWithMap> = {
  music: {
    localization: {
      "en-US": "Music",
      fr: "Musique",
      "pt-BR": "Música",
      ru: "Музыка",
      uk: "Музика",
      "es-ES": "Música"
    },
    emoji: "🎵"
  },
  reading: {
    localization: {
      "en-US": "Reading",
      fr: "Lecture",
      "pt-BR": "Leitura",
      ru: "Чтение",
      uk: "Читання",
      "es-ES": "Lectura"
    },
    emoji: "📖"
  },
  crypto: {
    localization: {
      "en-US": "Crypto-currencies",
      fr: "Crypto-monnaies",
      "pt-BR": "Criptomoedas",
      ru: "Криптовалюты",
      uk: "Криптовалюти",
      "es-ES": "Criptomonedas"
    },
    emoji: "💰"
  },
  sport: {
    localization: {
      "en-US": "Sport",
      fr: "Sport",
      "pt-BR": "Esporte",
      ru: "Спорт",
      uk: "Спорт",
      "es-ES": "Deporte"
    },
    emoji: "⚽"
  },
  esports: {
    localization: {
      "en-US": "Esports",
      fr: "Esports",
      "pt-BR": "Esports",
      ru: "Киберспорт",
      uk: "Кіберспорт",
      "es-ES": "Esports"
    },
    emoji: "🎮"
  },
  mathematics: {
    localization: {
      "en-US": "Mathematics",
      fr: "Mathématiques",
      "pt-BR": "Matemática",
      ru: "Математика",
      uk: "Математика",
      "es-ES": "Matemáticas"
    },
    emoji: "🧮"
  },
  programming: {
    localization: {
      "en-US": "Programming",
      fr: "Programmation",
      "pt-BR": "Programação",
      ru: "Программирование",
      uk: "Програмування",
      "es-ES": "Programación"
    },
    emoji: "👨‍💻"
  },
  work: {
    localization: {
      "en-US": "Work",
      fr: "Travail",
      "pt-BR": "Trabalho",
      ru: "Работа",
      uk: "Робота",
      "es-ES": "Trabajo"
    },
    emoji: "👔"
  },
  travel: {
    localization: {
      "en-US": "Travel",
      fr: "Voyage",
      "pt-BR": "Viagem",
      ru: "Путешествия",
      uk: "Подорожі",
      "es-ES": "Viajes"
    },
    emoji: "🌍"
  },
  movies: {
    localization: {
      "en-US": "Movies",
      fr: "Films",
      "pt-BR": "Filmes",
      ru: "Фильмы",
      uk: "Фільми",
      "es-ES": "Películas"
    },
    emoji: "🎥"
  },
  photography: {
    localization: {
      "en-US": "Photography",
      fr: "Photographie",
      "pt-BR": "Fotografia",
      ru: "Фотография",
      uk: "Фотографія",
      "es-ES": "Fotografía"
    },
    emoji: "📷"
  },
  cooking: {
    localization: {
      "en-US": "Cooking",
      fr: "Cuisine",
      "pt-BR": "Cozinha",
      ru: "Кулинария",
      uk: "Кулінарія",
      "es-ES": "Cocina"
    },
    emoji: "🍳"
  },
  gaming: {
    localization: {
      "en-US": "Gaming",
      fr: "Jeux vidéo",
      "pt-BR": "Jogos",
      ru: "Игры",
      uk: "Ігри",
      "es-ES": "Juegos"
    },
    emoji: "🎮"
  },
  art: {
    localization: {
      "en-US": "Art",
      "pt-BR": "Arte",
      ru: "Искусство",
      uk: "Мистецтво",
      "es-ES": "Arte"
    },
    emoji: "🎨"
  },
  dance: {
    localization: {
      "en-US": "Dance",
      fr: "Danse",
      "pt-BR": "Dança",
      ru: "Танцы",
      uk: "Танці",
      "es-ES": "Danza"
    },
    emoji: "💃"
  },
  fashion: {
    localization: {
      "en-US": "Fashion",
      fr: "Mode",
      "pt-BR": "Moda",
      ru: "Мода",
      uk: "Мода",
      "es-ES": "Moda"
    },
    emoji: "👗"
  },
  health: {
    localization: {
      "en-US": "Health",
      fr: "Santé",
      "pt-BR": "Saúde",
      ru: "Здоровье",
      uk: "Здоров'я",
      "es-ES": "Salud"
    },
    emoji: "🏥"
  },
  technology: {
    localization: {
      "en-US": "Technology",
      fr: "Technologie",
      "pt-BR": "Tecnologia",
      ru: "Технологии",
      uk: "Технології",
      "es-ES": "Tecnología"
    },
    emoji: "📱"
  },
  science: {
    localization: {
      "en-US": "Science",
      fr: "Science",
      "pt-BR": "Ciência",
      ru: "Наука",
      uk: "Наука",
      "es-ES": "Ciencia"
    },
    emoji: "🔬"
  },
  animals: {
    localization: {
      "en-US": "Animals",
      fr: "Animaux",
      "pt-BR": "Animais",
      ru: "Животные",
      uk: "Тварини",
      "es-ES": "Animales"
    },
    emoji: "🐶"
  },
  cars: {
    localization: {
      "en-US": "Cars",
      fr: "Voitures",
      "pt-BR": "Carros",
      ru: "Автомобили",
      uk: "Автомобілі",
      "es-ES": "Coches"
    },
    emoji: "🚗"
  },
  events: {
    localization: {
      "en-US": "Events",
      fr: "Événements",
      "pt-BR": "Eventos",
      ru: "События",
      uk: "Події",
      "es-ES": "Eventos"
    },
    emoji: "🎉"
  },
  shopping: {
    localization: {
      "en-US": "Shopping",
      fr: "Shopping",
      "pt-BR": "Compras",
      ru: "Покупки",
      uk: "Покупки",
      "es-ES": "Compras"
    },
    emoji: "🛍️"
  },
  space: {
    localization: {
      "en-US": "Space",
      fr: "Espace",
      "pt-BR": "Espaço",
      ru: "Космос",
      uk: "Космос",
      "es-ES": "Espacio"
    },
    emoji: "🚀"
  },
  paranormal: {
    localization: {
      "en-US": "Paranormal",
      fr: "Paranormal",
      "pt-BR": "Paranormal",
      ru: "Паранормальное",
      uk: "Паранормальне",
      "es-ES": "Paranormal"
    },
    emoji: "👻"
  }
};