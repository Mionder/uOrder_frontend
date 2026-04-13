'use client'
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../admin/dashboard/menu/hooks/use-cart";

export const CategoriesList = ({ categories, refs, tenant, activeCategoryId, className, isCartOpen, setIsCartOpen }: any) => {
    const { t } = useLanguage();
    const cartItems = useCart(state => state.items);
    
/*
const scrollToCategory = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 100; // Висота твого хедера
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};
*/

const scrollToCategory = (categoryId: string) => {
  const element = refs.current[categoryId]; // Шукаємо саме в refs
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // Якщо refs ще не прокинулись, спробуємо по нативному ID
    document.getElementById(categoryId)?.scrollIntoView({ behavior: 'smooth' });
  }
};

    return (
        <div className={`sticky top-0 z-99 left-0 px-4 w-full border-b ${className}`}>
            <div className="overflow-hidden pt-2 pb-4 bg-white">
<header className="flex gap-3 p-4 text-center mt-1 items-start justify-between">
  <div className="flex gap-3">
    {tenant.logo && (
      <img 
        src={tenant.logo} 
        alt={tenant.slug} 
        className="max-w-[80px] max-h-[80px] w-full h-auto rounded-[12px] object-cover" 
      />
    )}
    <div className="flex flex-col gap-1 items-start">
      <h1 className="text-2xl font-black italic tracking-tighter leading-none">{tenant.name}</h1>
      <p className="text-gray-500 text-left text-xs max-w-[180px] leading-tight">
        {t(tenant.description)}
      </p>
    </div>
  </div>

  {/* Кнопка кошика */}
  <button 
    onClick={() => setIsCartOpen(true)}
    className="relative p-3 bg-gray-100 rounded-2xl active:scale-90 transition-all"
  >
    <ShoppingBag size={24} className="text-black" />
    {cartItems.length > 0 && (
      <span 
        style={{ backgroundColor: tenant.mainColor }}
        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-white"
      >
        {cartItems.length}
      </span>
    )}
  </button>
</header>
                    { 
                        categories.length > 1 && (
                            <div className="flex max-w-[1280px] max-h-[40px] w-full">
                                {/* Список категорій зі скролом, якщо їх багато */}
                                <div className="flex overflow-x-auto w-full no-scrollbar gap-6 pb-3 pt-1">
                                {categories.map((category: any) => {
                                    const isActive = activeCategoryId === category.id;
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