'use client'
// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import uk from '@/locales/uk/common.json';
import en from '@/locales/en/common.json';
import pl from '@/locales/pl/common.json';
type Language = 'uk' | 'en';
const translationsVariants: any = { uk, en, pl };

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (data: any) => string; // Хелпер для виводу Json-полів (назва, опис)
  profileLanguages: string[];
  tr: (data: string, options?: { returnObjects?: boolean }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>('en');
  const { token } = useAuth();
  const [profileLanguages, setProfileLanguages] = useState<any>([]);

const tr = (key: string, options?: { returnObjects?: boolean }) => {
  const keys = key.split('.');
  let result: any = translationsVariants[language];

  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      result = key; // Якщо шлях не знайдено, повертаємо сам ключ
      break;
    }
  }

  // Якщо ми не просимо об'єкт і результат виявився масивом або об'єктом,
  // краще повернути ключ, щоб не "вистрелити в ногу" рендеру React
  if (!options?.returnObjects && typeof result !== 'string') {
    return key;
  }

  return result || key;
};

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/tenant/language`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => {
            setProfileLanguages(data.languages);
            setLanguage(data.languages[0]);
          })
          .catch(err => console.error("Помилка завантаження:", err));
  }, [token])

  // Хелпер для мультиязичних полів з бази (Json)
  const t = (data: any) => {
    if (!data) return '';
    return data[language] || data['en'] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, profileLanguages, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};