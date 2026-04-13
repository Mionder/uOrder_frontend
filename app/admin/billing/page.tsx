'use client'
import { useEffect, useState } from 'react';
import { Check, Zap, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/language-switcher';
import Cookies from 'js-cookie';

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<{plan: string, nextBillingDate: string | null}>({
    plan: 'FREE',
    nextBillingDate: null,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { tr, language } = useLanguage(); // Додаємо language для визначення валюти
  const token = Cookies.get('token');

  // Динамічне визначення валюти та цін
  const currencyData = {
    uk: { symbol: '₴', rate: 40, label: 'грн' }, // 1$ = 40 грн (приблизно)
    pl: { symbol: 'zł', rate: 4, label: 'zł' },  // 1$ = 4 zł
    en: { symbol: '$', rate: 1, label: 'usd' }
  }[language as 'uk' | 'pl' | 'en'] || { symbol: '$', rate: 1, label: 'usd' };

  const PLANS = [
    {
      id: 'FREE',
      name: 'Free',
      usdPrice: 0,
      features: tr('billing.plans.free.features', { returnObjects: true }) as unknown as string[] || [],
    },
    {
      id: 'BASIC',
      name: 'Base',
      usdPrice: 15,
      features: (tr('billing.plans.base.features', { returnObjects: true }) as unknown as string[]) || [],
      popular: true,
    },
    {
      id: 'PRO',
      name: 'Pro',
      usdPrice: 30,
      features: tr('billing.plans.pro.features', { returnObjects: true }) as unknown as string[] || [],
    },
  ];

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/tenant/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentSubscription({
            plan: data.plan || 'FREE',
            nextBillingDate: data.nextBillingDate || null
          });
        }
      } catch (error) {
        console.error("Failed to fetch tenant info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, []);

  const handleSubscribe = async (planId: string) => {
    if (planId === 'FREE' || planId === currentSubscription.plan) return;
    setLoadingPlan(planId);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/payments/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ 
          plan: planId,
          cycle: billingCycle,
          currency: currencyData.label.toUpperCase() === 'ГРН' ? 'UAH' : 
              currencyData.label.toUpperCase() === 'ZŁ' ? 'PLN' : 'USD'
        }),
      });

      if (!response.ok) throw new Error('Failed to create payment session');
      const data = await response.json();

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://secure.wayforpay.com/pay';
      form.acceptCharset = 'utf-8';

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = Array.isArray(value) ? value.join(';') : value?.toString() || '';
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (error) {
      console.error('Payment Error:', error);
      alert(tr('billing.payment_error'));
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-white">
      <div className="absolute right-3 top-3 md:right-8 md:top-8 z-[99]">
        <LanguageSwitcher languages={['pl', 'uk', 'en']} />
      </div>

      <button onClick={() => router.back()} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all mb-8">
        <ArrowLeft size={14} /> {tr('billing.back_button')}
      </button>

      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-2">{tr('billing.title')}</h1>
        <p className="text-gray-400 font-medium text-sm">{tr('billing.subtitle')} uOrder.</p>
      </header>

      {/* Поточний статус */}
      <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-6 md:p-10 mb-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-black/5">
            <Zap className={currentSubscription.plan === 'FREE' ? "text-gray-200" : "text-blue-600 fill-blue-600"} size={40} />
          </div>
          <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
              {tr('billing.current_plan')}
            </div>
            <div className="text-2xl font-black uppercase italic tracking-tight">
              {currentSubscription.plan}
            </div>
            {currentSubscription.nextBillingDate && (
              <div className="text-[9px] font-bold text-gray-400 mt-1">
                {tr('billing.next_payment')}: {new Date(currentSubscription.nextBillingDate).toLocaleDateString()}
              </div>
            )}         
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-10 border-gray-200 justify-center">
          <div className="text-center md:text-right">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{tr('billing.system_status')}</div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-wider border border-green-100">
              <ShieldCheck size={14} /> {tr('billing.status_active')}
            </div>
          </div>
        </div>
      </div>

      {/* Перемикач циклу */}
      <div className="flex justify-center mb-16">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center shadow-inner">
          <button onClick={() => setBillingCycle('monthly')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? "bg-white shadow-md text-black" : "text-gray-400"}`}>{tr('billing.month')}</button>
          <button onClick={() => setBillingCycle('yearly')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? "bg-white shadow-md text-black" : "text-gray-400"}`}>
            {tr('billing.year')} <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded-md">-20%</span>
          </button>
        </div>
      </div>

      {/* Картки планів */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {PLANS.map((plan) => {
          const isCurrent = currentSubscription.plan === plan.id;
          
          // Розрахунок ціни на основі валюти та циклу
          const basePrice = plan.usdPrice * currencyData.rate;
          const finalPrice = billingCycle === 'monthly' ? basePrice : Math.round((basePrice * 12) * 0.8);

          return (
            <div key={plan.id} className={`relative p-8 md:p-10 rounded-[3rem] border-2 transition-all duration-500 ${plan.popular ? 'border-black bg-white shadow-2xl md:-mt-4' : 'border-gray-100'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] whitespace-nowrap">{tr('billing.best_choice')}</div>
              )}
              <h3 className="text-2xl font-black uppercase italic mb-1 tracking-tighter">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-5xl font-black italic tracking-tighter">{currencyData.symbol}{finalPrice}</span>
                <span className="text-gray-400 font-bold text-xs ml-2 uppercase tracking-widest">
                   / {billingCycle === 'monthly' ? tr('billing.period_month') : tr('billing.period_year')}
                </span>
              </div>
              <ul className="space-y-5 mb-12 min-h-[180px]">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-500">
                    <Check size={18} className="text-black shrink-0" /> <span className="leading-tight">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled={isCurrent || loadingPlan !== null}
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-5 rounded-[1.5rem] font-black text-[10px] ${isCurrent || loadingPlan !== null ? 'cursor-not-allowed' : 'cursor-pointer'} uppercase tracking-[0.2em] transition-all active:scale-95 ${isCurrent ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-gray-900 shadow-xl shadow-black/10'}`}
              >
                {loadingPlan === plan.id ? <Clock className="animate-spin mx-auto" size={16} /> : isCurrent ? tr('billing.current_plan') : tr('billing.select_plan')}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <div className="flex items-center justify-center gap-6 opacity-30 grayscale mb-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg/250px-Visa_Inc._logo_%282021%E2%80%93present%29.svg.png" alt="Visa" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
        </div>
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px]">{tr('billing.security')}</p>
      </div>
    </div>
  );
}