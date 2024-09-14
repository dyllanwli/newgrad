// SearchInput.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SearchInput = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <>
      {/* Trigger button for search */}
      <button
        onClick={openSearch}
        className="focus:outline-none"
      >
        <span className="hidden md:inline">Search...</span>
        <span className="md:hidden">🔍</span>
      </button>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Blur */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeSearch}
          ></div>

          {/* Search Input Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white p-4 rounded-md shadow-lg z-10"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={closeSearch}
              className="absolute top-2 right-2 focus:outline-none"
            >
              ✖
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SearchInput;
