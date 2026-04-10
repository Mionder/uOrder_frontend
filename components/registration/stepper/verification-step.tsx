// src/components/registration/verification-step.tsx
'use client'
import { useState, useRef, useEffect } from "react";
import { Mail, ArrowRight, RefreshCcw, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export const VerificationStep = ({ email, token }: { email: string, token: string }) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const { tr } = useLanguage();

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text.slice(-1); // Тільки остання цифра
        setCode(newCode);

        // Автофокус на наступне поле
        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: any, index: number) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const resendCode = async () => {
        try {
            const res = await fetch('http://localhost:3000/v1/auth/resend-code', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                //@TODO needs to be updated
                body: JSON.stringify({ id: '68fb2e9b-e63d-4cc6-aab4-31b6d8596c5f', email: 'sergejjolejj@gmail.com' }),
            });

            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    const handleVerify = async () => {
        setLoading(true);
        const fullCode = code.join('');
        
        try {
            const res = await fetch('http://localhost:3000/v1/auth/verify-email', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ code: fullCode }),
            });

            if (res.ok) {
                router.push('/admin/dashboard?verified=true');
            }
        } catch (err) {
            console.error("Verification failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-2">
                    <Mail size={32} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">{tr('registration_page.email_step.title')}</h2>
                <p className="text-gray-500 text-sm px-8">
                    {tr('registration_page.email_step.subtitle')} <span className="font-bold text-gray-900">{email}</span>
                </p>
            </div>

            <div className="flex justify-center gap-2 md:gap-4">
                {code.map((digit, idx) => (
                    <input
                        key={idx}
                        ref={(el: any) => (inputs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        className="w-12 h-16 md:w-14 md:h-20 text-center text-2xl font-black bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                    />
                ))}
            </div>

            <div className="space-y-4">
                <button
                    onClick={handleVerify}
                    disabled={loading || code.some(d => !d)}
                    className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-gray-200 disabled:opacity-50"
                >
                    {loading ? tr('registration_page.email_step.confirm_loading') : tr('registration_page.email_step.confirm')}
                </button>

                <div className="flex flex-col items-center gap-3">
                    <button 
                        disabled={resendTimer > 0}
                        onClick={resendCode}
                        className="text-sm font-bold text-blue-600 disabled:text-gray-400 flex items-center gap-2"
                    >
                        <RefreshCcw size={14} className={resendTimer > 0 ? "" : "animate-spin-slow"} />
                        {tr('registration_page.email_step.resend')} {resendTimer > 0 && `(${resendTimer}с)`}
                    </button>
                    
                    <button 
                        onClick={() => router.push('/admin/dashboard')}
                        className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {tr('registration_page.email_step.skip')}
                    </button>
                </div>
            </div>
        </div>
    );
};