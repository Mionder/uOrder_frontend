'use client'
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageSwitcher = ({ languages }: { languages?: string[] }) => {
  const { language, setLanguage, profileLanguages } = useLanguage();

  // Використовуємо або передані мови, або мови з профілю
  const availableLanguages = languages || profileLanguages || [];

  if (availableLanguages.length <= 1) return null; // Не показуємо, якщо мова лише одна

  return (
    <div className="flex items-center gap-2">
      <div className="flex p-1 bg-gray-100/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm">
        {availableLanguages.map((lang: string) => {
          const isActive = language === lang;
          
          return (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`
                relative px-4 py-1.5 text-xs font-bold uppercase transition-all duration-200 rounded-md
                ${isActive 
                  ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }
              `}
            >
              {lang}
              {/* Маленька крапка-індикатор для активної мови (опційно) */}
              {isActive && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Декоративна іконка глобуса (опційно) */}
      <Globe size={16} className="text-gray-400 ml-1 hidden sm:block" />
    </div>
  );
};