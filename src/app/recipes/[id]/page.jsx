import React from 'react';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaRegClock, FaGlobe, FaUtensils, FaRegBookmark, FaRegFlag, FaCreditCard } from 'react-icons/fa';
import { getRecipeById } from '@/lib/api_actions/recipe_api';
import AddFavouritesBtn from '@/Components/DashBoard/MyFavourites/AddFavouritesBtn';
import { getUserSession } from '@/lib/core_function/server';
import ReportModal from '@/Components/Recepies/ReportModal';
import RecipePurchaseBtn from '@/Components/DashBoard/MyRecpies/RecipePurchaseBtn';

const RecpieDetailsPage = async ({ params }) => {
    const { id } = await params;

    const session = await getUserSession();
    const user = session?.user


    const data = await getRecipeById(id)

    if (!data) {
        return <div className="min-h-screen bg-white flex items-center justify-center text-zinc-500">Recipe not found.</div>;
    }

    const { recipeName, category, cuisineType, preparationTime, difficultyLevel, ingredients,
        servings, instructions, recipeImage, authorName, likesCount, } = data;

    const formattedCuisine = cuisineType?.replace(/_/g, ' ');
    const formattedServings = servings?.replace('_people', ' People');

    return (
        <div className="min-h-screen bg-white text-zinc-900 antialiased py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">

                        <div className="relative w-full aspect-16/10 sm:aspect-video rounded-3xl overflow-hidden bg-zinc-100 shadow-sm">
                            <Image
                                src={recipeImage}
                                alt={recipeName}
                                fill
                                priority
                                className="object-cover "
                            />

                            <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                {category}
                            </span>
                        </div>

                        <div className="bg-[#FCF9F8] rounded-2xl p-6 border border-orange-100/30">
                            <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-rose-500 rounded-full inline-block"></span>
                                Ingredients
                            </h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {ingredients?.map((ingredient, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
                                        <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0"></span>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#FCF9F8] rounded-2xl p-6 border border-orange-100/30">
                            <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-rose-500 rounded-full inline-block"></span>
                                Cooking Instructions
                            </h2>
                            <p className="text-sm text-zinc-600 leading-relaxed font-medium whitespace-pre-line">
                                {instructions}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="bg-[#FFF8F5] border border-orange-100/40 p-6 rounded-3xl
                          sticky top-6 flex flex-col gap-5">

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1">
                                    <FaGlobe /> {formattedCuisine}
                                </span>
                                <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-xs font-bold text-zinc-700 border border-orange-100/40">
                                    <FaHeart className="text-rose-500" />
                                    <span>{likesCount} Likes</span>
                                </div>
                            </div>

                            <div>
                                <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-1">
                                    {recipeName}
                                    premiere</h1>
                                <p className="text-xs text-zinc-400 font-medium">By Chef: <span className="text-zinc-700 font-bold">{authorName}</span></p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-2xl border border-orange-100/20 text-xs font-semibold text-zinc-600">
                                <div className="flex items-center gap-2">
                                    <FaRegClock className="text-zinc-400 text-base" />
                                    <div>
                                        <p className="text-[10px] text-zinc-400 font-medium uppercase">Time</p>
                                        <p className="text-zinc-800">{preparationTime} mins</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUtensils className="text-zinc-400 text-sm" />
                                    <div>
                                        <p className="text-[10px] text-zinc-400 font-medium uppercase">Servings</p>
                                        <p className="text-zinc-800 capitalize">{formattedServings}</p>
                                    </div>
                                </div>
                                <div className="col-span-2 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                                    <span className="text-zinc-400 font-medium uppercase">Difficulty Level:</span>
                                    <span className="px-2.5 py-0.5 rounded-md font-bold text-xs bg-emerald-100 text-emerald-700 capitalize">
                                        {difficultyLevel}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2.5 pt-2 border-t border-orange-100/30">

                                {/* <button className="w-full bg-rose-500 hover:bg-zinc-800 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98">
                                    <FaCreditCard className="text-xs" />
                                    <span>Purchase Recipe (2.99$) </span>
                                </button> */}


                                <RecipePurchaseBtn recipe={data} user={user} />



                                <div className="grid grid-cols-3 gap-2">

                                    <button className="flex flex-col items-center justify-center gap-1 bg-white hover:bg-rose-50/50 border border-orange-100/60 rounded-xl py-2.5 text-zinc-700 hover:text-rose-500 transition-colors">
                                        <FaRegHeart className="text-base" />
                                        <span className="text-[10px] font-bold">Like</span>
                                    </button>



                                    <AddFavouritesBtn recipe={data} user={user}> </AddFavouritesBtn>



                                    <ReportModal recipe={data} user={user} ></ReportModal>


                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RecpieDetailsPage;