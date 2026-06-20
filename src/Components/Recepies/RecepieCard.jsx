import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaRegClock, FaUtensils } from 'react-icons/fa';
import { HiArrowSmRight } from 'react-icons/hi';

const difficultyConfig = {
    easy:   { label: 'Easy',   className: 'bg-emerald-100 text-emerald-700' },
    medium: { label: 'Medium', className: 'bg-amber-100  text-amber-700'   },
    hard:   { label: 'Hard',   className: 'bg-rose-100   text-rose-700'    },
};

const RecepieCard = ({ recipe }) => {
    if (!recipe) return null;

    const {
        _id,
        recipeName,
        recipeImage,
        category,
        cuisineType,
        preparationTime,
        servings,
        likesCount,
        authorName,     
        difficultyLevel,  
    } = recipe;

    const formattedCuisine  = cuisineType?.replace(/_/g, ' ');
    const formattedServings = servings?.replace('_people', ' People');
    const difficulty = difficultyConfig[difficultyLevel?.toLowerCase()] ?? null;

    return (
        <div className="flex flex-col bg-[#FDF6F0] rounded-2xl p-3 border border-orange-100/30 transition-all duration-300 h-full group hover:shadow-md hover:scale-[1.01]">

            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-zinc-200/60">
                <Image
                    src={
                        recipeImage && recipeImage.includes('.')
                            ? recipeImage
                            : 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=600'
                    }
                    alt={recipeName}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />

                <div className="absolute top-3 left-3">
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                        {category}
                    </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-zinc-800 text-[11px] font-bold px-2 py-1 rounded-lg shadow-sm border border-white/20">
                    <FaHeart className="text-rose-500 text-xs" />
                    <span>{likesCount}</span>
                </div>

                {difficulty && (
                    <div className="absolute bottom-3 left-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${difficulty.className}`}>
                            {difficulty.label}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col grow px-0.5">

                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-0.5">
                    {formattedCuisine}
                </span>

                <Link href={`/recipes/${_id}`}>
                    <h3 className="font-bold text-zinc-900 text-base leading-tight line-clamp-1 mb-2 hover:text-rose-500 transition-colors duration-200">
                        {recipeName}
                    </h3>
                </Link>

                <div className="flex items-center gap-3 text-xs text-zinc-500 font-semibold mb-3">
                    <div className="flex items-center gap-1">
                        <FaRegClock className="text-zinc-400 text-sm" />
                        <span>{preparationTime} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaUtensils className="text-zinc-400 text-xs" />
                        <span className="capitalize">{formattedServings}</span>
                    </div>
                </div>

                <div className="pt-2 border-t border-zinc-200/40 flex items-center justify-between mb-3 text-[11px] text-zinc-400 font-medium">
                    <span>By {authorName}</span>
                </div>

                <Link
                    href={`/recipes/${_id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-rose-500 hover:bg-rose-800 text-white font-bold rounded-xl text-xs py-2.5 transition-all duration-300 group/btn mt-auto shadow-sm"
                >
                    <span>View Details</span>
                    <HiArrowSmRight className="text-sm group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>

            </div>
        </div>
    );
};

export default RecepieCard;