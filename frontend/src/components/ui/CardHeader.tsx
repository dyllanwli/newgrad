import React from 'react';

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
  return <div className={`border-b pb-2 ${className}`}>{children}</div>;
};

export default CardHeader;