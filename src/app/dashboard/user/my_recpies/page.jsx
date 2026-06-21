
import RecipeCard from '@/Components/Recepies/RecepieCard';
import { getRecipeByUserId } from '@/lib/api_actions/recipe_api';
import { getUserSession } from '@/lib/core_function/server';
import { FaUtensils, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

const MyRecipesPage = async () => {
    const session = await getUserSession();
    const userID = session?.user?.id;

    let myRecipes = [];

    if (userID) {
        myRecipes = await getRecipeByUserId(userID);
    }

    return (
        <div className="space-y-8">
       
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 text-center dark:text-white flex items-center gap-3">
                        <FaUtensils className="text-rose-500" />
                        My Recipes
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                        Manage and edit your shared recipes
                    </p>
                </div>

                <Link 
                    href="/dashboard/add-recipe"
                    className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl font-medium transition-all"
                >
                    <FaPlus /> Add New Recipe
                </Link>
            </div>

            {myRecipes && myRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myRecipes.map((recipe) => (
                        <RecipeCard 
                            key={recipe._id} 
                            recipe={recipe} 
                           
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700">
                    <FaUtensils className="mx-auto text-6xl text-zinc-300 dark:text-zinc-700 mb-6" />
                    <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">No recipes yet</h3>
                    <p className="text-zinc-500 mt-2 mb-6">You haven't shared any recipes yet.</p>
                    <Link 
                        href="/dashboard/add-recipe"
                        className="inline-block bg-rose-500 text-white px-8 py-3 rounded-2xl font-medium hover:bg-rose-600 transition"
                    >
                        Share Your First Recipe
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyRecipesPage;