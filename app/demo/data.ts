export const DEMO_DATA = {
  name: "Napoli Pizza & Pasta",
  slug: "demo",
  mainColor: "#FF4500",
  logo: "https://images.pexels.com/photos/32906967/pexels-photo-32906967.jpeg",
  phone: "+380 97 123 45 67",
  languages: ["uk", "en"], // доступні мови в меню
  
  description: {
    uk: "Справжня неаполітанська піца з дров'яної печі у самому центрі міста.",
    en: "Authentic Neapolitan wood-fired pizza in the very heart of the city."
  },

  workingHours: {
    uk: "Пн-Нд: 10:00 - 22:00",
    en: "Mon-Sun: 10:00 AM - 10:00 PM"
  },

  categories: [
    {
      id: "1",
      name: {
        uk: "Піца 🍕",
        en: "Pizza 🍕"
      },
      items: [
        {
          id: "p1",
          name: { 
            uk: "Маргарита", 
            en: "Margherita" 
          },
          description: { 
            uk: "Класика: томати Сан-Марцано, моцарела буффало, базилік.", 
            en: "Classic: San Marzano tomatoes, buffalo mozzarella, fresh basil." 
          },
          basePrice: 245,
          weight: "420г",
          image: "https://images.pexels.com/photos/34480202/pexels-photo-34480202.jpeg",
          variants: [],
          spiciness: "REGULAR",
          allergens: ["1", "7"] // Глютен, Лактоза
        },
        {
          id: "p2",
          name: {
            uk: "Діавола",
            en: "Diavola"
          },
          description: {
            uk: "Гостра піца з салямі піканте та пластівцями чилі.",
            en: "Spicy pizza with salami picante and chili flakes."
          },
          basePrice: 290,
          weight: "400г",
          image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600",
          variants: [],
          spiciness: "HOT",
          allergens: ["1", "7"]
        }
      ]
    },
    {
      id: "2",
      name: {
        uk: "Напої 🥤",
        en: "Drinks 🥤"
      },
      items: [
        {
          id: "d1",
          name: {
            uk: "Домашній лимонад",
            en: "Homemade Lemonade"
          },
          description: {
            uk: "Лимон, м'ята, тростинний цукор, газована вода.",
            en: "Lemon, mint, cane sugar, sparkling water."
          },
          basePrice: 85,
          weight: "400мл",
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600",
          variants: [],
          spiciness: "REGULAR",
          allergens: []
        }
      ]
    }
  ]
};