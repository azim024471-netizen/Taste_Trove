import React from 'react';
import Link from 'next/link';
import { FaLock, FaHome } from 'react-icons/fa';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-rose-100 text-rose-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <FaLock className="text-4xl" />
        </div>

        <h1 className="text-5xl font-extrabold text-zinc-900 mb-4">Access Denied</h1>
        <p className="text-zinc-600 mb-8 text-lg">
          Oops! It seems like you don't have the permission to view this page. 
          The kitchen is locked for unauthorized personnel.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaHome /> Back to TasteTrove
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;