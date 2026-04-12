'use client';
import { useLanguage } from "@/context/LanguageContext";
import { Upload, Palette } from "lucide-react";
import { useState } from "react";

export const StepBranding = ({ onNext, token }: any) => {
     const [logoPreview, setLogoPreview] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { tr } = useLanguage();

     const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        let finalLogoUrl;

        const formData = new FormData(e.currentTarget);
        
        try {
            const logoFile = formData.get('logo_file') as File | null;
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

            const updateData = {
                logo: finalLogoUrl,
                mainColor: formData.get('mainColor') as string,
            }

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
                onNext();
            }
        } catch (err) {
            setLoading(false);
        }
     }
     
    return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-col items-center gap-6">
        <div className="relative group cursor-pointer">
          <img src={logoPreview || 'https://blocks.astratic.com/img/general-img-square.png'} className="w-32 h-32 rounded-[2rem] object-cover border-4 border-gray-50 shadow-md group-hover:opacity-80 transition-all" />
          <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <div className="bg-black/50 p-2 rounded-full text-white"><Upload size={20} /></div>
             <input type="file" name="logo_file" hidden onChange={(e: any) => e.target.files[0] && setLogoPreview(URL.createObjectURL(e.target.files[0]))} />
          </label>
        </div>
        <p className="text-sm text-gray-400">{tr('registration_page.branding_step.image_helper')}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-blue-600" />
          <h3 className="font-bold">{tr('registration_page.branding_step.color')}</h3>
        </div>
        <div className="flex items-center gap-4">
          <input name="mainColor" type="color" defaultValue="#2563eb" className="w-16 h-16 rounded-xl border-4 border-white shadow-sm cursor-pointer" />
          <p className="text-sm text-gray-500">{tr('registration_page.branding_step.color_helper')}</p>
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
        {loading ? tr('registration_page.saving') : tr('registration_page.continue')}
      </button>
    </form>
    )
}