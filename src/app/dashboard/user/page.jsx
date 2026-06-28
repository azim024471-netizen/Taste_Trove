import { countInfoForUser } from '@/lib/api_actions/count';
import { getUserSession } from '@/lib/core_function/server';
import React from 'react';
import { FaUtensils, FaHeart, FaThumbsUp, FaCrown, FaStar, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const UserDashboard = async () => {
    const session = await getUserSession();
    const user = session?.user;
    const stats = await countInfoForUser(user?.id);

    const getTheme = (type) => {
        switch(type) {
            case 'elite': 
                return { linear: 'from-amber-400 via-amber-300 to-yellow-500', icon: <FaCrown className="text-amber-900" />, label: 'ELITE' };
            case 'standard': 
                return { linear: 'from-purple-500 via-violet-500 to-indigo-600', icon: <FaStar className="text-white" />, label: 'STANDARD' };
            default: 
                return { linear: 'from-zinc-400 via-zinc-300 to-zinc-500', icon: <FaUser className="text-white" />, label: 'BASIC' };
        }
    };

    const theme = getTheme(user?.user_type);

    return (
        <div className="min-h-screen bg-linear-to-b from-zinc-50 to-zinc-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <div className="bg-[#1a1a1a] p-8 rounded-[2rem] border border-zinc-800 shadow-2xl relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-linear-to-br ${theme.linear} opacity-10 blur-3xl rounded-full`}></div>
                    
                    <div className="flex flex-col items-center text-center relative z-10">
                        <div className="p-1 bg-zinc-800 rounded-full mb-4 border border-zinc-700 shadow-xl">
                            <Image 
                                src={user?.image || "/default-avatar.png"} 
                                alt="Profile" 
                                width={112} 
                                height={112} 
                                className="rounded-full border-4 border-[#1a1a1a] object-cover"
                            />
                        </div>
                        
                        <h1 className="text-3xl font-extrabold text-white">{user?.name}</h1>
                        <p className="text-zinc-400 font-medium mt-1">{user?.email}</p>
                        
                        <div className={`mt-6 px-6 py-2 rounded-xl bg-linear-to-r ${theme.linear} font-black text-black flex items-center gap-2 text-sm`}>
                            {theme.icon} {theme.label} MEMBER
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Recipes', value: stats?.totalRecipes, icon: FaUtensils, color: 'text-emerald-500', link: '/dashboard/my-recipes' },
                        { label: 'Total Favorites', value: stats?.totalFavorites, icon: FaHeart, color: 'text-rose-500', link: '/dashboard/favorites' },
                        { label: 'Total Likes', value: stats?.totalLikesReceived, icon: FaThumbsUp, color: 'text-sky-500', link: '/dashboard/likes' }
                    ].map((item, idx) => (
                        <Link href={item.link} key={idx} className="group bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-between hover:-translate-y-1">
                            <div>
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{item.label}</p>
                                <h3 className="text-4xl font-black text-zinc-900 mt-1">{item.value || 0}</h3>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-50 ${item.color} group-hover:bg-zinc-100 transition-colors`}>
                                <item.icon size={22} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;