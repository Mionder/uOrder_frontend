'use client';
import { AVAILABLE_LANGUAGES } from "@/constants"
import { useState } from "react";

export const LanguageStep = ({ onNext, token, selectedLangs, setSelectedLangs }: any) => {
      

    const toggleLanguage = (code: string) => {
        setSelectedLangs((prev: any) => 
        prev.includes(code) ? prev.filter((c: any) => c !== code) : [...prev, code]
        );
    };

    const onSubmit = async () => {
        try {
            const updateData = {
                languages: selectedLangs
            }

             const res = await fetch('http://localhost:3000/v1/admin/tenant/settings', {
                method: 'PATCH',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData),
            });

            if (res.ok) {
                const updated = await res.json();
                onNext();
            }

        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="space-y-6">
              <h2 className="text-xl font-bold">Які мови підтримує ваш заклад?</h2>
                      <div className="grid grid-cols-2 gap-3">
                        {AVAILABLE_LANGUAGES.map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => toggleLanguage(lang.code)}
                            className={`p-3 border rounded-lg transition ${
                              selectedLangs.includes(lang.code) ? 'border-blue-600 bg-blue-50' : 'bg-white'
                            }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                      <button onClick={onSubmit} className="w-full bg-blue-600 text-white p-3 rounded">Далі</button>
                    </div>
    )
}