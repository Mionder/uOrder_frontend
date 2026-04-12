'use client'
import { DEMO_DATA } from "./data";
import { MenuItem } from "@/components/menu-item";
import { CategoriesList } from "@/components/categories-list";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Clock, MapPin, Globe } from "lucide-react";

export default function DemoMenuPage() {
  const refs = useRef<any>({});
  const { t, setLanguage, language } = useLanguage();

  return (
    <main className="bg-white min-h-screen font-sans pb-[72px]">
      {/* Список категорій з підтримкою i18n об'єктів */}
      <CategoriesList 
        categories={DEMO_DATA.categories} 
        refs={refs} 
        tenant={DEMO_DATA} 
        className={'pt-5 md:pt-18'}
      />

      <div className="mt-8 space-y-12">
        {DEMO_DATA.categories.map((category) => (
          <section 
            key={category.id} 
            id={category.id}
            ref={(el: any) => (refs.current[category.id] = el)}
            className="scroll-mt-32"
          >
            {/* Заголовок категорії з використанням t() */}
            <div className="px-4 mb-6">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase text-black">
                {t(category.name)}
              </h2>
              <div 
                className="h-1.5 w-10 mt-1 rounded-full" 
                style={{ backgroundColor: DEMO_DATA.mainColor }} 
              />
            </div>

            {/* Список страв */}
            <div className="grid gap-2">
              {category.items.map((item) => (
                <MenuItem 
                  key={item.id} 
                  info={item} 
                  baseColor={DEMO_DATA.mainColor} 
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ФУТЕР МЕНЮ (Контакти та перемикач мов) */}
      <footer className="mt-20 px-6 py-12 bg-gray-50 rounded-t-[3rem] border-t border-gray-100">
        <div className="max-w-md mx-auto space-y-8">
          
          {/* Про ресторан */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-black italic tracking-tight uppercase">{DEMO_DATA.name}</h3>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              {t(DEMO_DATA.description)}
            </p>
          </div>

          {/* Інфо-блоки */}
          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                <Phone size={18} />
              </div>
              <a href={`tel:${DEMO_DATA.phone}`} className="font-bold text-sm text-black">{DEMO_DATA.phone}</a>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                <Clock size={18} />
              </div>
              <span className="font-bold text-sm text-black">{t(DEMO_DATA.workingHours)}</span>
            </div>
          </div>

          {/* Перемикач мов */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <Globe size={12} /> {t({ uk: "Оберіть мову", en: "Select language" })}
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {DEMO_DATA.languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-tight transition-all ${
                    language === lang 
                      ? "bg-white text-black shadow-sm" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Плашка Demo Mode */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[3px] shadow-2xl z-50 whitespace-nowrap border border-white/10 flex items-center gap-3">
        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        Demo Mode • uOrder 2026
      </div>
    </main>
  );
}