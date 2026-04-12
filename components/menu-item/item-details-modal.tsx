'use client';
import { useLanguage } from "@/context/LanguageContext";
import { ALLERGENS } from "@/config/menu-constants";
import { Flame, X, Scale, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

// Компонент модалки (Bottom Sheet style)
export const ItemDetailsModal = ({ info, isOpen, onClose, baseColor, currencySymbol }: any) => {
  const { t, tr } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative w-full max-w-lg bg-white rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full duration-500 max-h-[95vh] flex flex-col">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg active:scale-90 transition-transform"
        >
          <X size={20} className="text-black" />
        </button>

        <div className="overflow-y-auto pb-10">
          {/* Big Image */}
          <div className="relative w-full h-72 sm:h-80">
            <img 
              src={info.image || 'https://blocks.astratic.com/img/general-img-square.png'} 
              className="w-full h-full object-cover"
              alt={t(info.name)}
            />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
          </div>

          {/* Details */}
          <div className="px-8 -mt-6 relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-black text-black tracking-tighter leading-none mb-2">
                  {t(info.name)}
                </h2>
                <div className="flex gap-2 items-center">
                  {info.weight && (
                    <span className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">
                      <Scale size={12} /> {info.weight}
                    </span>
                  )}
                  {info.spiciness !== 'NONE' && (
                     <span className="flex items-center gap-1 text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-lg">
                        <Flame size={12} className="fill-red-500" /> 
                        {info.spiciness === 'HOT' ? tr('menu_item.spiciness_hot') : tr('menu_item.spiciness_medium')}
                     </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span style={{ color: baseColor }} className="text-2xl font-black tracking-tighter">
                   {info.basePrice || Math.min(...info.variants?.map((v: any) => v.price))} {currencySymbol}
                </span>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 font-medium">
              {t(info.description)}
            </p>

            {/* Variants Section */}
            {info.variants?.length > 0 && (
              <div className="mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4">{tr('menu_item.choose_size')}</h4>
                <div className="grid grid-cols-1 gap-3">
                  {info.variants.map((variant: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50">
                      <span className="font-bold text-black">{t(variant.label)}</span>
                      <span className="font-black text-black">{variant.price} {currencySymbol}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens Section */}
            {info.allergens?.length > 0 && (
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4">{tr('menu_page.edit_form.alergens')}</h4>
                <div className="flex flex-wrap gap-3">
                  {info.allergens.map((algId: string) => {
                    const allergen = ALLERGENS.find(a => a.id === algId);
                    return allergen ? (
                      <div key={algId} className="flex items-center gap-2 bg-blue-50/50 border border-blue-100 px-4 py-2 rounded-2xl">
                        <span className="text-xl">{allergen.icon}</span>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-tight">{t(allergen.label)}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};