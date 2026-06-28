import React from 'react';
import Link from 'next/link';
import { FaUtensils, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4 text-center">
      {/* Icon/Visual */}
      <div className="relative mb-8">
        <div className="bg-orange-100 text-orange-500 w-32 h-32 rounded-full flex items-center justify-center shadow-lg">
          <FaUtensils className="text-5xl animate-bounce" />
        </div>
        <div className="absolute -top-4 -right-4 bg-rose-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
          404
        </div>
      </div>

      <h1 className="text-6xl font-extrabold text-zinc-900 mb-4">Page Not Found</h1>
      <p className="text-zinc-600 text-lg mb-10 max-w-md">
        Looks like this recipe is missing from our kitchen! 
        We couldn't find the page you are looking for.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
        >
          <FaHome /> Go Back Home
        </Link>
        <Link 
          href="/explore" 
          className="flex items-center justify-center gap-2 bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 px-8 rounded-full transition-all duration-300"
        >
          Explore Recipes
        </Link>
      </div>
    </div>
  );
};

export default NotFound;