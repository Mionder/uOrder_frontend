// app/[slug]/page.tsx
import { CategoryAndMenu } from '@/components/admin/dashboard/menu/category-and-menu';
import { LanguageSwitcher } from '@/components/language-switcher';
import { FooterInfo } from '@/components/menu/footer-info';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

async function getPublicMenu(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/public/menu/${slug}`, {
    next: { revalidate: 300 } // Кешуємо меню на 5 хвилин
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await getPublicMenu(slug);

  if (!tenant) {
    return {
      title: 'Menu not found | uOrder.',
    };
  }

  // Використовуємо локалізацію для опису (за замовчуванням UK)
  const description = tenant.description?.uk || tenant.description;

  return {
    title: `${tenant.name} | Цифрове меню uOrder.`,
    description: description,
    openGraph: {
      title: `${tenant.name} — Меню`,
      description: `Спробуйте наше оновлене меню онлайн. Швидко, зручно, uOrder.`,
      url: `https://uorder.app/${slug}`, // підстав свій майбутній домен
      siteName: 'uOrder.',
      images: [
        {
          url: tenant.logo || '/default-og-image.png', // Логотип ресторану
          width: 800,
          height: 600,
          alt: tenant.name,
        },
      ],
      locale: 'uk_UA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tenant.name,
      description: description,
      images: [tenant.logo],
    },
  };
}

export default async function PublicMenuPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> // Тепер це Promise
}) {
  const { slug } = await params;
  console.log('slug', slug);
  const tenant = await getPublicMenu(slug);

  if (!tenant) {
    notFound(); // Покаже стандартну 404 сторінку
  }

  console.log('tenant_my', tenant);

  return (
    <main className='!bg-white !text-black' style={{ '--brand-color': tenant.mainColor } as React.CSSProperties}>
        <LanguageSwitcher languages={tenant.languages} />

        <CategoryAndMenu tenant={tenant} />
        
        {/* Футер з контактами */}
        <FooterInfo tenantInfo={tenant} />
    </main>
  );
}