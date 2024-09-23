import React from 'react';

interface CommunitySearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommunitySearchBar: React.FC<CommunitySearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={onSearchChange}
      placeholder="Search discussions..."
      className="mb-4 p-2 border rounded"
    />
  );
};

export default CommunitySearchBar;
