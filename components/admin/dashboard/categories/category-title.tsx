'use client';

import { useLanguage } from "@/context/LanguageContext";

export const CategoryTitle = ({ color, category }: any) => {
    const { t } = useLanguage();
    
    return (
        <h4 style={{
                color: `${color}`
            }} className="font-bold text-xl p-4">{t(category.name)}</h4>
    )
}