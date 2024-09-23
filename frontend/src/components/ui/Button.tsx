import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, className, children }) => {
  return (
    <button type={type} className={`px-4 py-2 bg-purple-500 font-bold text-white rounded-md ${className}`}>
      {children}
    </button>
  );
};

export default Button;