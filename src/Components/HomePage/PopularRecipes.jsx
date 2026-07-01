'use client';
import React from 'react';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PopularRecipes = ({ popularRecipes }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 } 
        }
    };

    const cardVariants = {
        hidden: { y: 60, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { 
                type: "spring", 
                stiffness: 70, 
                damping: 15, 
                duration: 0.15 
            } 
        }
    };

    return (
        <section className="py-20 bg-[#ffdd7ec2]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-extrabold text-zinc-900 mb-2">
                            Most <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-rose-500">Popular</span> Recipes
                        </h2>
                        <p className="text-zinc-500">Trending dishes that everyone is loving right now.</p>
                    </div>
                    <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                        View All →
                    </button>
                </div>
                
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {popularRecipes?.map((recipe) => (
                        <motion.div 
                            key={recipe._id} 
                            variants={cardVariants}
                            className="group relative bg-white rounded-3xl p-3 shadow-sm border border-zinc-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="relative h-56 w-full mb-4 overflow-hidden rounded-2xl">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full w-full"
                                >
                                    <Image 
                                        src={recipe.recipeImage} 
                                        alt={recipe.recipeName}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover"
                                    />
                                </motion.div>
                                
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
                                
                                <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-white shadow-lg border border-white/20">
                                    <FaHeart className="text-rose-400" /> {recipe.likesCount}
                                </div>
                            </div>

                            <div className="px-2 pb-2">
                                <h3 className="text-lg font-bold text-zinc-900 mb-1 truncate group-hover:text-orange-600 transition-colors">
                                    {recipe.recipeName}
                                </h3>
                                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                                    By {recipe.authorName}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PopularRecipes;