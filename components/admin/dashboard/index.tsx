'use client'
import { useEffect, useState } from "react"
import { CategoriesAdmin } from "./categories";
import { MenuAdmin } from "./menu";
import TenantSettingsForm from "./tenant/tenant-settings-form";
import { 
  LayoutDashboard, 
  Layers, 
  UtensilsCrossed, 
  Settings, 
  LogOut,
  ChevronRight,
  CreditCard,
  X,
  Menu,
} from "lucide-react";
import { DashboardStatsView } from "./dashboard-stats-view";
import Cookies from 'js-cookie';
import { useAuth } from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Loader } from "../ui/loader";

// Імпортуємо наш модний вигляд дашборду (те що ми малювали раніше)
 

export const AdminDashboard = ({ categories, menuTree, token }: any) => {
    const [currentTab, setCurrentTab] = useState(0); // 0 - Stats, 1 - Categories, 2 - Menu, 3 - Profile
    const [profile, setProfile] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [fetching, setFetching] = useState(true);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const selectTab = (id: number) => {
        setCurrentTab(id);
        setIsSidebarOpen(false);
    };

    const { setToken } = useAuth();
    const { tr, profileLanguages } = useLanguage();

    useEffect(() => {
        if (currentTab === 4) {
            router.push('/admin/billing');
        }
    }, [currentTab])

    useEffect(() => {
        // Завантажуємо профілі та статистику паралельно
        Promise.all([
            fetch('http://localhost:3000/v1/admin/tenant/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(res => res.json()),
            fetch('http://localhost:3000/v1/admin/tenant/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(res => res.json())
        ])
        .then(([profileData, statsData]) => {
            setProfile(profileData);
            setLogoPreview(profileData.logo);
            setStats(statsData);
            setFetching(false);
        })
        .catch(err => console.error(err));
    }, [token]);

    const handleLogout = () => {
        Cookies.remove('token');
        setToken(null);
        redirect('/admin');
    }

    const menuItems = [
        { id: 0, label: tr('dashboard.dashboard'), icon: LayoutDashboard },
        { id: 1, label: tr('dashboard.stats_categories'), icon: Layers },
        { id: 2, label: tr('dashboard.menu'), icon: UtensilsCrossed },
        { id: 3, label: tr('dashboard.profile'), icon: Settings },
        { id: 4, label: tr('dashboard.payment'), icon: CreditCard },
    ];

    console.log('stats', stats, 'profile', profile);

    if (fetching) return <div className="flex h-screen items-center justify-center"><Loader /></div>;

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* --- OVERLAY (затемнення при відкритому меню на мобайлі) --- */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            {/* --- SIDEBAR --- */}
            <aside className={`
                fixed inset-y-0 left-0 z-[101] w-64 bg-white border-r border-gray-100 flex flex-col 
                transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 px-2">
                        <span className="!font-[Arial] text-2xl font-black italic tracking-tighter">uOrder.</span>
                    </div>
                    {/* Кнопка закриття для мобілок */}
                    <button className="md:hidden p-2 text-gray-400" onClick={() => setIsSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => selectTab(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                currentTab === item.id 
                                ? "bg-blue-50 text-blue-600 shadow-sm" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {currentTab === item.id && <ChevronRight size={16} />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-gray-50">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">{tr('dashboard.logout')}</span>
                    </button>
                </div>
            </aside>

{/* --- MAIN CONTENT --- */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header (показуємо тільки на малих екранах) */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-[90]">
                    <span className="font-black italic tracking-tighter text-xl">uOrder.</span>
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-gray-50 rounded-lg text-gray-600"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                <main className={`flex-1 ${profileLanguages.length > 1 ? 'md:pt-0 md:p-8' : 'md:p-8'} p-4 overflow-y-auto`}>
                    <div className="max-w-6xl mx-auto">
                        {/* Header поточної сторінки */}
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-blue-500 mb-1">
                                {menuItems.find(i => i.id === currentTab)?.label}
                            </h2>
                            <p className="text-gray-400 text-xs md:text-sm">{tr('dashboard.dashboard_subtitle')}</p>
                        </div>

                        {/* Контент */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* ... (рендери табів залишаються такими ж) ... */}
                            {currentTab === 0 && (
                                <DashboardStatsView profile={profile} stats={stats} onNavigate={selectTab} />
                            )}
                            {currentTab === 1 && <CategoriesAdmin categories={categories} profile={profile} />}
                            {currentTab === 2 && <MenuAdmin categories={categories} menuTree={menuTree} tenantSlug={profile.slug} setTab={setCurrentTab} />}
                            {currentTab === 3 && <TenantSettingsForm profile={profile} token={token} logoPreview={logoPreview} />}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}