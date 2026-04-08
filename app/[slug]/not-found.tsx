'use client'
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function RestaurantNotFound() {
  const { tr } = useLanguage();  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
      <div className="max-w-sm">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Search size={32} />
        </div>
        <h2 className="text-2xl font-black uppercase italic mb-2">{tr('not_found.title')}</h2>
        <p className="text-gray-400 text-sm font-medium mb-8">
          {tr('not_found.subtitle')}
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-4 bg-gray-100 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
        >
          {tr('not_found.back_button')} <span className="font-bold italic tracking-tighter normal-case text-[14px]">uOrder.</span>
        </Link>
      </div>
    </div>
  );
}