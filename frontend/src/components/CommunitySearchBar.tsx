import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommunitySearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommunitySearchBar: React.FC<CommunitySearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!searchTerm) {
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      className="relative flex items-center mb-4 max-w-full"
      animate={{ width: isExpanded ? '100%' : 300 }}
      transition={{ duration: 0.3 }}
    >
      <Search className="absolute left-3 text-gray-400" size={20} />
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search discussions..."
        className="w-full p-2 pl-10 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-purple-500 transition-all duration-300"
      />
    </motion.div>
  );
};

export default CommunitySearchBar;