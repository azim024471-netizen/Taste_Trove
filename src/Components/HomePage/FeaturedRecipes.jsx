'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FeaturedRecipes = ({ featuredRecipes }) => {
  
const cardVariants = {
    hidden: { y: 100, opacity: 0 }, 
    visible: { 
        y: 0, 
        opacity: 1, 
        transition: { 
            type: "spring",       
            stiffness: 40,       
            damping: 12,        
            duration: 0.8 
        } 
    }
};

    return (
        <section className="py-20 bg-zinc-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4">
                        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500">Featured Recipes</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredRecipes?.map((recipe) => (
                        <motion.div 
                            key={recipe._id} 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardVariants}
                            className="group bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full w-full"
                                >
                                    <Image 
                                        src={recipe.recipeImage} 
                                        alt={recipe.recipeName}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                </motion.div>
                                <div className="absolute top-4 left-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                                        {recipe.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-zinc-400 font-medium">{recipe.preparationTime} mins</span>
                                    <div className="flex items-center text-rose-500 gap-1 font-bold bg-rose-50 px-3 py-1 rounded-full text-sm">
                                        <span>♥</span> {recipe.likesCount}
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
                                    {recipe.recipeName}
                                </h3>
                                <p className="text-zinc-500 text-sm mb-6 capitalize italic">
                                    {recipe.cuisineType} Cuisine
                                </p>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                                    <p className="text-sm text-zinc-600">By <span className="font-semibold text-zinc-900">{recipe.authorName}</span></p>
                                    <button className="text-orange-600 font-semibold text-sm hover:underline">
                                        View Recipe →
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedRecipes;