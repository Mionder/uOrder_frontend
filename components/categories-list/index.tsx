'use client'
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

export const CategoriesList = ({ categories, refs, tenant, activeCategoryId, className }: any) => {
    const { t } = useLanguage();
    const scrollToCategory = (id: any) => {
        refs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
  };

    return (
        <div className={`sticky top-0 z-99 left-0 px-4 w-full border-b ${className}`}>
            <div className="overflow-hidden pt-2 pb-4 bg-white">
                    <header className="flex gap-3 p-4 text-center mt-1">
                        {tenant.logo && (
                            <img 
                                src={tenant.logo} 
                                alt={tenant.slug} 
                                className="max-w-[80px] max-h-[80px] w-full h-auto rounded-[12px]" 
                            />
                        )}
                        <div className="flex flex-col gap-2 items-start">
                            <h1 className="text-2xl font-black italic tracking-tighter">{tenant.name}</h1>
                            <p className="text-color-gray-500 text-sm max-w-[220px]">{t(tenant.description)}</p>
                        </div>
                        
                    </header>
                    { 
                        categories.length > 1 && (
                            <div className="flex max-w-[1280px] max-h-[40px] w-full">
                                {/* Список категорій зі скролом, якщо їх багато */}
                                <div className="flex overflow-x-auto w-full no-scrollbar gap-6 pb-3 pt-1">
                                {categories.map((category: any) => {
                                    const isActive = activeCategoryId === category.slug;
                                    return (
                                    <button 
                                        key={category.id} 
                                        onClick={() => scrollToCategory(category.id)} 
                                        className={`relative whitespace-nowrap text-sm font-black uppercase italic tracking-tighter transition-all duration-300`}
                                        style={{ color: `${isActive ? `${tenant.mainColor}` : 'black'}` }}
                                    >
                                        {t(category.name)}
                                        {/* Анімована лінія під активною категорією */}
                                        {/*
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${
                                        isActive ? "w-full" : "w-0"
                                        }`} 
                                        style={{ background: `${isActive ? `${tenant.mainColor}` : 'transparent'}`, width: `${isActive ? `100%` : '0'}` }}
                                        />
                                        */}
                                    </button>
                                    )
                                })}
                                </div>
                            </div>
                        )
                    }
                
            </div>
            
        </div>
    )
}