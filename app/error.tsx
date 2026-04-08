'use client';

import { useEffect } from 'react';
import { RefreshCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
          <RefreshCcw size={40} />
        </div>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Ой, щось пішло не так</h1>
        <p className="text-gray-400 font-medium mb-10">
          Сталася непередбачена помилка. Ми вже працюємо над її виправленням.
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-black/10"
          >
            Спробувати ще раз
          </button>
          <button
            onClick={() => window.location.href = '/admin'}
            className="w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:text-black transition-all"
          >
            Повернутися на головну
          </button>
        </div>
      </div>
    </div>
  );
}