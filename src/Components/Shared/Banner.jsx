

import Image from 'next/image';
import Link from 'next/link';
import { FaUtensils, FaArrowRight, FaPlus, FaStar, FaRegClock } from 'react-icons/fa';

import React from 'react';

const Banner = () => {
    return (
        <div className="relative w-full bg-zinc-950 text-zinc-100 overflow-hidden pt-16 pb-24 border-b border-zinc-900">

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-5">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Where Recipes <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500"> Become Memories</span>
                        </h1>
                        <p className="text-base md:text-lg font-semibold text-zinc-300 tracking-wide">
                            Connect with food lovers worldwide sharing authentic recipes.
                        </p>

                        <p className="text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed">
                            Join thousands of passionate food lovers sharing homemade masterpieces from every corner of the world. From quick weekday dinners to elite pro-chef secrets, unlock the true joy of premium cooking and build your personal recipe vault today.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link href="/recipes" className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-7 py-4 rounded-xl transition-all shadow-lg shadow-rose-600/20 flex items-center space-x-2 text-sm group">
                            <span>Explore Recipes</span>
                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/dashboard/add-recipe" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium px-7 py-4 rounded-xl transition-all flex items-center space-x-2 text-sm">
                            <span>Share Your Recipe</span>
                            <FaPlus className="text-xs text-rose-500" />
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-5 relative flex justify-center items-center">

                    <div className="relative w-75 h-75 md:w-105 md:h-105 rounded-full bg-zinc-900 border-4 border-zinc-800/50 overflow-hidden shadow-2xl shadow-rose-600/10">
                        <Image
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
                            alt="Featured Delicious Food"
                            fill
                            sizes="(max-width: 768px) 300px, 420px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="absolute -bottom-4 left-4 md:left-0 bg-white dark:bg-zinc-800 text-slate-900
           dark:text-zinc-50 rounded-2xl p-4 shadow-2xl border border-slate-100 dark:border-zinc-800/80 max-w-60
            flex gap-3 transition-colors duration-300">
                        <Image
                            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=150"
                            alt="Small thumb"
                            width={64}
                            height={64}
                            className="rounded-xl object-cover shrink-0"
                        />



                        <div className="space-y-1">
                            <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Today's Special</span>
                            <h4 className="text-xs font-bold leading-tight truncate">Creamy Garlic Pasta</h4>
                            <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 dark:text-zinc-400">
                                <span className="flex items-center gap-0.5"><FaStar className="text-amber-500" /> 4.9</span>
                                <span className="flex items-center gap-0.5"><FaRegClock /> 25 min</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-zinc-950 to-transparent pointer-events-none z-0" />
        </div>
    );
};

export default Banner;