'use client'
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function SuccessPage() {
  const router = useRouter();
  const { tr } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-black rounded-[2rem] flex items-center justify-center shadow-2xl shadow-black/20">
            <CheckCircle2 size={48} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">
          {tr('billing.success.title')}
        </h1>
        <p className="text-gray-500 font-medium mb-12 leading-relaxed">
          {tr('billing.success.message')}
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => router.push('/admin/dashboard')}
            className="w-full py-5 bg-black text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-900 transition-all active:scale-95 shadow-xl shadow-black/10"
          >
            {tr('billing.success.go_dashboard')} <ArrowRight size={16} />
          </button>
          
          <div className="p-6 border border-gray-100 rounded-[2rem] bg-gray-50 flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Zap className="text-blue-600 fill-blue-600" size={20} />
            </div>
            <div className="text-left">
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Статус тарифу</div>
              <div className="text-xs font-black uppercase italic text-black">PRO Активовано</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}