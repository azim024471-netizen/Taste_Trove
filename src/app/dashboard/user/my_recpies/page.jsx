import { getRecipeByUserId } from '@/lib/api_actions/recipe_api';
import { getUserSession } from '@/lib/core_function/server';
import { FaUtensils, FaPlus, FaInbox } from 'react-icons/fa';
import Link from 'next/link';
import MyRecipeCard from './MyRecpieCard';

const MyRecipesPage = async () => {
    const session = await getUserSession();
    const userID = session?.user?.id;

    let recipes = [];

    if (userID) {
        recipes = await getRecipeByUserId(userID);
    }

    return (
        <div className="space-y-10 p-4 md:p-10 ">
            <div className="flex flex-col items-center mx-auto justify-center sm:flex-row sm:items-center  gap-5 bg-white
             dark:bg-zinc-900 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800/60 shadow-sm shadow-zinc-100/50 dark:shadow-none">
                <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 rounded-2xl text-rose-500">
                        <FaUtensils className="text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                            My Recipes
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5 font-medium">
                            You have curated <span className="text-rose-500 font-bold">{recipes.length}</span> delicious recipes
                        </p>
                    </div>
                </div>

               
            </div>

            {recipes?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map((recipe) => (
                        <MyRecipeCard
                            key={recipe._id}
                            recipe={recipe}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-dashed border-zinc-200 dark:border-zinc-800 max-w-xl mx-auto shadow-sm">
                    <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center rounded-3xl mx-auto mb-6">
                        <FaInbox className="text-3xl text-zinc-300 dark:text-zinc-600" />
                    </div>

                    <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
                        No recipes found yet
                    </h3>

                    <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto mt-2 font-medium">
                        Your recipe list is looking a bit empty. Start sharing your culinary magic with the world!
                    </p>

                    <Link
                        href="/dashboard/add-recipe"
                        className="mt-8 inline-flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-md transition-all active:scale-95"
                    >
                        <FaPlus className="text-xs" />
                        Add Your First Recipe
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyRecipesPage;