import React from 'react';

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => {
  return <h3 className={`text-xl font-bold ${className}`}>{typeof children === 'string' && children.length > 100 ? `${children.substring(0, 100)}...` : children}</h3>;
};

export default CardTitle;