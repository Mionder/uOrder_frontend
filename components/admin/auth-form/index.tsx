// src/features/auth/components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useLogin } from './useLogin';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Cookies from 'js-cookie';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const LoginForm = () => {
  const { login, loading, error } = useLogin();
  const router = useRouter();
  const { setToken } = useAuth();
  const { tr } = useLanguage();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(form);

    if (res) {
      setToken(res.access_token);
      Cookies.set('token', res.access_token, { expires: 7 });
      router.push('/admin/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Поле Email */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase text-gray-400 ml-1">{tr('auth.email_label')}</label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Mail size={18} />
          </div>
          <input
            name="email"
            type="email"
            required
            placeholder="admin@restaurant.com"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Поле Password */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase text-gray-400 ml-1">{tr('auth.password_label')}</label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Lock size={18} />
          </div>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Помилка */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm animate-shake">
          <AlertCircle size={16} />
          <p>{error}</p>
        </div>
      )}

      {/* Кнопка входу */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-gray-200 active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            {tr('auth.loading')}
          </>
        ) : (
          <>{tr('auth.login_title')}</>
        )}
      </button>

      <div className="text-center">
        <button onClick={() => router.push('/forgot-password')} type="button" className="text-sm text-blue-600 hover:underline">
          {tr('auth.forgot_password')}
        </button>
      </div>

      <div className="text-center">
        <button type="button" className="text-sm text-gray-900">
            {tr('reg_link')}<span onClick={() => router.push('/registration')} className="!text-blue-600 hover:underline"> {tr('create_now')}</span> 
        </button>
      </div>
    </form>
  );
};