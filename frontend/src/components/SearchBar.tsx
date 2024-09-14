// src/components/SearchBar.tsx
import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search for jobs..." }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!query) {
      setIsExpanded(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Implement your search logic here
      // For example, navigate to a search results page
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <motion.div
      className="relative flex items-center"
      animate={{ width: isExpanded ? 450 : 300 }} // Increased width for longer search bar
      transition={{ duration: 0.3 }}
    >
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full h-9 px-4 py-1 pl-10 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" // Decreased height
      />
      <Search
        className="absolute left-3 text-gray-500 cursor-pointer"
        size={20}
        onClick={handleSearch}
      />
    </motion.div>
  );
};

export default SearchBar;
