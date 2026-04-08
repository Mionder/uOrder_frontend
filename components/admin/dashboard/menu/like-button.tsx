"use client";
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useLikes } from './hooks/use-likes';
import { getGuestId } from './hooks/use-guest-identifier';

export const LikeButton = ({ item }: { item: any }) => {
  const { isItemLiked, toggleLikeInStorage } = useLikes();
  const [count, setCount] = useState(item.likesCount);
  
  // Визначаємо стан на основі нашого хука
  const active = isItemLiked(item.id);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Щоб не спрацював перехід по посиланню, якщо кнопка всередині картки
    
    const guestId = getGuestId();
    
    // Оптимістичне оновлення UI (відразу змінюємо стан)
    const newActive = !active;
    setCount((prev: any) => newActive ? prev + 1 : prev - 1);
    toggleLikeInStorage(item.id);

    try {
      const res = await fetch(`http://localhost:3000/v1/public/menu/${item.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: guestId })
      });

      if (!res.ok) throw new Error();
    } catch (err) {
      // Якщо сервер повернув помилку — відкочуємо стан назад
      setCount((prev: any) => active ? prev + 1 : prev - 1);
      toggleLikeInStorage(item.id);
      console.error("Не вдалося зберегти лайк");
    }
  };

  return (
    <button 
      onClick={handleLike}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
        active 
          ? 'bg-red-50 text-red-500 border-red-100' 
          : 'bg-gray-50 text-gray-400 border-transparent'
      } border`}
    >
      <Heart size={18} className={active ? "fill-current" : ""} />
      <span className="text-sm font-medium">{count}</span>
    </button>
  );
};