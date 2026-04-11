'use client'
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import landingData from "@/locales/landing.json";
import { Check, Star, Mail, Phone, MapPin, Globe, ChevronDown, Plus, Minus } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DemoModal } from '@/components/demo-modal';

export default function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState<boolean>(false);
  const router = useRouter();
  
  // Типізація для безпечного доступу
  const content = landingData[language as keyof typeof landingData] || landingData['uk'];

const calculateYearlyPrice = (basePrice: number) => {
    return Math.round((basePrice * 12) * 0.8);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {
        showDemo && (
          <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
        )
      }
      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black italic tracking-tighter">uOrder.</div>
          
          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {['uk', 'en', 'pl'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                    language === lang ? "bg-white shadow-sm text-black" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <button onClick={() => router.push('/admin')} className="text-sm cursor-pointer font-bold bg-black text-white px-5 py-2.5 rounded-xl hover:opacity-80 transition-all">
              Login
            </button>
          </div>
        </div>
      </header>
      
{/* HERO SECTION WITH GRAPHIC ELEMENTS */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-orange-50/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] -z-10" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-black/5 bg-black/[0.02] text-[10px] font-black uppercase tracking-[2px]">
            Future of Horeca
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-[0.95]">
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            {content.hero.subtitle} <span className="text-black font-bold underline decoration-2 underline-offset-4"> uOrder.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => router.push('/registration')} className="w-full sm:w-auto bg-black cursor-pointer text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-black/20 hover:translate-y-[-2px] transition-all">
              {content.hero.button_try}
            </button>
            <button onClick={() => setShowDemo(true)} className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-lg border cursor-pointer border-gray-200 hover:bg-gray-50 transition-all">
              {content.hero.button_demo}
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-16 text-center uppercase tracking-widest">{content.features.title}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {content.features.items.map((item: any, i: number) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-black rounded-2xl mb-6 flex items-center justify-center text-white">
                  <Star fill="white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* PRICING */}
      <section className="py-32 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter italic">{content.pricing.title}</h2>
          
          {/* Toggle Billing */}
          <div className="inline-flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billingCycle === 'monthly' ? "bg-white shadow-md" : "text-gray-400"}`}
            >
              {content.pricing.monthly}
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? "bg-white shadow-md text-black" : "text-gray-400"}`}
            >
              {content.pricing.yearly}
              <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded-md">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {Object.entries(content.pricing.plans).map(([key, plan]: [string, any]) => {
            const isBase = key === 'base';
            const price = billingCycle === 'monthly' ? plan.price : calculateYearlyPrice(plan.price);
            
            return (
              <div key={key} className={`relative p-10 rounded-[3rem] border-2 transition-all duration-500 ${isBase ? 'border-black bg-white shadow-2xl z-10 scale-105' : 'border-gray-100 hover:border-gray-300'}`}>
                {isBase && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Most Popular</div>}
                
                <h3 className="text-xl font-black mb-1 uppercase tracking-tighter">{plan.name}</h3>
                <div className="mb-10">
                  <span className="text-5xl font-black tracking-tighter">
                    {content.pricing.currency}{price}
                  </span>
                  <span className="text-gray-400 font-bold ml-1 text-sm italic">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>

                <ul className="space-y-4 mb-12">
                  {plan.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-500">
                      <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center"><Check size={12} className="text-black" /></div>
                      {f}
                    </li>
                  ))}
                </ul>

                <button onClick={() => router.push('/registration')} className={`w-full py-4 cursor-pointer rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${isBase ? 'bg-black text-white hover:bg-zinc-800' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Get Started
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-16 text-center tracking-tighter italic uppercase">{content.faqs.title}</h2>
          <div className="space-y-4">
            {content.faqs.items.map((faq: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold"
                >
                  {faq.q}
                  {openFaq === i ? <Minus size={18}/> : <Plus size={18}/>}
                </button>
                <div className={`px-6 transition-all duration-300 ease-in-out ${openFaq === i ? "pb-6 max-h-40" : "max-h-0 opacity-0"}`}>
                  <p className="text-gray-500 leading-relaxed text-sm">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* REVIEWS (Fake) */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-16 text-center uppercase tracking-widest">{content.reviews.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.reviews.items.map((rev: any, i: number) => (
              <div key={i} className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800">
                <p className="text-xl italic mb-6">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-700 rounded-full" />
                  <div>
                    <div className="font-bold">{rev.name}</div>
                    <div className="text-sm text-zinc-500">{rev.author}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
<footer className="py-20 px-6 border-t border-gray-100 bg-white">
  <div className="max-w-6xl mx-auto flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-12">
    {/* Лого та Слоган */}
    <div className="col-span-2 md:col-span-1">
      <div className="text-2xl font-black mb-6 italic tracking-tighter">uOrder.</div>
      <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
        {content.footer.slogan}
      </p>
      
      {/* Логотипи платіжних систем (Обов'язково для Fondy/Visa/MC) */}
      <div className="flex items-center gap-4 mt-8 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg/250px-Visa_Inc._logo_%282021%E2%80%93present%29.svg.png" alt="Visa" className="h-4" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
      </div>
    </div>

    {/* Контакти */}
    <div className="space-y-4">
      <h4 className="font-black uppercase text-[10px] tracking-[2px] text-gray-300">
        {content.footer.contacts}
      </h4>
      <div className="flex items-center gap-3 text-sm font-bold hover:text-gray-500 transition-colors cursor-pointer">
        <Mail size={16} strokeWidth={2.5}/> uorder.app.menu@gmail.com
      </div>
      <div className="flex items-center gap-3 text-sm font-bold hover:text-gray-500 transition-colors cursor-pointer">
        <Phone size={16} strokeWidth={2.5}/> +380 93 783 06 15
      </div>
    </div>

    {/* Юридична інформація (Legal) */}
    <div className="space-y-4">
      <h4 className="font-black uppercase text-[10px] tracking-[2px] text-gray-300">Legal</h4>
      <nav className="flex flex-col gap-3">
        <Link href="/terms" className="text-sm font-bold hover:underline decoration-2 underline-offset-4">
          Terms of Service
        </Link>
        <Link href="/privacy" className="text-sm font-bold hover:underline decoration-2 underline-offset-4">
          Privacy Policy
        </Link>
        <Link href="/refund" className="text-sm font-bold hover:underline decoration-2 underline-offset-4">
          Refund Policy
        </Link>
      </nav>
    </div>

    {/* Локація */}
    <div className="space-y-4">
      <h4 className="font-black uppercase text-[10px] tracking-[2px] text-gray-300">
        {content.footer.location}
      </h4>
      <div className="flex items-start gap-3 text-sm font-bold leading-tight">
        <MapPin size={16} className="shrink-0" strokeWidth={2.5}/> 
        <span>{content.footer.location_value}</span>
      </div>
    </div>
  </div>

  <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
    <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
      © 2026 uOrder system. Developed by FOP Oliinyk S.O.
    </div>
    <div className="text-[10px] font-bold text-gray-200 uppercase tracking-tight">
      All rights reserved.
    </div>
  </div>
</footer>
    </div>
  );
}