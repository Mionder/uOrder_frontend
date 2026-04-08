// components/ui/Loader.tsx
'use client';
import { useLanguage } from '@/context/LanguageContext';
import React from 'react';

export const Loader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => {
    const { tr } = useLanguage();
  return (
    <div 
      className={`
        flex items-center justify-center 
        ${fullScreen ? 'fixed inset-0 bg-white z-[1000]' : 'w-full py-20'} 
      `}
    >
      <div className="relative flex flex-col items-center">
        {/* Контейнер для кола та тексту */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          
          {/* Зовнішнє коло завантаження */}
          <div className="absolute inset-0 border-[3px] border-gray-100 rounded-full" />
          
          {/* Анімована частина кола */}
          <div className="absolute inset-0 border-[3px] border-t-black border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin duration-700" />
          
          {/* Текстове лого - додаємо легкий пульс */}
          <span className="text-2xl font-black italic tracking-tighter text-black select-none animate-pulse">
            uOrder.
          </span>
        </div>

        {/* Підпис знизу */}
        <p className="mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-gray-300">
          {tr('loading')}
        </p>
      </div>
    </div>
  );
};