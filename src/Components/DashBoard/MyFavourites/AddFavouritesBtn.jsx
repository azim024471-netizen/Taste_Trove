
'use client';

import { postToAddFav } from '@/lib/server_actions/recipes';
import { toast } from '@heroui/react';
import { useState } from 'react';
import { FaRegBookmark } from 'react-icons/fa';

const AddFavouritesBtn = ({ recipe, user }) => {

  const handleAddToFavorite = async () => {
    const favoriteData = {
      recipeId: recipe._id,
      recipeName: recipe.recipeName,
      recipeImage: recipe.recipeImage,
      category: recipe.category,
      preparationTime: recipe.preparationTime,
      userId: user?.id

    };


    try {
     const result = await postToAddFav(favoriteData);
      if (result?.success) {

        toast.success('Added to Favorites!', {
          description: `${recipe.recipeName} added successfully.`,
        });
      } else {
        toast.warning('Already Added', {
          description:
            result?.message || 'Recipe already exists in favorites.',

        });
      }

    } catch (error) {
      toast.error('Failed', {
        description: error.message,
      });

    }
  };

  return (
    <button
      onClick={handleAddToFavorite}
      className="flex flex-col items-center justify-center gap-1 bg-white hover:bg-amber-50/50 border border-orange-100/60 rounded-xl py-2.5 text-zinc-700 hover:text-amber-600 transition-colors"
    >
      <FaRegBookmark className="text-base" />
      <span className="text-[10px] font-bold">
        Favorite
      </span>
    </button>
  );
};

export default AddFavouritesBtn;