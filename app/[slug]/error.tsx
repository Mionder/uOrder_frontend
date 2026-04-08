'use client';

import { useEffect } from 'react';
import { UtensilsCrossed, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function RestaurantError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

    const { tr } = useLanguage();

  useEffect(() => {
    // Логуємо помилку, щоб знати, де саме впало меню клієнта
    console.error('Restaurant Menu Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
      <div className="max-w-sm w-full">
        {/* Анімована іконка або ілюстрація */}
        <div className="w-24 h-24 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <UtensilsCrossed size={48} />
        </div>

        <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-3">
          {tr('public_menu_error.title')}
        </h1>
        
        <p className="text-gray-400 font-medium text-sm mb-10 leading-relaxed">
          {tr('public_menu_error.subtitle')}
        </p>

        <button
          onClick={() => reset()}
          className="w-full py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-black/10 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <RefreshCw size={16} /> {tr('public_menu_error.update')}
        </button>
        
        <p className="mt-8 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
          Powered by uOrder
        </p>
      </div>
    </div>
  );
}