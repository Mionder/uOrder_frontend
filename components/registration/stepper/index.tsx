// src/components/registration/stepper.tsx
'use client'
import { useState } from 'react';
import { StepAuth } from './auth-step';
import { StepBranding } from './branding-step';
import { LanguageStep } from './lang-step';
import { ContactsStep } from './contacts';
import { Check } from 'lucide-react';
import { VerificationStep } from './verification-step';

export default function RegistrationStepper() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [selectedLangs, setSelectedLangs] = useState(['uk']);

  const steps = [
    { id: 1, label: "Аккаунт" },
    { id: 2, label: "Брендинг" },
    { id: 3, label: "Мови" },
    { id: 4, label: "Контакти" },
    { id: 5, label: "Email" }
  ];

  return (
    <div className="bg-white shadow-2xl shadow-gray-200/50 rounded-[2.5rem] border border-gray-100 overflow-hidden">
      {/* Progress Bar */}
      <div className="px-8 pt-10 pb-6 border-b border-gray-50 bg-gray-50/30">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${
                step === s.id ? 'bg-blue-600 border-blue-100 text-white shadow-lg' : 
                step > s.id ? 'bg-green-500 border-green-50 text-white' : 'bg-white border-gray-100 text-gray-400'
              }`}>
                {step > s.id ? <Check size={18} /> : <span className="text-sm font-bold">{s.id}</span>}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s.id ? 'text-gray-900' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 md:p-12">
        {step === 1 && <StepAuth setToken={setToken} onNext={() => setStep(2)} setEmail={setEmail} />}
        {step === 2 && <StepBranding token={token} onNext={() => setStep(3)} />}
        {step === 3 && <LanguageStep token={token} selectedLangs={selectedLangs} setSelectedLangs={setSelectedLangs} onNext={() => setStep(4)} />}
        {step === 4 && <ContactsStep token={token} selectedLangs={selectedLangs} onNext={() => setStep(5)} />}
        {step === 5 && <VerificationStep email={email} token={token} />}

        {step > 1 && step < 5 && (
          <button 
            onClick={() => setStep(step + 1)} 
            className="mt-8 w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Пропустити цей крок
          </button>
        )}
      </div>
    </div>
  );
}