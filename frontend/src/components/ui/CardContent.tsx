import React from 'react';

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export default CardContent;