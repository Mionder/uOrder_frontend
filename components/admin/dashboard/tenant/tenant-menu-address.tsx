'use client';
import { useLanguage } from "@/context/LanguageContext"

export const TenantMenuAddress = ({ address }: any) => {
    const { t } = useLanguage();

    return (
        <p className="text-gray-500">{t(address)}</p>
    )
}