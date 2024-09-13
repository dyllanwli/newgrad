import React, { useState } from 'react';
import { ClerkButton } from './ClerkButton';
import { useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Logo from './branding/Logo';

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
    <nav
      className={`md:flex md:items-center md:space-x-4 transition-all duration-300 ease-in-out 
                  ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 md:opacity-100'} 
                  md:max-h-screen md:relative absolute top-full left-0 w-full md:w-auto 
                  overflow-hidden z-50`}
    >
      <div className="md:bg-none bg-gradient-to-r from-[#000080] to-[#800080]">
        <div className="flex flex-col md:flex-row items-start md:items-center py-2 px-4 md:p-0">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={handleNavigation(item.href)}
              className="block py-1 px-2 text-white text-lg md:text-lg hover:bg-white hover:bg-opacity-20 rounded transition-all duration-300 ease-in-out"
            >
              {t(item.label)}
            </a>
          ))}
          <div className="flex flex-col md:flex-row md:items-center mt-2 md:mt-0 space-y-2 md:space-y-0 md:space-x-2">
            <ClerkButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleLogoClick = () => {
    navigate(isSignedIn ? '/home' : '/');
  };

  return (
    <header className="relative z-50 shadow-lg bg-gradient-to-r from-[#000080] to-[#800080] animate-slow-pulse">
      <style>{`
        @keyframes slowPulse {
          50%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-slow-pulse {
          animation: slowPulse 10s ease-in-out infinite;
        }
      `}</style>
      <div className="container mx-auto flex flex-wrap items-center justify-between py-1.5 px-4 md:py-2.5 md:px-10 relative">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <Logo />
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleMenu}
              className="focus:outline-none p-1.5 rounded-full transition-all duration-300 bg-white bg-opacity-20 hover:bg-opacity-30"
            >
              {isMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>
        </div>
        <Navigation isOpen={isMenuOpen} navItems={navItems} toggleMenu={toggleMenu} />
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          style={{ top: 'var(--header-height, 48px)' }}
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;