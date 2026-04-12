'use client';
import { MenuItem } from "@/components/menu-item"
import { CategoryTitle } from "../categories/category-title"
import { useEffect, useRef, useState } from "react";
import { CategoriesList } from "@/components/categories-list";

export const CategoryAndMenu = ({ tenant }: any) => {
    const refs = useRef<any>({});
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    console.log('activeCategoryId', activeCategoryId);

    useEffect(() => {
      const hasVisited = sessionStorage.getItem(`v_${tenant.slug}`);
      
      if (!hasVisited) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/public/menu/${tenant.slug}/view`, { method: 'POST' });
        sessionStorage.setItem(`v_${tenant.slug}`, 'true');
      }
    }, [tenant.slug]);

    useEffect(() => {
    // Створюємо обсервер
    const observerOptions = {
      root: null, // стежимо відносно в'юпорту
      rootMargin: '-100px 0px -70% 0px', // спрацьовує, коли заголовок категорії у верхній частині екрану
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategoryId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Підключаємо обсервер до кожної секції категорії через ваші refs
    const currentRefs = refs.current;
    Object.values(currentRefs).forEach((ref: any) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // Очищення при розмонтуванні
      Object.values(currentRefs).forEach((ref: any) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [refs, tenant.categories]);

    return (
        <div className="w-full">
               <CategoriesList categories={tenant.categories} refs={refs} tenant={tenant} activeCategoryId={activeCategoryId} />

                {tenant.categories.map((category: any) => (
                  <section ref={(el) => {refs.current[category.id] = el}} id={category.slug} key={category.id}>
                    <CategoryTitle color={tenant.mainColor} category={category} /> 
                    <div className="space-y-4">
                      {category.items.map((item: any) => (
                        <MenuItem key={item.id} info={item} baseColor={tenant.mainColor} currency={tenant.currency} />
                      ))}
                    </div>
                  </section>
                ))}
        </div>
    )
}