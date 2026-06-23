'use client';

import { Button, Tooltip, Chip } from '@heroui/react';
import { FaEye, FaTrashAlt, FaUtensils, FaClock, FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { deleteFavouritRecpie } from '@/lib/server_actions/favourites_action';

const FavoritesTable = ({ favoriteRecipes }) => {
  const router = useRouter();


  const handleRemove = async (favId, recipeName) => {
    try {

      const data = await deleteFavouritRecpie(favId);

      if (data?.deletedCount > 0) {

        toast.success(`${recipeName} removed from favorites!`);

        router.refresh();

      } else {

        toast.error('Failed to remove recipe');

      }

    } catch (error) {

      console.error(error);

      toast.error('Something went wrong!');

    }
  };



  if (favoriteRecipes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-linear-to-br from-white via-orange-50/40 to-rose-50/30 p-10 sm:p-14 text-center shadow-lg">

          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-orange-200/20 blur-3xl">
          </div>
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-rose-200/20 blur-3xl"></div>

          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl
     bg-linear-to-br from-zinc-900 to-rose-500 shadow-xl shadow-orange-500/20">
            <FaUtensils className="text-4xl text-white" />

            <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center 
      rounded-full bg-white shadow-md">
              <FaHeart className="text-rose-600 animate-pulse" />
            </div>
          </div>

          <h3 className="text-3xl font-black text-zinc-800 tracking-tight">
            No Favorite Recipes Yet
          </h3>

          <p className="mt-3 text-zinc-500 max-w-md mx-auto leading-relaxed">
            Your collection is waiting to be filled. Discover delicious recipes,
            save your favorites, and build your personal cookbook.
          </p>



          <Link
            href="/recipes"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-zinc-900 to-rose-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <FaUtensils />
            Explore Recipes
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="w-full">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">
        {favoriteRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-2xl border border-zinc-100 shadow-sm
             hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
          >
            <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
              <Image
                src={recipe.recipeImage || "/placeholder.jpg"}
                alt={recipe.recipeName}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 z-10">
                <Chip
                  variant="solid"
                  size="sm"
                  className={`capitalize font-semibold shadow-sm text-white ${recipe.category === 'dinner' ? 'bg-indigo-600' :
                    recipe.category === 'breakfast' ? 'bg-emerald-600' :
                      'bg-amber-500'
                    }`}
                >
                  {recipe.category}
                </Chip>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-bold text-zinc-800 text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {recipe.recipeName}
                </h3>
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs mt-1.5 font-medium">
                  <FaClock className="text-orange-500/80" />
                  <span>{recipe.preparationTime} mins cook time</span>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-zinc-50 pt-3">
                <Link
                  href={`/recipes/${recipe.recipeId}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl py-2.5 transition-colors"
                >
                  <FaEye />
                  View Details
                </Link>
                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => handleRemove(recipe._id, recipe.recipeName)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md shadow-rose-600/10 transition-colors"
                  radius="lg"
                >
                  <FaTrashAlt size={13} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="hidden md:block bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase">Recipe Info</th>
                <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase">Category</th>
                <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase">Prep Time</th>
                <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-rose-100">
              {favoriteRecipes.map((recipe) => (
                <tr
                  key={recipe._id}
                  className="bg-zinc-50/60 hover:bg-white transition-all duration-200 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 min-w-14 rounded-xl overflow-hidden ring-2
                       ring-zinc-200 group-hover:ring-rose-400 transition-all shadow-sm">
                        <Image
                          src={recipe.recipeImage || "/placeholder.jpg"}
                          alt={recipe.recipeName}
                          width={56}
                          height={56}
                          priority={false}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-800 text-base group-hover:text-orange-600 transition-colors">
                          {recipe.recipeName}
                        </span>
                        <span className="text-xs text-zinc-400 mt-0.5">
                          ID: #{recipe.recipeId ? recipe.recipeId.slice(-6) : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <Chip
                      variant="flat"
                      size="sm"
                      className={`capitalize font-semibold rounded-lg px-2 py-1 ${recipe.category === 'dinner' ? 'bg-indigo-50 text-indigo-600' :
                        recipe.category === 'breakfast' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-amber-50 text-amber-600'
                        }`}
                    >
                      {recipe.category}
                    </Chip>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-zinc-700 font-medium text-sm">
                      <FaClock className="text-zinc-400" />
                      <span>{recipe.preparationTime} mins</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-3">

                      <Tooltip content="View Details" closeDelay={50} color="warning" size="sm" radius="md">
                        <Link
                          href={`/recipes/${recipe.recipeId}`}
                          className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                        >
                          <FaEye />
                        </Link>
                      </Tooltip>

                      <Tooltip content="Remove from Favorites" closeDelay={50} color="danger" size="sm" radius="md">
                        <Button
                          isIconOnly
                          size="md"
                          onClick={() => handleRemove(recipe._id, recipe.recipeName)}
                          className="bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md shadow-rose-600/10 transition-colors"
                          radius="xl"
                        >
                          <FaTrashAlt className="text-sm" />
                        </Button>
                      </Tooltip>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default FavoritesTable;