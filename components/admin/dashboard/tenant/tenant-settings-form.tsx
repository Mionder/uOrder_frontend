'use client'

import { refreshMenu } from '@/actions';
import QrGenerator from '@/components/qr-generator';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useEffect } from 'react';
import { Loader } from '../../ui/loader';

export default function TenantSettingsForm({ loading, setLoading, fetching, setFetching, profile, setProfile, logoPreview, setLogoPreview, token }: any) {
  // 1. Завантажуємо поточні дані при стартi
  const { profileLanguages, t, tr } = useLanguage();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const logoFile = formData.get('logo_file');
    if (!profile) return;
    let finalLogoUrl = profile.logo;

    try {
      const logoFile = formData.get('logo_file') as File | null;
      // 2. Якщо користувач вибрав новий файл лого - спочатку вантажимо його
      if (logoFile && logoFile instanceof File && logoFile.size > 0) {
        const uploadData = new FormData();
        uploadData.append('image', logoFile);

        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/tenant/logo`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: uploadData,
        });
        const uploadResult = await uploadRes.json();
        finalLogoUrl = uploadResult.url;
      }

      if (!formData) return;
      const slugValue = formData.get('slug') as string;
      const address: Record<string, any> = {};
      const description: Record<string, any> = {};
      const workingHours: Record<string, any> = {};
      profileLanguages.forEach((lang: any) => {
        address[lang] = formData.get(`address_${lang}`);
        description[lang] = formData.get(`desc_${lang}`);
        workingHours[lang] = formData.get(`hours_${lang}`);
      })
      // 3. Відправляємо PATCH запит з усіма даними
      const updateData = {
        name: formData.get('name_uk'),
        slug: (slugValue || '').toLowerCase().trim().replace(/\s+/g, '-'),
        logo: finalLogoUrl,
        mainColor: formData.get('mainColor') as string,
        phone: formData.get('phone') as string,
        description,
        address,
        workingHours,
        isActive: profile.isActive // зберігаємо поточний статус
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/tenant/settings`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
       // alert('Налаштування збережено!');
        await refreshMenu(slugValue);
      } else {
        const err = await res.json();
       // alert(`Помилка: ${err.message || 'Не вдалося оновити'}`);
      }
    } catch (error) {
      alert('Помилка мережі');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
        <div className="p-10 text-center"><Loader /></div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">{tr('tenant_settings.title')}</h1>
        
        {/* Секція Логотипа */}
        <div className="flex items-center space-x-6 pb-6 border-b">
          <div className="shrink-0">
            <img 
              src={logoPreview || 'https://via.placeholder.com/150?text=No+Logo'} 
              className="h-24 w-24 object-cover rounded-full border-2 border-gray-200" 
              alt="Logo" 
            />
          </div>
          <label className="block">
            <span className="sr-only">{tr('tenant_settings.change_logo')}</span>
            <input 
              type="file" 
              name="logo_file" 
              accept="image/*"
              onChange={(e: any) => e.target.files[0] && setLogoPreview(URL.createObjectURL(e.target.files[0]))}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </label>
        </div>

        {/* Назва закладу */}
        <div className="block gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{tr('tenant_settings.restaurant_name')}</label>
            <input 
              name="name_uk" 
              defaultValue={profile.name} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Унікальний Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{tr('tenant_settings.personal_link')}</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              uorder.app/
            </span>
            <input
              name="slug"
              defaultValue={profile.slug}
              required
              className="flex-1 block w-full border border-gray-300 rounded-none rounded-r-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="my-cool-restaurant"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">{tr('tenant_settings.slug_helper')}</p>
        </div>

        <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold text-lg">{tr('tenant_settings.branding_title')}</h3>
  
  {/* Вибір кольору */}
            <div>
              <label className="block text-sm font-medium">{tr('tenant_settings.color_label')}</label>
              <div className="mt-1 flex items-center space-x-3">
                <input 
                  name="mainColor" 
                  type="color" 
                  defaultValue={profile.mainColor || '#000000'} 
                  className="h-10 w-20 border rounded cursor-pointer" 
                />
                <span className="text-gray-500 text-sm">{tr('tenant_settings.color_helper')}</span>
              </div>
            </div>

          {
            profileLanguages.map((lang: any) => {
                return (
                    <div key={`desc_key_${lang}`}>
                        <label className="block text-sm font-medium">{tr('tenant_settings.description_label')} ({lang})</label>
                        <textarea name={`desc_${lang}`} className="w-full border rounded p-2" rows={2} />
                    </div>
                )
            })
          }

            {/* Номер телефону */}
            <div>
              <label className="block text-sm font-medium">{tr('tenant_settings.phone_label')}</label>
              <input 
                name="phone" 
                defaultValue={profile.phone} 
                placeholder="+380..." 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
              />
            </div>

            {/* Адреса (UA/EN) */}
            <div className={`grid grid-cols-1 md:grid-cols-${profileLanguages.length} gap-4`}>
              {
                profileLanguages.map((lang: any) => {
                  return (
                    <input key={`address_key_${lang}`} name={`address_${lang}`} defaultValue={t(profile.address)} placeholder={`${tr('tenant_settings.address_placeholder')} (${lang})`} className="border rounded p-2" />
                  )
                })
              }
            </div>
            

            <div className={`grid grid-cols-1 md:grid-cols-${profileLanguages.length} gap-4`}>
              { profileLanguages.map((lang: any) => {
                  return (
                    <input key={`hours_key_${lang}`} name={`hours_${lang}`} defaultValue={t(profile.workingHours)} placeholder={`${tr('tenant_settings.working_hours_placeholder')} (${lang})`} className="border rounded p-2" />
                  )
                })
              }
            </div>
            

            {/* Графік роботи (UA/EN) */}
            {/*
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="hours_uk" defaultValue={profile.workingHours?.uk} placeholder="Графік (UA)" className="border rounded p-2" />
              <input name="hours_en" defaultValue={profile.workingHours?.en} placeholder="Hours (EN)" className="border rounded p-2" />
            </div>
            */}
          </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? tr('tenant_settings.save_loading') : tr('tenant_settings.save')}
          </button>
        </div>
      </form>
            <QrGenerator restaurant={profile} token={token} />

    </div>
  );
}