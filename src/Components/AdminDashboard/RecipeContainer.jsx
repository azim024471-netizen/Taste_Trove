"use client";

import React, { useState } from 'react';
import { Button, toast } from "@heroui/react";
import Image from 'next/image';
import { 
  FaEye, 
  FaCheckCircle, 
  FaHeart, 
  FaRegClock 
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import UpdateRecpieModal from '../DashBoard/MyRecpies/UpdateRecpieModal';
import DeleteRecpieModal from '../DashBoard/MyRecpies/DeleteRecpieModal';
import { setFeature } from '@/lib/server_actions/feature';

export default function RecipeContainer({ initialRecipes }) {


  const [recipes, setRecipes] = useState(initialRecipes);
  const [loadingId, setLoadingId] = useState(null);
  const router = useRouter();
   console.log(initialRecipes, 'from error page 22222222222222222')
  console.log(recipes ,  'from error page 3333333333333333333333')


  const handleViewDetails = (recipeId) => {
    router.push(`/recipes/${recipeId}`);
  };

  const handleToggleFeature = async (recipeId, currentFeaturedStatus) => {
    const newStatus = !currentFeaturedStatus;
    setLoadingId(recipeId);

    try {
      await setFeature(recipeId, newStatus);

      setRecipes(prev => prev.map(recipe => 
        (recipe._id === recipeId || recipe.id === recipeId) 
          ? { ...recipe, isFeatured: newStatus } 
          : recipe
      ));

      toast.success("Recipe Status Updated!");
    } catch (error) {
      console.error("Error toggling feature status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const getDifficultyBadge = (level) => {
    const lvl = level?.toLowerCase();
    if (lvl === 'easy') return "bg-green-50 text-green-700 border-green-200";
    if (lvl === 'medium') return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-red-50 text-red-700 border-red-200";
  };


  return (
    <>
      <div className="hidden md:block overflow-hidden bg-white text-zinc-900 rounded-2xl shadow-sm border border-zinc-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 text-zinc-500 text-xs uppercase font-bold border-b border-zinc-200">
                <th className="p-4">Recipe</th>
                <th className="p-4">Author</th>
                <th className="p-4">Cuisine & Category</th>
                <th className="p-4">Stats</th>
                <th className="p-4 text-center">Featured Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {recipes.map((recipe) => {
                const formattedDate = new Date(recipe.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <tr key={recipe._id || recipe.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-200 shadow-sm flex-shrink-0">
                          <Image 
                            src={recipe.recipeImage || "https://images.unsplash.com/photo-1516934024742-b461fba47600"} 
                            alt={recipe.recipeName} 
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-800 text-sm">{recipe.recipeName}</span>
                          <span className={`inline-block w-fit px-2 py-0.5 mt-1 text-[11px] font-medium rounded border uppercase ${getDifficultyBadge(recipe.difficultyLevel)}`}>
                            {recipe.difficultyLevel}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-zinc-700 text-sm">{recipe.authorName}</span>
                        <span className="text-zinc-400 text-xs">{recipe.authorEmail}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-zinc-800 text-sm font-medium capitalize">{recipe.cuisineType?.replace('_', ' ')}</span>
                        <span className="text-zinc-400 text-xs capitalize">{recipe.category}</span>
                      </div>
                    </td>

                    <td className="p-4 text-zinc-600 text-sm">
                      <div className="flex flex-col gap-1 text-xs text-zinc-500">
                        <span className="flex items-center gap-1 font-semibold text-zinc-700">
                          <FaHeart className="text-red-500" size={11} /> {recipe.likesCount} Likes
                        </span>
                        <span className="flex items-center gap-1">
                          <FaRegClock size={11} /> {recipe.preparationTime} mins
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <Button
                        size="sm"
                        variant="flat"
                        isDisabled={loadingId === (recipe._id || recipe.id)}
                        onPress={() => handleToggleFeature(recipe._id || recipe.id, recipe.isFeatured)}
                        className={`font-bold rounded-full border transition-all duration-200 shadow-sm px-4 ${
                          recipe.isFeatured 
                            ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100/80" 
                            : "bg-zinc-100 text-zinc-500 border-zinc-200 hover:bg-zinc-200/80"
                        }`}
                      >
                        <FaCheckCircle size={12} className={recipe.isFeatured ? "text-amber-500" : "text-zinc-400"} />
                        {recipe.isFeatured ? 'Featured' : 'Regular'}
                      </Button>
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => handleViewDetails(recipe._id || recipe.id)}
                          className="font-bold rounded-xl bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200 px-3 shadow-sm"
                        >
                          <FaEye size={13} className="text-zinc-500" />
                          View
                        </Button>

                        <UpdateRecpieModal recipe={recipe} isAdmin={true} />
                        <DeleteRecpieModal recipe={recipe} isAdmin={true} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
        {recipes.map((recipe) => (
          <div key={recipe._id || recipe.id} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex gap-3 items-center">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-zinc-200 shadow-sm flex-shrink-0">
                <Image 
                  src={recipe.recipeImage || "https://images.unsplash.com/photo-1516934024742-b461fba47600"} 
                  alt={recipe.recipeName} 
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-zinc-800 text-base truncate">{recipe.recipeName}</span>
                <span className="text-zinc-400 text-xs truncate">by {recipe.authorName}</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Category</span>
                <span className="font-medium text-zinc-700 capitalize">{recipe.category}</span>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Status (Click to toggle)</span>
                <button 
                  disabled={loadingId === (recipe._id || recipe.id)}
                  onClick={() => handleToggleFeature(recipe._id || recipe.id, recipe.isFeatured)}
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border transition-all ${
                    recipe.isFeatured ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-zinc-100 text-zinc-500 border-zinc-200"
                  }`}
                >
                  {recipe.isFeatured ? 'Featured' : 'Regular'}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="solid"
                className="flex-1 bg-zinc-900 text-white font-bold rounded-xl text-xs"
                onPress={() => handleViewDetails(recipe._id || recipe.id)}
              >
                <FaEye /> View Details
              </Button>

              <UpdateRecpieModal recipe={recipe} isAdmin={true} />
              <DeleteRecpieModal recipe={recipe} isAdmin={true} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}