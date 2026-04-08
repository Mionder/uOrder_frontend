import { AdminDashboard } from "@/components/admin/dashboard";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getCategories(token: string | null) {
  if (!token) return;
  const res = await fetch('http://localhost:3000/v1/admin/categories', {
    headers: {
      'Authorization': `Bearer ${token}`, // Токен беремо з кук (cookies())
    },
  });
  return res.json();
}

async function getTreeMenu(token: string | null) {
  if (!token) return;
  const res = await fetch(`http://localhost:3000/v1/admin/categories/menu-tree/`, {
    headers: {
      'Authorization': `Bearer ${token}`, // Токен беремо з кук (cookies())
    },
  });
  return res.json();
}

export default async function DashboardAdminPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || null;

    if (!token) {
       redirect('/admin'); 
    }

    const categories = await getCategories(token!);
    const menuTree = await getTreeMenu(token!);

    console.log('menuTree', menuTree)
    

    return (
        <div>
            <LanguageSwitcher />

            <AdminDashboard categories={categories} menuTree={menuTree} token={token} />
        </div>
    )
}