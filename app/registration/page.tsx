// src/app/register/page.tsx
'use client';
import { LanguageSwitcher } from "@/components/language-switcher";
import RegistrationStepper from "@/components/registration/stepper";
import { useLanguage } from "@/context/LanguageContext";
import { Utensils } from "lucide-react";

export default function RegistrationPage() {
  const { tr } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 relative overflow-hidden">
      <div className="absolute right-3 top-3 md:right-8 md:top-8 z-99">
        <LanguageSwitcher languages={['pl', 'uk', 'en']} />
      </div>
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px]" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 text-white mb-4 shadow-lg">
            <Utensils size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{tr('registration_page.title')}</h1>
          <p className="text-gray-500 mt-2">{tr('registration_page.subtitle')}</p>
        </div>

        <RegistrationStepper />
      </div>
    </div>
  )
}