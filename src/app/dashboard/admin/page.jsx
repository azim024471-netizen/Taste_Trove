import { countInfoForAdmin } from '@/lib/api_actions/count';
import React from 'react';
import { 
    FaUsers, 
    FaUtensils, 
    FaCrown, 
    FaExclamationTriangle,
    FaArrowRight,
    FaUserCog,
    FaServer
} from 'react-icons/fa';
import Link from 'next/link';

const AminHomePage = async () => {
    const response = await countInfoForAdmin();
    
    const stats = response?.data || {
        totalUsers: 0,
        totalRecipes: 0,
        totalPremiumMembers: 0,
        totalReports: 0
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 text-zinc-800 font-sans">
            
            <div className="w-fit bg-zinc-900 px-5 py-3 rounded-xl border border-zinc-800 shadow-md">
                <div className="flex items-center gap-2">
                    <span className="text-xl text-[#FF003F]">🍴</span>
                    <span className="font-black tracking-tight text-xl text-white">
                        Taste<span className="text-[#FF003F]">Trove</span>
                    </span>
                </div>
            </div>

            <div className="border-b border-zinc-200 pb-5">
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Admin Console</h1>
                <p className="text-zinc-500 text-sm mt-1">Platform control and live metrics overview.</p>
            </div>

            <div className="flex justify-end">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Platform Status
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Users</p>
                        <h3 className="text-3xl font-black text-zinc-900">{stats.totalUsers}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                        <FaUsers size={20} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Recipes</p>
                        <h3 className="text-3xl font-black text-zinc-900">{stats.totalRecipes}</h3>
                    </div>
                    <div className="w-12 h-12 bg-rose-50 text-[#FF003F] rounded-xl flex items-center justify-center border border-rose-100">
                        <FaUtensils size={20} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Premium Members</p>
                        <h3 className="text-3xl font-black text-zinc-900">{stats.totalPremiumMembers}</h3>
                    </div>
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
                        <FaCrown size={20} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Reports</p>
                        <h3 className="text-3xl font-black text-zinc-900">{stats.totalReports}</h3>
                    </div>
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center border border-red-100">
                        <FaExclamationTriangle size={18} />
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
                    <h3 className="font-extrabold text-zinc-800 text-lg tracking-tight">Quick Actions</h3>
                    <div className="flex flex-col gap-2">
                        <Link href="/dashboard/admin/manage-users" className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 text-sm font-semibold text-zinc-700 transition-colors border border-zinc-200/60 group">
                            <span className="flex items-center gap-2 text-zinc-700">
                                <FaUserCog size={13} className="text-zinc-500" /> Manage All Users
                            </span>
                            <FaArrowRight size={12} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <Link href="/dashboard/admin/reports" className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 text-sm font-semibold text-zinc-700 transition-colors border border-zinc-200/60 group">
                            <span className="flex items-center gap-2 text-zinc-700">
                                <FaExclamationTriangle size={13} className="text-red-500" /> Review Active Reports
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold border border-red-100">
                                    {stats.totalReports}
                                </span>
                                <FaArrowRight size={12} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
                    <h3 className="font-extrabold text-zinc-800 text-lg tracking-tight">System Core & Database Status</h3>
                    <div className="border border-dashed border-zinc-200 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-2 bg-zinc-50/50">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs">
                            <FaServer size={16} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-zinc-800">TasteTrove Core Node Operational</p>
                            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                                MongoDB collections, Secure BetterAuth state management, and API route listeners are synchronized flawlessly.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AminHomePage;