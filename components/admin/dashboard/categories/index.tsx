'use client'
import { useState } from "react";
import { AddCategoryForm } from "./add-category-form";
import { deleteCategoryRequest } from "./delete-category-service";
import { useLanguage } from "@/context/LanguageContext";
import { Trash2, Plus, Layers, ChevronRight } from "lucide-react";
import { refreshMenu } from "@/actions";
import { useAuth } from "@/context/AuthContext";

export const CategoriesAdmin = ({ categories: initialCategories, profile }: any) => {
    const { t, tr } = useLanguage();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categories, setCategories] = useState(initialCategories);
    const { token } = useAuth();

    const handleDelete = async (id: string) => {
        if (!confirm("Ви впевнені, що хочете видалити цю категорію?")) return;
        const res = await deleteCategoryRequest(id, token || '');
        if (res) {
            setCategories(categories.filter((c: any) => c.id !== id));
            await refreshMenu(profile.slug);
        }
    };

    return (
        <div className="mx-auto max-w-4xl p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{tr('categories_page.title')}</h1>
                    <p className="text-gray-500 text-sm">{tr('categories_page.subtitle')}</p>
                </div>
                <button 
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="flex items-center max-w-[220px] md:max-w-auto gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
                >
                    {isFormOpen ? tr('categories_page.close') : <><Plus size={18} /> {tr('categories_page.add_button')}</>}
                </button>
            </div>

            {isFormOpen && (
                <div className="mb-10 p-6 bg-white border rounded-xl shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold mb-4">{tr('categories_page.create_title')}</h2>
                    <AddCategoryForm 
                        categoriesAmount={categories.length} 
                        lang={profile.languages} 
                        onSuccess={() => setIsFormOpen(false)}
                        slug={profile.slug}
                    />
                </div>
            )}

            <div className="grid gap-3">
                {categories.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed rounded-xl">
                        <Layers className="mx-auto text-gray-300 mb-2" size={40} />
                        <p className="text-gray-500">{tr('categories_page.empty_state')}</p>
                    </div>
                ) : (
                    categories.map((category: any) => (
                        <div key={category.id} className="group flex items-center justify-between p-4 bg-white border rounded-xl hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                    <Layers size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{t(category.name)}</h3>
                                    <p className="text-xs text-gray-400 font-mono">slug: {category.slug}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => handleDelete(category.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title={tr('categories_page.delete')}
                                >
                                    <Trash2 size={18} />
                                </button>
                                <ChevronRight size={18} className="text-gray-300" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}