// /src/components/Header.tsx

import React, { useState } from 'react';
import { ClerkButton } from '../ClerkButton';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../branding/Logo';
import { useAuth } from '@clerk/clerk-react';
import FullScreenDialog from "../ui/FullScreenDialog";

const navItems = [
  { label: 'header.community', href: '/community' },
  { label: 'header.postjob', href: '/postjob', requiresAuth: true },
  { label: 'header.myapply', href: '/myapply', requiresAuth: true },
];

interface NavigationItem {
  label: string;
  href: string;
  color?: string;
  requiresAuth?: boolean;
}

interface NavigationProps {
  isOpen: boolean;
  navItems: NavigationItem[];
  toggleMenu: () => void;
  toggleSignIn: () => void;
  activeItem: string;
  setActiveItem: (label: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, navItems, toggleMenu, toggleSignIn, activeItem, setActiveItem }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth(); // Use the useAuth hook

  const handleNavigation = (item: NavigationItem) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (item.requiresAuth && !isSignedIn) {
      toggleSignIn();
    } else {
      navigate(item.href);
      setActiveItem(item.label);
    }
    toggleMenu();
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: { height: 'auto', opacity: 1 },
        closed: { height: 0, opacity: 0 },
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="md:flex md:items-center md:space-x-4 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center py-1 md:py-0">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={handleNavigation(item)}
            className={`block ml-1 py-1 px-4 md:text-base font-bold rounded-full ease-in-out whitespace-nowrap ${activeItem === item.label ? 'text-white bg-purple-800' : 'hover:bg-opacity-80 hover:text-gray-500'} `}
          >
            {t(item.label)}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setActiveItem('');
  };

  const toggleSignIn = () => {
    setShowSignInPrompt(!showSignInPrompt);
  };

  return (
    <header className="bg-pale-blue">
      <div className="container mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        <div className="flex items-center">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <Logo />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
            <Navigation isOpen={true} navItems={navItems} toggleMenu={() => { }} toggleSignIn={toggleSignIn} activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>

          <ClerkButton />

          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="focus:outline-none p-2 rounded-md hover:bg-gray-200"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <Navigation isOpen={isMenuOpen} navItems={navItems} toggleMenu={toggleMenu} toggleSignIn={toggleSignIn} activeItem={activeItem} setActiveItem={setActiveItem} />
          </motion.div>
        )}
      </AnimatePresence>

      <FullScreenDialog
        isOpen={showSignInPrompt}
        onClose={toggleSignIn}
        title="Sign In Required"
        description="Please sign in to access. Don't miss out on the fun! 🎉"
      />
    </header>
  );
};

export default Header;