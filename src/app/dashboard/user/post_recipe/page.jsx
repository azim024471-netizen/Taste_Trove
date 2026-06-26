


import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRecipeByUserId } from '@/lib/api_actions/recipe_api';
import PostRecipeForm from "@/Components/DashBoard/MyRecpies/PostRecipeForm";
import UpgradeToProCard from "@/Components/DashBoard/UpgradeToPro/UpgradeToPro";
import { FaInfoCircle, FaCrown, FaUtensils, FaPlus } from 'react-icons/fa';

const AddRecipePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    
    const isPremium = user?.user_type !== "free_user";

    let recipeCount = 0;
    if (user?.id) {
        const userRecipes = await getRecipeByUserId(user.id);
        recipeCount = userRecipes?.length || 0;
    }

    const isLimitReached = !isPremium && recipeCount >= 2;
    const remainingPosts = isPremium ? "Unlimited" : Math.max(0, 2 - recipeCount);

    return (
        <div className='min-h-screen w-full bg-[#09090b] p-4 sm:p-6 md:p-10 font-sans text-zinc-200 flex items-center justify-center'>
            <div className='w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-8'>
                {isLimitReached ? (
                    <UpgradeToProCard />
                ) : (
                    <div className="w-full max-w-175 flex flex-col gap-6">
                        
                        
                        <div className="flex flex-col gap-2 text-left w-full border-b border-zinc-800/50 pb-5">
                            <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-widest">
                                <FaUtensils className="text-rose-500" size={11} />
                                <span className="text-zinc-100">Taste</span>
                                <span className="text-rose-500">Trove</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-zinc-100 tracking-tight flex items-center gap-2 mt-1">
                                Create New Recipe <span className="p-1.5 bg-rose-600/10 text-rose-500 border border-rose-500/20 rounded-lg"><FaPlus size={14} /></span>
                            </h1>
                            <p className="text-sm text-zinc-400 font-medium max-w-xl leading-relaxed">
                                Share your signature culinary recipes, secret ingredients, and preparation steps with our global food community.
                            </p>
                        </div>

                        <div className="w-full bg-linear-to-r from-zinc-900 via-zinc-900 to-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-[50px] rounded-full pointer-events-none" />
                            
                            <div className="flex items-center gap-3.5 z-10">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner transition-all ${
                                    isPremium 
                                        ? "bg-linear-to-br from-amber-500/20 to-amber-600/5 border-amber-500/30 text-amber-400 shadow-amber-500/10" 
                                        : "bg-linear-to-br from-rose-500/20 to-rose-600/5 border-rose-500/30 text-rose-400 shadow-rose-500/10"
                                }`}>
                                    {isPremium ? <FaCrown className="text-lg" /> : <FaInfoCircle className="text-lg" />}
                                </div>
                                <div>
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">Membership Tier</span>
                                    <h4 className={`text-sm font-black tracking-tight mt-0.5 flex items-center gap-1.5 ${isPremium ? "text-amber-400" : "text-zinc-200"}`}>
                                        {isPremium ? "Premium Pro Member" : "Free Tier Account"}
                                        {!isPremium && <span className="text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded-full font-medium uppercase tracking-normal">Standard</span>}
                                    </h4>
                                </div>
                            </div>

                            <div className="flex gap-6 sm:gap-8 items-center bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-5 py-2.5 w-full sm:w-auto justify-around sm:justify-start z-10">
                                <div>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Total Published</p>
                                    <p className="text-sm font-black text-zinc-100 mt-0.5 flex items-center gap-1">
                                        {recipeCount} <span className="text-xs font-medium text-zinc-500">recipes</span>
                                    </p>
                                </div>
                                <div className="h-8 w-px bg-zinc-800" />
                                <div>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Remaining Slots</p>
                                    <p className={`text-sm font-black mt-0.5 ${isPremium ? "text-amber-400" : "text-rose-500"}`}>
                                        {isPremium ? "Unlimited" : `${remainingPosts} Left`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <PostRecipeForm user={user} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddRecipePage;