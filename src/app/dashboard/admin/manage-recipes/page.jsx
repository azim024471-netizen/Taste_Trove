import { getAllRecipes } from '@/lib/api_actions/recipe_api';
import RecipeContainer from '@/Components/AdminDashboard/RecipeContainer';
import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const page = async () => {
   
    
    const recipesData = await getAllRecipes()
    const recipes = recipesData?.recipes

    return (
        <div className="min-h-screen bg-zinc-50/50 p-4 md:p-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-4">
                    
                    <div className="w-12 h-12 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
                        <FaUtensils size={20} />
                    </div>
                    
                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight">
                            Recipe Management
                        </h1>
                        <p className="text-zinc-500 text-xs md:text-sm mt-0.5">
                            Show all recipes of all users in a table format. Admin can Edit, Delete or Feature any recipe.
                        </p>
                    </div>
                </div>
            </div>

            <RecipeContainer initialRecipes={recipes} />
            
        </div>
    );
};

export default page;