// components/admin/QrGenerator.tsx
'use client'
import { useState } from 'react';
import { QrCode, Download, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function QrGenerator({ restaurant, token }: any) {
  const [qrUrl, setQrUrl] = useState(restaurant.qrCodeUrl);
  const [loading, setLoading] = useState(false);
  const { tr } = useLanguage();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/v1/auth/${restaurant.id}/generate-qr`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      
      const data = await res.json();
      setQrUrl(data.qrCodeUrl);
    } catch (err) {
      console.error("QR Generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white mt-6 p-8 rounded-[1rem] border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black uppercase italic tracking-tight">{tr('tenant_settings.qr_generator.title')}</h3>
        <QrCode size={24} className="text-gray-300" />
      </div>

      <div className="flex flex-col items-center gap-6">
        {qrUrl ? (
          <>
            <div className="relative group">
              <img 
                src={qrUrl} 
                alt="QR Code" 
                className="w-56 h-56 rounded-3xl border-4 border-gray-50 p-2 transition-transform group-hover:scale-[1.02]" 
              />
            </div>
            
            <div className="flex w-full gap-3">
              <a 
                href={qrUrl} 
                target="_blank" 
                download="qr-menu.png"
                className="flex-1 bg-black text-white h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm hover:opacity-90 transition-all"
              >
                <Download size={18} /> {tr('tenant_settings.qr_generator.upload')}
              </a>
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-all disabled:opacity-50"
              >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-4 text-gray-300">
              <QrCode size={40} />
            </div>
            <p className="text-sm text-gray-400 font-medium mb-6">{tr('tenant_settings.qr_generator.empty_state')}</p>
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/10 disabled:opacity-50"
            >
              {loading ? tr('tenant_settings.qr_generator.generate') : tr('tenant_settings.qr_generator.create_now')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}