'use client'
import { useState } from "react";
import { MapPin, AlignLeft, Phone, Save, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export const ContactsStep = ({ selectedLangs, token, onNext }: any) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { tr } = useLanguage();

    const saveFullProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        
        // Формуємо об'єкти для локалізованих полів
        const address: Record<string, string> = {};
        const description: Record<string, string> = {};
        
        selectedLangs.forEach((lang: string) => {
            address[lang] = formData.get(`address_${lang}`) as string;
            description[lang] = formData.get(`desc_${lang}`) as string;
        });

        const updateData = {
            address, // { uk: "...", en: "..." }
            description,
            phone: formData.get('phone'),
        };

        try {
            const res = await fetch('http://localhost:3000/v1/admin/tenant/settings', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData),
            });

            if (res.ok) {
                // Після успішного завершення відправляємо в дашборд
                onNext();
                //router.push('/admin/dashboard');
            }
        } catch (err) {
            console.error("Помилка збереження:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={saveFullProfile} className="space-y-8">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">{tr('registration_page.contacts_step.title')}</h2>
                    <p className="text-gray-500 text-sm">{tr('registration_page.contacts_step.subtitle')}</p>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                    <CheckCircle2 size={24} />
                </div>
            </div>

            {/* Загальний телефон для всіх мов */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">{tr('registration_page.contacts_step.phone')}</label>
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        name="phone" 
                        type="tel"
                        placeholder="+380 (__) ___ __ __" 
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="space-y-6">
                {selectedLangs.map((langCode: string) => (
                    <div key={langCode} className="relative p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 space-y-4">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-tighter rounded-full shadow-sm">
                            {tr('registration_page.contacts_step.locale')} {langCode}
                        </div>

                        <div className="space-y-1.5 pt-2">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input 
                                    name={`address_${langCode}`} 
                                    placeholder={`${tr('registration_page.contacts_step.address')} (${langCode})`} 
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="relative">
                                <AlignLeft className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <textarea 
                                    name={`desc_${langCode}`} 
                                    rows={3}
                                    placeholder={`${tr('registration_page.contacts_step.description_first')} (${langCode}) — ${tr('registration_page.contacts_step.description_second')}`} 
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="group w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-green-100 active:scale-[0.98] disabled:opacity-50"
            >
                {loading ? (
                    tr('registration_page.saving')
                ) : (
                    <>
                        {tr('registration_page.continue')}
                        <Save size={20} className="group-hover:translate-y-[-1px] transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
};