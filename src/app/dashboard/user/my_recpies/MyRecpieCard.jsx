import Link from 'next/link';
import { FaClock, FaUsers, FaRegEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { BiGlobe } from 'react-icons/bi';
import Image from 'next/image';
import DeleteRecpieModal from '@/Components/DashBoard/MyRecpies/DeleteRecpieModal';
import UpdateRecpieModal from '@/Components/DashBoard/MyRecpies/UpdateRecpieModal';

const MyRecipeCard = ({ recipe }) => {
    return (
        <div className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-none transition-all duration-300 flex flex-col justify-between">
            <div>
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={recipe.recipeImage}
                        alt={recipe.recipeName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    <div className="absolute top-4 left-4 bg-rose-500 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl capitalize tracking-wider shadow-sm">
                        {recipe.category}
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-2.5 py-1 rounded-lg capitalize">
                        <BiGlobe className="text-sm" />
                        {recipe.cuisineType?.replaceAll('_', ' ')}
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 tracking-tight group-hover:text-rose-500 transition-colors">
                        {recipe.recipeName}
                    </h3>

                    <div className="flex items-center justify-between text-sm font-medium text-zinc-500 dark:text-zinc-400 pt-1">
                        <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-xl">
                            <FaClock className="text-zinc-400 text-xs" />
                            <span>{recipe.preparationTime} min</span>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-xl capitalize">
                            <FaUsers className="text-zinc-400 text-sm" />
                            <span>{recipe.servings?.replace('_', ' ')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6 pt-2">
                <div className="flex gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                    <Link
                        href={`/recipes/${recipe._id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-200
                        py-2.5 text-xs font-bold border border-zinc-200 dark:border-zinc-700  hover:text-white
                        rounded-xl hover:bg-zinc-600 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 
                        transition active:scale-95"
                    >
                        <FaRegEye className="text-sm" />
                        <span>Details</span>
                    </Link>

                     <UpdateRecpieModal recipe={recipe}> </UpdateRecpieModal>

                    <DeleteRecpieModal recipe={recipe} > </DeleteRecpieModal>

                </div>
            </div>
        </div>
    );
};

export default MyRecipeCard;