import { Interests } from "@prisma/client";
import { LocalizationMap } from "discord.js";

type EmojiWithMap = {
  localization: LocalizationMap;
  emoji: string;
  enum?: string;
}

export const interests: Record<string, EmojiWithMap> = {
  none: {
    localization: {
      "en-US": "None",
      fr: "Aucun",
      "pt-BR": "Nenhum",
      ru: "Нет",
      uk: "Немає",
      "es-ES": "Ninguno"
    },
    emoji: "❌"
  },
  music: {
    localization: {
      "en-US": "Music",
      fr: "Musique",
      "pt-BR": "Música",
      ru: "Музыка",
      uk: "Музика",
      "es-ES": "Música"
    },
    emoji: "🎵",
    enum: Interests.MUSIC
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
    emoji: "📖",
    enum: Interests.READING
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
    emoji: "💰",
    enum: Interests.CRYPTO
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
    emoji: "⚽",
    enum: Interests.SPORT
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
    emoji: "🎮",
    enum: Interests.ESPORT
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
    emoji: "🧮",
    enum: Interests.MATHEMATICS
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
    emoji: "👨‍💻",
    enum: Interests.PROGRAMMING
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
    emoji: "👔",
    enum: Interests.WORK
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
    emoji: "🌍",
    enum: Interests.TRAVEL
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
    emoji: "🎥",
    enum: Interests.MOVIES
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
    emoji: "📷",
    enum: Interests.PHOTOGRAPHY
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
    emoji: "🍳",
    enum: Interests.COOKING
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
    emoji: "🎮",
    enum: Interests.GAMING
  },
  art: {
    localization: {
      "en-US": "Art",
      "pt-BR": "Arte",
      ru: "Искусство",
      uk: "Мистецтво",
      "es-ES": "Arte"
    },
    emoji: "🎨",
    enum: Interests.ART
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
    emoji: "💃",
    enum: Interests.DANCE
  },
  fashion: {
    localization: {
      "en-US": "Fashion & Shopping",
      fr: "Mode & Shopping",
      "pt-BR": "Moda & Compras",
      ru: "Мода и шоппинг",
      uk: "Мода і шопінг",
      "es-ES": "Moda y compras"
    },
    emoji: "👗",
    enum: Interests.FASHION
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
    emoji: "🏥",
    enum: Interests.HEALTH
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
    emoji: "📱",
    enum: Interests.TECHNOLOGY
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
    emoji: "🔬",
    enum: Interests.SCIENCE
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
    emoji: "🐶",
    enum: Interests.ANIMALS
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
    emoji: "🚗",
    enum: Interests.CARS
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
    emoji: "🎉",
    enum: Interests.EVENTS
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
    emoji: "🚀",
    enum: Interests.SPACE
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
    emoji: "👻",
    enum: Interests.PARANORMAL
  }
};