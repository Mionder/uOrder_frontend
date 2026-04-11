import { useLanguage } from "@/context/LanguageContext"
import { Users, Heart, Link } from "lucide-react";

export const DashboardStatsView = ({ profile, stats, onNavigate }: any) => {
    const { tr } = useLanguage();

    return (
        <div className="space-y-8">
            {/* Статистика (ті самі картки) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{tr('dashboard.stats_items')}</p>
                    <p className="text-3xl font-bold mt-1">{stats?.itemsCount}</p>
                    <button onClick={() => onNavigate(2)} className="mt-4 text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                        {tr('dashboard.edit_menu')} →
                    </button>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{tr('dashboard.stats_categories')}</p>
                    <p className="text-3xl font-bold mt-1">{stats?.categoriesCount}</p>
                    <button onClick={() => onNavigate(1)} className="mt-4 text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                        {tr('dashboard.edit_caterories')} →
                    </button>
                </div>
                
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <Users size={20} />
                            </div>
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{tr('dashboard.menu_views')}</p>
                        </div>
                    
                        <p className="text-3xl font-black mt-1 pl-2 tracking-tighter">{stats?.totalViews || 0}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <Heart size={20} />
                        </div>
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{tr('dashboard.likes_desc')}</p>
                        </div>
                        <p className="text-3xl font-black mt-1 pl-2 tracking-tighter">{stats.totalLikes}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <Link size={20} />
                        </div>
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{tr('dashboard.view_link')}</p>
                        </div>

                        <a className="mt-4 block max-w-max px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-bold transition-colors" href={`https://uorder.app/${profile.slug}`} target="_blank">
                            {tr('navigate')}
                        </a>
                    </div>
                </div>
                    
            </div>

            {/* Великий банер переходу в профіль */}
            <div className="bg-white border border-gray-100 p-8 rounded-3xl flex items-center justify-between">
                <div className="flex md:flex-row items-center gap-6">
                    <img src={profile?.logo} className="w-16 h-16 rounded-2xl border shadow-sm" alt="" />
                    <div>
                        <h3 className="text-xl font-bold">{profile?.name.uk}</h3>
                        <p className="text-gray-500">{tr('dashboard.profile_settings_desc')}</p>
                    </div>
                </div>
                <button 
                    onClick={() => onNavigate(3)}
                    className="px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-bold transition-colors"
                >
                    {tr('dashboard.profile_settings')}
                </button>
            </div>
        </div>
    )
}