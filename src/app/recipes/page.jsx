import RecepieCard from '@/Components/Recepies/RecepieCard';
import RecipeCard from '@/Components/Recepies/RecepieCard';
import RecepieFilters from '@/Components/Recepies/RecepieFilters';
import { getRecipe } from '@/lib/api_actions/recipe_api';
import { FaSearch, FaUtensils } from 'react-icons/fa';

const RecipePage = async () => {
    const recipes = await getRecipe();

    const totalRecipes = recipes?.length ?? 0;

    return (
        <div className="min-h-screen bg-[#FDF6F0] dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-10 text-center">
                    <span className="inline-flex bg-[#DE4A43]/10 text-rose-600 items-center text-2xl font-bold   tracking-widest px-4 py-1.5 
                    rounded-full mb-4">
                        <FaUtensils></FaUtensils> <span className='text-black ml-2'>Taste</span><span className='text-rose-500'>Trove</span>
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                        Explore Recipes
                    </h1>
                    <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-base max-w-xl mx-auto">
                        Discover delicious recipes shared by our community
                    </p>

                    <p className="mt-2 text-sm text-rose-500 font-medium">
                        {totalRecipes} recipes available
                    </p>
                </div>

         <RecepieCard></RecepieCard>
                <RecepieFilters></RecepieFilters>

                {/* <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'].map((cat) => (
                        <button
                            key={cat}
                            className={`text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200
                                ${cat === 'All'
                                    ? 'bg-rose-500 text-white border-[#DE4A43]'
                                    : 'bg-white text-zinc-600 border-zinc-200 hover:border-[#DE4A43] hover:text-[#DE4A43]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div> */}

                {recipes && recipes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-[#DE4A43]/10 flex items-center justify-center">
                                <FaUtensils className="text-[#DE4A43] text-2xl" />
                            </div>
                        </div>
                        <p className="text-xl font-bold text-zinc-600 dark:text-zinc-300">No recipes found</p>
                        <p className="text-zinc-400 mt-2 text-sm">Be the first to share your recipe!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipePage;
