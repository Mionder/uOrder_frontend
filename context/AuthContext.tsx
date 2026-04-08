'use client'
import { createContext, useState, useContext, useEffect } from "react"
import Cookies from "js-cookie";

interface AuthContextType { 
    token: string | null;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const cookieToken = Cookies.get('token');
        if (cookieToken) {
            setToken(cookieToken);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};