import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={`bg-white shadow-md rounded p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;