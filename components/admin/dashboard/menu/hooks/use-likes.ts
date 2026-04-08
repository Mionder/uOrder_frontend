// hooks/useLikes.ts
import { useState, useEffect } from 'react';

export const useLikes = () => {
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Завантажуємо список ID страв, які лайкнув цей юзер, при першому рендері
  useEffect(() => {
    const saved = localStorage.getItem('menuxo_liked_items');
    if (saved) {
      try {
        setLikedIds(JSON.parse(saved));
      } catch (e) {
        setLikedIds([]);
      }
    }
  }, []);

  // Перевірка, чи лайкнута конкретна страва
  const isItemLiked = (id: string) => likedIds.includes(id);

  // Оновлення списку (додати/видалити)
  const toggleLikeInStorage = (id: string) => {
    const newLikedIds = likedIds.includes(id)
      ? likedIds.filter(itemId => itemId !== id)
      : [...likedIds, id];
    
    setLikedIds(newLikedIds);
    localStorage.setItem('menuxo_liked_items', JSON.stringify(newLikedIds));
  };

  return { isItemLiked, toggleLikeInStorage };
};