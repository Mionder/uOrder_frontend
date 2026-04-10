'use client';
import { useLanguage } from "@/context/LanguageContext";
import { LikeButton } from "../admin/dashboard/menu/like-button";
import { ALLERGENS } from "@/config/menu-constants";
import { Flame, Info } from "lucide-react";

export const MenuItem = ({ info, baseColor }: any) => {
  const { t, tr } = useLanguage();
  
  const renderPrice = () => {
    return info.variants?.length > 0 ? 
      Math.min(...info.variants.map((v: any) => v.price)) 
      : info.basePrice;
  };

  return (
    <div className="w-full px-4 mb-4">
      <div className="bg-white rounded-4xl p-4 border border-gray-100 shadow-soft flex gap-5 items-stretch transition-all active:scale-[0.98]">
        
        {/* Фото-блок */}
        <div className="relative w-[115px] h-[115px] shrink-0">
          <img 
            className="w-full h-full rounded-3xl object-cover shadow-sm bg-gray-50" 
            src={info.image || 'https://blocks.astratic.com/img/general-img-square.png'} 
            alt={t(info.name)} 
            loading="lazy"
          />
          <div className="absolute -top-1.5 -left-1.5 scale-[0.8] bg-white/80 backdrop-blur-md rounded-full shadow-md border border-white/50">
            <LikeButton item={info} />
          </div>
        </div>

        {/* Текстовий блок */}
        <div className="flex-1 flex flex-col pt-1">
          <div className="flex items-start gap-1.5 mb-1.5">
            <h3 className="text-[17px] font-extrabold leading-none text-black tracking-tighter">
              {t(info.name)}
            </h3>
            <div className="flex shrink-0 mt-0.5">
              {info.spiciness === 'MEDIUM' && (
                <Flame size={14} className="text-orange-500 fill-orange-500" />
              )}
              {info.spiciness === 'HOT' && (
                <div className="flex">
                  <Flame size={14} className="text-red-500 fill-red-500" />
                  <Flame size={14} className="text-red-500 fill-red-500 -ml-1.5" />
                </div>
              )}
            </div>
          </div>

          <p className="text-[13px] text-gray-500 leading-[1.4] line-clamp-2 mb-3 font-medium tracking-tight">
            {t(info.description)}
          </p>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col gap-2.5">
              
              {/* Покращені Алергени */}
              {info.allergens?.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center">
                  {info.allergens.map((algId: string) => {
                    const allergen = ALLERGENS.find(a => a.id === algId);
                    return allergen ? (
                      <div 
                        key={algId} 
                        className="group relative flex cursor-pointer items-center bg-gray-50 px-1.5 py-0.5 rounded-lg border border-gray-100"
                        title={t(allergen.label)} // На десктопі покаже стандартний тултіп
                      >
                        <span className="text-[13px]">{allergen.icon}</span>
                        {/* Текст з'являється поруч, якщо алергенів мало, або при наведенні */}
                        <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 text-[9px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap ml-0 group-hover:ml-1">
                          {t(allergen.label)}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
              
              <div 
                style={{ color: baseColor }} 
                className="text-[20px] font-extrabold leading-none tracking-tighter flex items-baseline gap-0.5"
              >
                {info.variants?.length > 0 && (
                  <span className="text-[9px] uppercase font-black text-gray-300 tracking-widest mr-0.5">{tr('menu_item.from')}</span>
                )}
                {renderPrice()}
                <span className="text-[12px] font-black ml-0.5 uppercase">₴</span>
              </div>
            </div>

            {
              info.weight && (
              <div className="text-[10px] font-extrabold text-black bg-gray-100 px-2.5 py-1.5 rounded-xl uppercase tracking-widest">
                {info.weight}
              </div>
              )
            }
            
          </div>
        </div>
      </div>
    </div>
  )
}