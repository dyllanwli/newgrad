import React from 'react';

interface ProgressBarProps {
  isLoading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isLoading }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-1 ${isLoading ? 'bg-blue-500' : 'bg-transparent'} transition-all duration-300`}>
      {isLoading && <div className="h-full bg-purple-700 animate-pulse"></div>}
    </div>
  );
};

export default ProgressBar;