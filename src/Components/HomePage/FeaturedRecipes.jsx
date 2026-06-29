import React from 'react';
import Image from 'next/image';

const FeaturedRecipes = ({ featuredRecipes }) => {
    return (
        <section className="py-20 bg-zinc-50">
            <div className="container mx-auto px-4">
                {/* Header Section with Gradient */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4">
                        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500">Featured Recipes</span>
                    </h2>
                    <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
                        Discover the most loved and top-rated dishes carefully curated by our community. 
                        Cook like a pro with these exquisite recipes.
                    </p>
                </div>
                
                {/* Grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredRecipes?.map((recipe) => (
                        <div key={recipe._id} className="group bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                            {/* Image Section */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image 
                                    src={recipe.recipeImage} 
                                    alt={recipe.recipeName}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                                        {recipe.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedRecipes;