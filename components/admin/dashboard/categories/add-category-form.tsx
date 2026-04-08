'use client'
import { useState, useEffect } from "react";
import { useCategoryForm } from "./use-category-form";
import { useLanguage } from "@/context/LanguageContext";

export const AddCategoryForm = ({ categoriesAmount, lang, onSuccess }: any) => {
    const { createCategory, loading, error } = useCategoryForm();
    const { tr } = useLanguage();
    
    // Ініціалізуємо об'єкт name для всіх доступних мов
    const initialName = lang.reduce((acc: any, curr: string) => ({ ...acc, [curr]: "" }), {});

    const [form, setForm] = useState({
        name: initialName,
        slug: "",
        sortOrder: categoriesAmount + 1
    });

    // Авто-генерація слага з першої доступної мови (зазвичай uk)
    useEffect(() => {
        const primaryLang = lang[0];
        if (form.name[primaryLang]) {
            const generatedSlug = form.name[primaryLang]
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setForm(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [form.name[lang[0]]]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        if (keys.length === 2) {
            const [parent, child] = keys;
            setForm(prev => ({
                ...prev,
                [parent]: { ...(prev as any)[parent], [child]: value }
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await createCategory(form);
        if (res) {
            onSuccess?.();
            window.location.reload(); // або твій трігер рефетчу
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lang.map((langCode: string) => (
                    <div key={langCode} className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500 ml-1">
                            {tr('categories_page.create_form.name')} ({langCode})
                        </label>
                        <input 
                            name={`name.${langCode}`} 
                            required
                            placeholder={tr('categories_page.create_form.placeholder_name')}
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 ml-1">{tr('categories_page.create_form.slug')}</label>
                <input
                    name="slug"
                    value={form.slug}
                    type="text"
                    placeholder={tr('categories_page.create_form.placeholder_slug')}
                    className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 font-mono text-sm outline-none"
                    onChange={handleChange}
                />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                {error && <p className="text-red-500 text-sm mr-auto">{error}</p>}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {loading ? tr('categories_page.create_form.save') : tr('categories_page.create_form.create_button')}
                </button>
            </div>
        </form>
    );
}