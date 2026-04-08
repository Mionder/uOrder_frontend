// src/app/admin/page.tsx
import { LoginForm } from "@/components/admin/auth-form";
import { Utensils } from "lucide-react";

export default async function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
      {/* Декоративні фонові елементи */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-50 blur-[120px]" />

      <div className="w-full max-w-md z-10 px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-900 text-white mb-4 shadow-xl">
            <Utensils size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Menuxo Admin</h1>
          <p className="text-gray-500 mt-2">Керуйте вашим меню та закладом</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
          <LoginForm />
        </div>

        <p className="text-center mt-8 text-sm text-gray-400">
          &copy; 2026 Menuxo. Всі права захищені.
        </p>
      </div>
    </div>
  )
}