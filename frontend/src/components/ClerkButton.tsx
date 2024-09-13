// import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ClerkButton = () => {
  const { t } = useTranslation();

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
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 rounded-full border-2 border-blue-500 hover:border-gray-300 transition-colors duration-300"
            }
          }}
        />
      </SignedIn>
    </div>
  );
};