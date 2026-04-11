// app/reset-password/page.tsx
'use client'
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Loader } from '@/components/admin/ui/loader';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const { tr } = useLanguage();

  const [formData, setFormData] = useState({
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Валідація на клієнті
    if (formData.newPassword !== formData.confirmPassword) {
      setError(tr('reset_password.match_error'));
      return;
    }

    if (formData.code.length < 6) {
      setError(tr('reset_password.length_error'));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: formData.code,
          newPassword: formData.newPassword
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Якщо бекенд повертає токен (як ми домовлялися), 
        // зберігаємо його та редіректимо в дашборд
        localStorage.setItem('token', data.access_token);
        router.push('/admin/dashboard');
      } else {
        setError(data.message || tr('reset_password.code_error'));
      }
    } catch (err) {
      setError(tr('reset_password.network_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-black/5">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">{tr('reset_password.title')}</h1>
          <p className="text-sm text-gray-400 mt-2">{tr('reset_password.subtitle')} <b>{email}</b></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Код підтвердження */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">{tr('reset_password.email_code')}</label>
            <input 
              type="text" 
              maxLength={6}
              placeholder="000000"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-center text-2xl font-black tracking-[10px] focus:bg-white focus:border-black outline-none transition-all"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value.replace(/\D/g, '')})}
            />
          </div>

          {/* Новий пароль */}
          <div className="space-y-1.5 relative">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">{tr('reset_password.new_password')}</label>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:border-black outline-none transition-all"
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-gray-400 hover:text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Підтвердження */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">{tr('reset_password.confirm_password')}</label>
            <input 
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:border-black outline-none transition-all"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 disabled:opacity-50"
          >
            {loading ? tr('reset_password.submit_btn_loading') : tr('reset_password.submit_btn')}
          </button>
        </form>
      </div>
    </div>
  );
}

// Огортаємо в Suspense, бо використовуємо useSearchParams
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black"><Loader /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}