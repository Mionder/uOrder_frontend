'use client'

import { refreshMenu } from '@/actions';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ALLERGENS, SPICINESS_LEVELS } from "@/config/menu-constants";

export default function CreateMenuItemForm({ categories, setShowCreateModal, slug }: any) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [hasVariants, setHasVariants] = useState(false);
  const { tr, t } = useLanguage();
  
  // Стан для варіантів: масив об'єктів з локалізованими мітками та ціною
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [spiciness, setSpiciness] = useState('NONE');
  const [variants, setVariants] = useState([{ id: Date.now(), label: {}, price: '' }]);
  
  const { token } = useAuth();
  const { profileLanguages, language } = useLanguage();

  const addVariant = () => {
    setVariants([...variants, { id: Date.now(), label: {}, price: '' }]);
  };

  const toggleAllergen = (id: string) => {
        setSelectedAllergens(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
    };

  const removeVariant = (id: number) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  const updateVariant = (id: number, field: string, value: any, lang?: string) => {
    setVariants(variants.map(v => {
      if (v.id === id) {
        if (lang) {
          return { ...v, label: { ...v.label, [lang]: value } };
        }
        return { ...v, [field]: value };
      }
      return v;
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('image_file');

    try {
      let url = '';
      if (imageFile && (imageFile as File).size > 0) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        const uploadRes = await fetch('http://localhost:3000/v1/admin/menu/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: uploadData,
        });
        const resJson = await uploadRes.json();
        url = resJson.url;
      }

      const name: Record<string, any> = {};
      const description: Record<string, any> = {};
      profileLanguages.forEach((lang: string) => {
        name[lang] = formData.get(`name_${lang}`);
        description[lang] = formData.get(`desc_${lang}`);
      });

      // Формуємо об'єкт варіантів для відправки
      const formattedVariants = hasVariants 
        ? variants.map(v => ({ label: v.label, price: Number(v.price) }))
        : [];

      const menuItemData = {
        name,
        description,
        categoryId: formData.get('categoryId'),
        image: url,
        spiciness,
        allergens: selectedAllergens,
        // Якщо є варіанти, basePrice може бути null або ціною першого варіанту
        basePrice: !hasVariants ? Number(formData.get('basePrice')) : null,
        variants: formattedVariants,
        tenant: { connect: { id: 'temp' } }
      };

      const res = await fetch('http://localhost:3000/v1/admin/menu', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(menuItemData),
      });

      if (res.ok) {
        alert('Страву створено!');
        await refreshMenu(slug);
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error("Помилка:", error);
      alert('Щось пішло не так');
    } finally {
      setLoading(false);
    }
  };

  console.log('categories', categories, t(categories[0].name));

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl p-6 bg-white rounded-xl shadow-xl space-y-6 overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-black text-gray-800 border-b pb-4">{tr('menu_page.add_form.title')}</h2>

      {/* Назви */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profileLanguages.map((lang: string) => (
          <div key={`name_${lang}`}>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{tr('menu_page.edit_form.name_placeholder')} ({lang})</label>
            <input name={`name_${lang}`} required className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-black outline-none transition-all" placeholder="Dish name" />
          </div>
        ))}
      </div>

      {/* Перемикач варіантів */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
        <input 
          type="checkbox" 
          id="hasVariants" 
          checked={hasVariants} 
          onChange={(e) => setHasVariants(e.target.checked)}
          className="w-5 h-5 accent-black"
        />
        <label htmlFor="hasVariants" className="font-bold cursor-pointer">{tr('menu_page.add_form.variants_label')}</label>
      </div>

      {!hasVariants ? (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{tr('menu_page.edit_form.price_placeholder')}</label>
            <input name="basePrice" type="number" required={!hasVariants} className="w-full border-2 border-gray-100 rounded-xl p-3" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{tr('menu_page.edit_form.weight_label')}</label>
            <input name="weight" className="w-full border-2 border-gray-100 rounded-xl p-3" placeholder="300г" />
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-700">{tr('menu_page.edit_form.variants_list')}</h3>
            <button type="button" onClick={addVariant} className="flex items-center gap-1 text-sm bg-black text-white px-3 py-1 rounded-full font-medium">
              <Plus size={16} /> {tr('menu_page.edit_form.add_btn')}
            </button>
          </div>
          
          {variants.map((v, index) => (
            <div key={v.id} className="p-4 border-2 border-gray-50 rounded-2xl space-y-3 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profileLanguages.map((lang: string) => (
                  <div key={`${v.id}_${lang}`}>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">{tr('menu_page.add_form.label')} ({lang})</label>
                    <input 
                      placeholder={tr('menu_page.add_form.weight_placeholder')}
                      onChange={(e) => updateVariant(v.id, 'label', e.target.value, lang)}
                      required={hasVariants}
                      className="w-full border-b p-1 outline-none focus:border-black"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase">{tr('menu_page.add_form.variant_price')}</label>
                <input 
                  type="number"
                  placeholder={tr('menu_page.edit_form.price_placeholder')}
                  onChange={(e) => updateVariant(v.id, 'price', e.target.value)}
                  required={hasVariants}
                  className="w-full border-b p-1 outline-none focus:border-black"
                />
              </div>
              {variants.length > 1 && (
                <button type="button" onClick={() => removeVariant(v.id)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full hover:bg-red-200">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Категорія та Опис */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{tr('menu_page.edit_form.item_categories')}</label>
          <select name="categoryId" required className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-black transition-all appearance-none">
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{t(cat.name)}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileLanguages.map((lang: string) => (
            <div key={`desc_${lang}`}>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{tr('menu_page.edit_form.item_description')} ({lang})</label>
              <textarea name={`desc_${lang}`} className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-black" rows={2} />
            </div>
          ))}
        </div>
      </div>

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


                {/* Секція алергенів */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tr('menu_page.edit_form.alergens')}</label>
                    <div className="flex flex-wrap gap-2">
                        {ALLERGENS.map((allergen) => (
                            <button
                                key={allergen.id}
                                type="button"
                                onClick={() => toggleAllergen(allergen.id)}
                                className={`px-3 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 ${
                                    selectedAllergens.includes(allergen.id)
                                        ? "bg-blue-50 border-blue-200 text-blue-600"
                                        : "bg-white border-gray-100 text-gray-400"
                                }`}
                            >
                                <span>{allergen.icon}</span>
                                {allergen.label[language as keyof typeof allergen.label] || allergen.label['uk']}
                            </button>
                        ))}
                    </div>
                </div>
      {/* Фото */}
      <div className="border-2 border-dashed border-gray-200 p-6 text-center rounded-2xl hover:border-black transition-colors group">
        <label className="cursor-pointer block">
          <span className="text-gray-400 group-hover:text-black font-medium">{tr('menu_page.add_form.add_photo')}</span>
          <input name="image_file" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        {preview && <img src={preview} alt="Preview" className="mt-4 h-40 mx-auto rounded-2xl shadow-lg object-cover" />}
      </div>

      <div className="flex gap-3 pt-4">
        <button 
          type="button"
          onClick={() => setShowCreateModal(false)}
          className="flex-1 border-2 border-gray-100 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all"
        >
          {tr('menu_page.add_form.cancel')}
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="flex-[2] bg-black text-white font-bold py-4 rounded-2xl hover:opacity-90 disabled:bg-gray-300 transition-all shadow-lg shadow-black/20"
        >
          {loading ? tr('menu_page.edit_form.save_loading') : tr('menu_page.edit_form.save')}
        </button>
      </div>
    </form>
  );
}