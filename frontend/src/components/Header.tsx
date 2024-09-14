// src/components/Header.tsx
import React, { useState } from 'react';
import { ClerkButton } from './ClerkButton';
import { useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './branding/Logo';
import SearchBar from './SearchBar'; // Import the new SearchBar component

const navItems = [
  { label: 'header.home', href: '/home' },
  { label: 'header.find', href: '/find' },
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
      className="md:flex md:items-center md:space-x-4 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center py-1 md:py-0">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={handleNavigation(item.href)}
            className="block py-1 px-2 text-black md:text-base hover:bg-gray-200 rounded transition"
          >
            {t(item.label)}
          </a>
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
    navigate(isSignedIn ? '/home' : '/');
  };

  return (
    <header className="bg-pale-blue">
      <div className="container mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <Logo />
          </div>
        </div>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <SearchBar />
        </div>

        {/* Navigation and Menu */}
        <div className="flex items-center space-x-4">
          {/* Navigation Links (Desktop Only) */}
          <div className="hidden md:flex">
            <Navigation isOpen={true} navItems={navItems} toggleMenu={() => {}} />
          </div>

          {/* User Button */}
          <ClerkButton />

          {/* Hamburger Menu (Mobile Only) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none p-2 rounded-md hover:bg-gray-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <Navigation isOpen={isMenuOpen} navItems={navItems} toggleMenu={toggleMenu} />
          <div className="px-4 py-2">
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
