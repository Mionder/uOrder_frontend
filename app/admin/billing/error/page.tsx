'use client'
import { XCircle, RefreshCw, MessageCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function ErrorPage() {
  const router = useRouter();
  const { tr } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-red-100 rounded-full scale-150 blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-white border-2 border-black rounded-[2rem] flex items-center justify-center shadow-2xl shadow-black/5">
            <XCircle size={48} className="text-black" />
          </div>
        </div>

        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-black">
           {tr('billing.error.title')}
        </h1>
        <p className="text-gray-500 font-medium mb-12 leading-relaxed">
           {tr('billing.error.message')}
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => router.push('/admin/billing')}
            className="w-full py-5 bg-black text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-900 transition-all active:scale-95 shadow-xl shadow-black/10"
          >
            <RefreshCw size={16} /> {tr('billing.error.retry')}
          </button>
          
          <button 
            onClick={() => window.open('https://t.me/your_support', '_blank')}
            className="w-full py-5 bg-white border-2 border-gray-100 text-black rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-95"
          >
            <MessageCircle size={16} /> {tr('billing.error.support')}
          </button>
        </div>

        <button 
          onClick={() => router.back()}
          className="mt-8 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft size={14} /> Повернутись
        </button>
      </div>
    </div>
  );
}