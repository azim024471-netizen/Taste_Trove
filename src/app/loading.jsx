'use client'
import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-50">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="mb-8"
      >
        <div className="w-20 h-20 bg-linear-to-tr from-orange-500 to-rose-500 rounded-3xl shadow-lg flex items-center justify-center">
          <span className="text-5xl">🍳</span>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="text-2xl font-bold text-zinc-900"
      >
        Taste<span className="text-orange-600">Trove</span>
      </motion.h2>
      
      <p className="text-zinc-500 mt-2 tracking-widest uppercase text-sm">
        Preparing your kitchen...
      </p>

      <div className="w-48 h-1 bg-zinc-200 mt-6 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-orange-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default Loading;