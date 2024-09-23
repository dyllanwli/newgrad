import React from 'react';
import { motion } from 'framer-motion';
import { LogoText } from '../branding/LogoText';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="relative scale-75 flex flex-col items-start justify-center bg-pale-blue overflow-hidden">
      <div className="relative z-10 mx-auto flex flex-col md:flex-row items-center w-full md:w-4/5">
        <div className="flex flex-col items-start">
          <motion.h1
            className="text-xl sm:text-xl md:text-2xl font-bold mb-4 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('landingpage.section1.line1')}
          </motion.h1>
          <motion.h1
            className="text-xl sm:text-xl md:text-2xl font-bold mb-4 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('landingpage.section1.line2')} <LogoText />
          </motion.h1>
        </div>
        <motion.img
          src="https://placehold.co/200x200"
          alt="rocket-hero"
          className="hidden md:block w-full max-w-[300px] h-auto rounded-lg mt-8 md:mt-0 md:ml-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
