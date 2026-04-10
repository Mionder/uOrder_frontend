'use client'
import { useState } from "react";
import { Save, X, Trash2, Image as ImageIcon, Plus, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ALLERGENS, SPICINESS_LEVELS } from "@/config/menu-constants";

export const EditMenuItemForm = ({ item, categories, onSave, onClose, onDelete }: any) => {
    const [loading, setLoading] = useState(false);
    const { language, profileLanguages, tr } = useLanguage();
    const [activeTab, setActiveTab] = useState(profileLanguages[0] || 'uk');

    // Стан для варіантів (ініціалізуємо існуючими або пустим масивом)
    const [hasVariants, setHasVariants] = useState(item.variants && item.variants.length > 0);
    const [variants, setVariants] = useState(item.variants?.map((v: any) => ({
        ...v,
        tempId: v.id // використовуємо id з бази як ключ
    })) || []);

    const [selectedAllergens, setSelectedAllergens] = useState(item.allergens || []);
    const [spiciness, setSpiciness] = useState(item.spiciness || 'NONE');

    const toggleAllergen = (id: string) => {
    setSelectedAllergens((prev: string[]) => 
        prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
    };

    const addVariant = () => {
        setVariants([...variants, { tempId: Date.now(), label: {}, price: '' }]);
    };

    const removeVariant = (tempId: any) => {
        setVariants(variants.filter((v: any) => v.tempId !== tempId));
    };

    const updateVariant = (tempId: any, field: string, value: any, lang?: string) => {
        setVariants(variants.map((v: any) => {
            if (v.tempId === tempId) {
                if (lang) {
                    return { ...v, label: { ...v.label, [lang]: value } };
                }
                return { ...v, [field]: value };
            }
            return v;
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        
        const name: any = {};
        const description: any = {};
        profileLanguages.forEach((lang: string) => {
            name[lang] = formData.get(`name_${lang}`);
            description[lang] = formData.get(`description_${lang}`);
        });

        const updateData = {
            id: item.id,
            name,
            description,
            weight: formData.get('weight'),
            categoryId: formData.get('categoryId'),
            isAvailable: formData.get('isAvailable') === 'on',
            // Якщо варіанти вимкнені — беремо basePrice, якщо увімкнені — передаємо масив
            basePrice: !hasVariants ? Number(formData.get('basePrice')) : null,
            spiciness,
            allergens: selectedAllergens,
            variants: hasVariants ? variants.map((v: any) => ({
                label: v.label,
                price: Number(v.price)
            })) : []
        };

        await onSave(item.id, updateData);
        setLoading(false);
        onClose();
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-2xl border-l border-gray-100 w-full max-w-md animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{tr('menu_page.edit_form.title')}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-black">ID: {item.id.slice(-8)}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-100">
                    <X size={20} className="text-gray-400" />
                </button>
            </div>

            <form id="edit-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
                {/* Фото */}
                <div className="flex justify-center">
                    <div className="relative group w-40 h-40">
                        <img 
                            src={item.image || 'https://blocks.astratic.com/img/general-img-square.png'} 
                            className="w-full h-full object-cover rounded-[2.5rem] border-4 border-gray-50 shadow-md"
                            alt="" 
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                            <ImageIcon className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                {/* Статус наявності */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <label htmlFor="available" className="text-sm font-bold text-gray-700">{tr('menu_page.edit_form.available')}</label>
                    <input 
                        type="checkbox" 
                        name="isAvailable" 
                        defaultChecked={item.isAvailable} 
                        id="available" 
                        className="w-6 h-6 rounded-lg accent-black" 
                    />
                </div>

                {/* Логіка ціни та варіантів */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <input 
                            type="checkbox" 
                            id="hasVariants" 
                            checked={hasVariants} 
                            onChange={(e) => setHasVariants(e.target.checked)}
                            className="w-4 h-4 accent-black"
                        />
                        <label htmlFor="hasVariants" className="text-sm font-bold text-gray-900">{tr('menu_page.edit_form.variant_label')}</label>
                    </div>

                    {!hasVariants ? (
                        <div>
                            <div className="space-y-1.5 animate-in fade-in zoom-in-95">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">{tr('menu_page.edit_form.stable_price_label')}</label>
                                <input 
                                    name="basePrice" 
                                    type="number" 
                                    defaultValue={item.basePrice}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-bold focus:bg-white focus:border-black outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5 animate-in fade-in zoom-in-95">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">{tr('menu_page.edit_form.weight_label')}</label>
                                <input 
                                    name="weight" 
                                    type="text" 
                                    defaultValue={item.weight}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-bold focus:bg-white focus:border-black outline-none transition-all"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3 animate-in fade-in zoom-in-95">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-gray-400 ml-1">{tr('menu_page.edit_form.variants_list')}</span>
                                <button type="button" onClick={addVariant} className="text-xs bg-black text-white px-3 py-1 rounded-full flex items-center gap-1">
                                    <Plus size={14} /> {tr('menu_page.edit_form.add_btn')}
                                </button>
                            </div>
                            {variants.map((v: any) => (
                                <div key={v.tempId} className="p-4 border border-gray-100 rounded-2xl space-y-3 relative bg-gray-50/50">
                                    <div className="grid grid-cols-2 gap-2">
                                        {profileLanguages.map((lang: string) => (
                                            <div key={lang}>
                                                <input 
                                                    placeholder={`${tr('menu_page.edit_form.name_placeholder')} (${lang})`}
                                                    defaultValue={v.label?.[lang]}
                                                    onChange={(e) => updateVariant(v.tempId, 'label', e.target.value, lang)}
                                                    className="w-full text-xs p-2 bg-transparent border-b border-gray-200 outline-none focus:border-black"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <input 
                                        type="number"
                                        placeholder={tr('menu_page.edit_form.price_placeholder')}
                                        defaultValue={v.price}
                                        onChange={(e) => updateVariant(v.tempId, 'price', e.target.value)}
                                        className="w-full text-sm p-2 bg-transparent border-b border-gray-200 outline-none focus:border-black font-bold"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => removeVariant(v.tempId)}
                                        className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Таби мов */}
                <div className="space-y-4 pt-4">
                    <div className="flex border-b border-gray-100 gap-4">
                        {profileLanguages.map((lang: string) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setActiveTab(lang)}
                                className={`pb-2 px-1 text-xs font-black transition-all relative uppercase ${
                                    activeTab === lang ? "text-black" : "text-gray-300"
                                }`}
                            >
                                {lang}
                                {activeTab === lang && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />}
                            </button>
                        ))}
                    </div>

                    {profileLanguages.map((lang: string) => (
                        <div key={lang} className={activeTab === lang ? "space-y-4 animate-in fade-in duration-300" : "hidden"}>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase">{tr('menu_page.edit_form.item_name')}</label>
                                <input 
                                    name={`name_${lang}`}
                                    defaultValue={item.name[lang]}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-black transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase">{tr('menu_page.edit_form.item_description')}</label>
                                <textarea 
                                    name={`description_${lang}`}
                                    defaultValue={item.description?.[lang]}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-black transition-all resize-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Категорія */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase">{tr('menu_page.edit_form.item_categories')}</label>
                    <div className="relative">
                        <select 
                            name="categoryId" 
                            defaultValue={item.categoryId}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none appearance-none font-bold"
                        >
                            {categories.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>{cat.name[language] || cat.name['uk']}</option>
                            ))}
                        </select>
                        <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 space-y-3">
                
                {/* Гострота */}
                    <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tr('menu_page.edit_form.spiciness')}</label>
                    <div className="flex gap-2">
                        {SPICINESS_LEVELS.map((level) => (
                        <button
                            key={level.id}
                            type="button"
                            onClick={() => setSpiciness(level.id)}
                            className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                            spiciness === level.id 
                                ? "border-black bg-black text-white" 
                                : "border-gray-50 bg-gray-50 text-gray-400"
                            }`}
                        >
                            {level.label[language as keyof typeof level.label] || level.label['uk']}
                        </button>
                        ))}
                    </div>
                    </div>

                    {/* Алергени */}
                    <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tr('menu_page.edit_form.alergens')}</label>
                    <div className="flex flex-wrap gap-2">
                        {ALLERGENS.map((allergen) => {
                        const isSelected = selectedAllergens.includes(allergen.id);
                        return (
                            <button
                            key={allergen.id}
                            type="button"
                            onClick={() => toggleAllergen(allergen.id)}
                            className={`px-3 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 ${
                                isSelected 
                                ? "bg-blue-50 border-blue-200 text-blue-600 shadow-sm" 
                                : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"
                            }`}
                            >
                            <span>{allergen.icon}</span>
                            {allergen.label[language as keyof typeof allergen.label] || allergen.label['uk']}
                            </button>
                        );
                        })}
                    </div>
                    </div>
                
                <button 
                    type="submit" 
                    form="edit-form"
                    disabled={loading}
                    className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10"
                >
                    {loading ? tr('menu_page.edit_form.save_loading') : <><Save size={18} /> {tr('menu_page.edit_form.save')}</>}
                </button>
                
                <button 
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="w-full py-2 text-red-400 text-xs font-bold hover:text-red-600 transition-all uppercase tracking-widest"
                >
                    {tr('menu_page.edit_form.delete')}
                </button>
            </div>
                </div>

                
            </form>

            {/* Sticky Actions */}
            
        </div>
    );
};