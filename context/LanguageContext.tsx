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
  tr: (data: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>('uk');
  const { token } = useAuth();
  const [profileLanguages, setProfileLanguages] = useState<any>([]);

  const tr = (key: string) => {
    const keys = key.split('.');
    let result = translationsVariants[language];
    keys.forEach(k => {
      result = result ? result[k] : key;
    });
    return result || key;
  };

  useEffect(() => {
    if (!token) return;
    console.log('token_before_fetch', token);
    fetch('http://localhost:3000/v1/admin/tenant/language', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => {
            console.log('user_lang_data', data);
            setProfileLanguages(data.languages);
          })
          .catch(err => console.error("Помилка завантаження:", err));
  }, [token])

  // Хелпер для мультиязичних полів з бази (Json)
  const t = (data: any) => {
    if (!data) return '';
    return data[language] || data['uk'] || '';
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