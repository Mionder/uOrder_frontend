// app/forgot-password/page.tsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { tr } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        // Передаємо імейл через query params, щоб на наступній сторінці 
        // юзеру не треба було вводити його знову
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-6 bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-2xl font-black">{tr('forgot_password.title')}</h1>
        <p className="text-sm text-gray-500 font-medium">{tr('forgot_password.subtitle')}</p>
        
        <input 
          type="email" 
          required
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-black transition-all"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-all"
        >
          {loading ? tr('forgot_password.send_loading') : tr('forgot_password.send')}
        </button>
      </form>
    </div>
  );
}