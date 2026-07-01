'use client'; 
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaPlus, FaStar, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import React from 'react';

const Banner = () => {
   
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="relative w-full bg-zinc-950 text-zinc-100 overflow-hidden pt-16 pb-24 border-b border-zinc-900"
        >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

              
                <motion.div variants={containerVariants} className="lg:col-span-7 space-y-8">
                    <motion.div variants={itemVariants} className="space-y-5">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Where Recipes <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500"> Become Memories</span>
                        </h1>
                        <p className="text-base md:text-lg font-semibold text-zinc-300 tracking-wide">
                            Connect with food lovers worldwide sharing authentic recipes.
                        </p>
                        <p className="text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed">
                            Join thousands of passionate food lovers sharing homemade masterpieces from every corner of the world.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
                        <Link href="/recipes" className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-7 py-4 rounded-xl transition-all shadow-lg shadow-rose-600/20 flex items-center space-x-2 text-sm group">
                            <span>Explore Recipes</span>
                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/dashboard/add-recipe" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium px-7 py-4 rounded-xl transition-all flex items-center space-x-2 text-sm">
                            <span>Share Your Recipe</span>
                            <FaPlus className="text-xs text-rose-500" />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { scale: 0.8, opacity: 0 },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
                        }
                    }}
                    className="lg:col-span-5 relative flex justify-center items-center"
                >
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

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="absolute -bottom-4 left-4 md:left-0 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-50 rounded-2xl p-4 shadow-2xl border border-slate-100 dark:border-zinc-800/80 max-w-60 flex gap-3"
                    >
                        <Image src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=150" alt="thumb" width={64} height={64} className="rounded-xl object-cover shrink-0" />
                        <div className="space-y-1">
                            <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Today's Special</span>
                            <h4 className="text-xs font-bold leading-tight truncate">Creamy Garlic Pasta</h4>
                            <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 dark:text-zinc-400">
                                <span className="flex items-center gap-0.5"><FaStar className="text-amber-500" /> 4.9</span>
                                <span className="flex items-center gap-0.5"><FaRegClock /> 25 min</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-zinc-950 to-transparent pointer-events-none z-0" />
        </motion.div>
    );
};

export default Banner;