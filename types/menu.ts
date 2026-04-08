// types/menu.ts
export interface MenuItem {
  id: string;
  name: { uk: string; en: string }; // Json поле
  price: number;
  basePrice: number;
  image?: string;
  sortOrder: number;
  categoryId: string;
  weight: string;
  variants: any;
}

export interface Category {
  id: string;
  name: { uk: string; en: string }; // Json поле
  sortOrder: number;
  items: MenuItem[]; // Страви всередині категорії
}