import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta', // Створюємо змінну для Tailwind
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Базовий заголовок. %s підставить назву конкретної сторінки (напр. "Меню | uOrder.")
  title: {
    default: 'uOrder. — Преміальне цифрове меню для вашого закладу',
    template: '%s | uOrder.'
  },
  description: 'uOrder. — найшвидший та найстильніший спосіб створити онлайн-меню для ресторану, кафе чи бару. Зручне керування, миттєве завантаження.',
  
  // Колір теми для мобільних браузерів (Safari/Chrome)
  themeColor: '#000000',

  // Налаштування іконок (ті самі "u.", про які ми говорили)
  icons: {
    icon: '/icon.png', // Основна іконка (u. на прозорому фоні)
    shortcut: '/favicon.ico',
    apple: '/icon.png', // Для збереження на екрані iPhone
  },

  // Open Graph — те, що побачить юзер у Telegram/Instagram при пересилці посилання
  openGraph: {
    title: 'uOrder. — Ваше меню в один клік',
    description: 'Відкрийте нову якість обслуговування з цифровим меню uOrder.',
    url: 'https://uorder.app', // Заміни на свій реальний домен
    siteName: 'uOrder.',
    images: [
      {
        url: '/og-image.png', // Картинка-прев'ю (бажано 1200x630 з логотипом)
        width: 1200,
        height: 630,
        alt: 'uOrder. Branding',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },

  // Для Twitter (X)
  twitter: {
    card: 'summary_large_image',
    title: 'uOrder. — Digital Menu',
    description: 'Create your digital menu in minutes.',
    images: ['/icon.png'],
  },

  // Налаштування для того, щоб меню виглядало як нативний додаток на мобільних
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'uOrder.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <AuthProvider>
        <LanguageProvider>
          <body className="!light min-h-full flex !font-sans flex-col">{children}</body>      
        </LanguageProvider>
      </AuthProvider>
    </html>
  );
}
