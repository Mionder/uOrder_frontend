// src/config/menu-constants.ts
export const ALLERGENS = [
  { 
    id: 'lactose', 
    label: { uk: 'Лактоза', en: 'Lactose', pl: 'Laktoza' }, 
    icon: '🥛' 
  },
  { 
    id: 'nuts', 
    label: { uk: 'Горіхи', en: 'Nuts', pl: 'Orzechy' }, 
    icon: '🥜' 
  },
  { 
    id: 'eggs', 
    label: { uk: 'Яйця', en: 'Eggs', pl: 'Jajka' }, 
    icon: '🥚' 
  },
  { 
    id: 'gluten', 
    label: { uk: 'Глютен', en: 'Gluten', pl: 'Gluten' }, 
    icon: '🌾' 
  },
  { 
    id: 'fish', 
    label: { uk: 'Риба', en: 'Fish', pl: 'Ryba' }, 
    icon: '🐟' 
  },
  { 
    id: 'crustaceans', 
    label: { uk: 'Ракоподібні', en: 'Crustaceans', pl: 'Skorupiaki' }, 
    icon: '🦞' 
  },
  { 
    id: 'mustard', 
    label: { uk: 'Гірчиця', en: 'Mustard', pl: 'Musztarda' }, 
    icon: '🏺' 
  },
  { 
    id: 'sesame', 
    label: { uk: 'Кунжут', en: 'Sesame', pl: 'Sezam' }, 
    icon: '🌱' 
  },
  { 
    id: 'celery', 
    label: { uk: 'Селера', en: 'Celery', pl: 'Seler' }, 
    icon: '🥬' 
  },
  { 
    id: 'peanuts', 
    label: { uk: 'Арахіс', en: 'Peanuts', pl: 'Orzeszki ziemne' }, 
    icon: '🥜' 
  },
  { 
    id: 'molluscs', 
    label: { uk: 'Молюски', en: 'Molluscs', pl: 'Mięczaki' }, 
    icon: '🐚' 
  },
];

export const SPICINESS_LEVELS = [
  { id: 'NONE', label: { uk: 'Не гостре', en: 'Not spicy', pl: 'Łagodne' }, color: 'text-gray-400' },
  { id: 'MEDIUM', label: { uk: 'Середньо', en: 'Medium', pl: 'Średnio ostre' }, color: 'text-orange-500' },
  { id: 'HOT', label: { uk: 'Гостро', en: 'Hot', pl: 'Ostre' }, color: 'text-red-500' },
];