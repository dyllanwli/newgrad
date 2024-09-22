import React from 'react';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, children }) => {
  return (
    <button className={`px-4 py-2 bg-purple-500 text-white rounded-md ${className}`}>
      {children}
    </button>
  );
};

export default Button;