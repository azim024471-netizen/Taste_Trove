import React from 'react';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';

const PopularRecipes = ({ popularRecipes }) => {
    return (
        <section className="py-20 bg-zinc-50">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-extrabold text-zinc-900 mb-2">
                            Most <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500">Popular</span> Recipes
                        </h2>
                        <p className="text-zinc-500">Trending dishes that everyone is loving right now.</p>
                    </div>
                    <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                        View All →
                    </button>
                </div>
                
                {/* Grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularRecipes?.map((recipe) => (
                        <div key={recipe._id} className="group relative bg-white rounded-3xl p-3 shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300">
                            {/* Image Container */}
                            <div className="relative h-56 w-full mb-4 overflow-hidden rounded-2xl">
                                <Image 
                                    src={recipe.recipeImage} 
                                    alt={recipe.recipeName}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Gradient Overlay for better text visibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                
                                {/* Like Badge */}
                                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-white shadow-lg border border-white/20">
                                    <FaHeart className="text-rose-400" /> {recipe.likesCount}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-2 pb-2">
                                <h3 className="text-lg font-bold text-zinc-900 mb-1 truncate">{recipe.recipeName}</h3>
                                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                                    By {recipe.authorName}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularRecipes;