import React from 'react';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';

const PopularRecipes = ({ popularRecipes }) => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-zinc-900 mb-8">Popular Recipes</h2>
                
                {/* Grid layout: 1 col mobile, 2 cols tablet, 4 cols desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularRecipes?.map((recipe) => (
                        <div key={recipe._id} className="group flex flex-col h-full bg-zinc-50 rounded-2xl p-4 border border-zinc-100 hover:border-orange-200 transition-all duration-300">
                            {/* Image Container */}
                            <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
                                <Image 
                                    src={recipe.recipeImage} 
                                    alt={recipe.recipeName}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Overlay Like Badge */}
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-rose-500 shadow-sm">
                                    <FaHeart /> {recipe.likesCount}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="grow">
                                <h3 className="text-lg font-bold text-zinc-900 mb-1 line-clamp-1">{recipe.recipeName}</h3>
                                <p className="text-sm text-zinc-500">By {recipe.authorName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularRecipes;