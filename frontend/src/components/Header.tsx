import React, { useState } from 'react';
import { ClerkButton } from './ClerkButton';
import { useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './branding/Logo';
import SearchBar from './SearchBar';

const navItems = [
  { label: 'header.discuss', href: '/discuss' },
  { label: 'header.posting', href: '/postjobs' },
  { label: 'header.profile', href: '/profile' },
];

interface NavigationProps {
  isOpen: boolean;
  navItems: { label: string; href: string }[];
  toggleMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, navItems, toggleMenu }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigation = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(href);
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
          <motion.a
            key={index}
            href={item.href}
            onClick={handleNavigation(item.href)}
            className="block py-1 px-4 text-black md:text-base font-bold transition duration-200 ease-in-out hover:text-blue-500"
            variants={{
              open: { opacity: 1, y: 0 },
              closed: { opacity: 0, y: -20 },
            }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            {t(item.label)}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-pale-blue">
      <div className="container mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        <div className="flex items-center">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <Logo />
          </div>
        </div>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
            <Navigation isOpen={true} navItems={navItems} toggleMenu={() => {}} />
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
            <Navigation isOpen={isMenuOpen} navItems={navItems} toggleMenu={toggleMenu} />
            <div className="px-4 py-2">
              <SearchBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;