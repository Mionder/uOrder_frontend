'use client';

import { useLanguage } from '@/context/LanguageContext';
import { AlertCircle } from 'lucide-react';

export default function DashboardError({ reset }: { reset: () => void }) {
    const { tr } = useLanguage();
  return (
    <div className="p-8">
      <div className="bg-orange-50 border border-orange-100 p-8 rounded-[2.5rem] text-center">
        <AlertCircle className="text-orange-600 mx-auto mb-4" size={32} />
        <h2 className="text-xl font-black uppercase italic tracking-tight mb-2">{tr('dashboard_error.title')}</h2>
        <p className="text-orange-800/60 text-sm font-medium mb-6">{tr('dashboard_error.subtitle')}</p>
        <button 
          onClick={() => reset()}
          className="px-6 py-3 bg-white border border-orange-200 text-orange-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-100 transition-colors"
        >
          {tr('dashboard_error.reload')}
        </button>
      </div>
    </div>
  );
}