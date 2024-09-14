import React from 'react';
import { motion } from 'framer-motion';
import { LogoText } from '../branding/LogoText';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="relative h-[70vh] pt-16 pb-16 flex flex-col items-center justify-center bg-pale-blue p-4 sm:p-8 text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ y: 0 }}
        animate={{ y: -50 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
      </motion.div>
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center">
        <div className="flex flex-col items-center md:items-start">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('landingpage.section1.line1')}
          </motion.h1>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('landingpage.section1.line2')}
          </motion.h1>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LogoText />
          </motion.h1>
        </div>
        <motion.img
          src="https://placehold.co/200x200"
          alt="rocket-hero"
          className="w-full max-w-[300px] h-auto rounded-lg mt-8 md:mt-0 md:ml-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
