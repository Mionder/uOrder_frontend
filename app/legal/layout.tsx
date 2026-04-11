'use client'
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PolicyLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { tr } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-black py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-all mb-12"
        >
          <ArrowLeft size={16} /> {tr('back')}
        </button>
        
        {
          /*
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">{title}</h1>
        <p className="text-xs font-black text-gray-300 uppercase tracking-widest mb-12">Last Updated: {lastUpdated}</p>
           
          */
        }
       
        <div className="prose prose-zinc max-w-none 
          prose-h3:text-xl prose-h3:font-black prose-h3:mt-10 prose-h3:mb-4 prose-h3:uppercase prose-h3:tracking-tight
          prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
          prose-li:text-gray-600 prose-li:mb-2 prose-strong:text-black prose-strong:font-bold">
          {children}
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          uOrder System • FOP Oliinyk Serhii Oleksandrovych • uorder.app.menu@gmail.com
        </div>
      </div>
    </div>
  );
}