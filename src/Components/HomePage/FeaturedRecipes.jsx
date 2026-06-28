import React from 'react';
import Image from 'next/image';

const FeaturedRecipes = ({ featuredRecipes }) => {
    return (
        <section className="py-16 bg-zinc-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-zinc-900 mb-8">Featured Recipes</h2>
                
                {/* Grid layout for responsiveness */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredRecipes?.map((recipe) => (
                        <div key={recipe._id} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            {/* Image Section */}
                            <div className="relative h-64 w-full">
                                <Image 
                                    src={recipe.recipeImage} 
                                    alt={recipe.recipeName}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                        {recipe.category}
                                    </span>
                                    <span className="text-zinc-400 text-sm">{recipe.preparationTime} mins</span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-zinc-900 mb-2">{recipe.recipeName}</h3>
                                <p className="text-zinc-500 text-sm mb-4 capitalize">Cuisine: {recipe.cuisineType}</p>
                                
                                <div className="flex justify-between items-center pt-4 border-t border-zinc-100">
                                    <p className="text-sm text-zinc-600">By <span className="font-medium">{recipe.authorName}</span></p>
                                    <div className="flex items-center text-rose-500 gap-1 font-bold">
                                        <span>♥</span> {recipe.likesCount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedRecipes;