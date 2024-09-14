'use client'
import React from 'react';
import { SignedIn, SignedOut, SignInButton, useAuth } from '@clerk/clerk-react';
import { LogIn, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
}


const CustomPage = () => {
  return (
    <div>
      <h1>Custom Profile Page</h1>
      <p>This is the custom profile page</p>
    </div>
  )
}

export const ClerkButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <div className="flex items-center justify-center p-2">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <LogIn size={20} />
            <span className="sm:inline">{t('app.signin')}</span>
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
      <button
        onClick={() => {
          signOut();
          navigate('/');
        }}
        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold text-sm py-1 px-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <span className="sm:inline">{t('app.signout')}</span>
      </button>
      </SignedIn>
    </div>
  );
};
