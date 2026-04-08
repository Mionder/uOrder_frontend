'use client';

import { LayoutGrid, RotateCcw } from 'lucide-react';

export default function MenuError({ reset }: { reset: () => void }) {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="bg-white border-2 border-dashed border-gray-100 p-12 rounded-[3rem] text-center">
        <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <LayoutGrid size={32} />
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Помилка завантаження меню</h2>
        <p className="text-gray-400 text-sm font-medium mb-8 max-w-xs mx-auto">
          Ми не змогли підтягнути ваші страви. Перевірте з'єднання з інтернетом.
        </p>
        <button 
          onClick={() => reset()}
          className="flex items-center gap-2 mx-auto px-8 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95"
        >
          <RotateCcw size={14} /> Перезавантажити менеджер
        </button>
      </div>
    </div>
  );
}