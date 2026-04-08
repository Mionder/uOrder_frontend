// src/components/registration/auth-step.tsx
'use client'
import { useState } from "react";
import { Mail, Lock, Globe, UtensilsCrossed, ArrowRight } from "lucide-react";
import { useRegister } from "./services/use-register";

export const StepAuth = ({ onNext, setToken, setEmail }: any) => {
  const { registerUser, loading, error } = useRegister();
  const [form, setForm] = useState({ email: '', password: '', restaurantSlug: '', restaurantName: '' });

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await registerUser(form);
    if (res) {
      setToken(res.token.access_token);
      setEmail(res.email);
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Назва закладу</label>
          <div className="relative">
            <UtensilsCrossed className="absolute left-3 top-3 text-gray-400" size={18} />
            <input name="restaurantName" required onChange={handleChange} placeholder="Суші Майстер" className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500/10 outline-none transition-all" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Slug (Посилання)</label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 text-gray-400" size={18} />
            <input name="restaurantSlug" required onChange={handleChange} placeholder="sushi-master" className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl font-mono text-sm outline-none" />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Email аккаунта</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input name="email" type="email" required onChange={handleChange} placeholder="admin@example.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Пароль</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input name="password" type="password" required onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none" />
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-200">
        {loading ? "Реєстрація..." : <>Створити аккаунт <ArrowRight size={18} /></>}
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
}