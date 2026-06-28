
import { myFavouritesRecpies } from '@/lib/api_actions/favourites';
import { getUserSession } from '@/lib/core_function/server';
import { FaHeart } from 'react-icons/fa';
import FavoritesTable from './FavoritesTable'; 

const page = async () => {
    const session = await getUserSession();
    const user = session?.user;
    const favoriteRecipes = await myFavouritesRecpies(user?.id) || [];
    console.log(myFavouritesRecpies, 'ofohwofhowwoohoihoi')
      
    return (
        <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-3 border-b border-orange-100 pb-4">
                <div className="p-2.5 bg-amber-50 rounded-xl text-rose-600">
                    <FaHeart className="text-2xl animate-pulse" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-800">My Favorites</h1>
                    <p className="text-sm text-zinc-500">Manage all your saved recipes in one place</p>
                </div>
            </div>

            <FavoritesTable favoriteRecipes={favoriteRecipes} />
        </div>
    );
};

export default page;  



