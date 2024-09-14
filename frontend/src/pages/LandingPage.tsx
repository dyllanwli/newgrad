import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { LogoText } from "../components/branding/LogoText";
import { useTranslation } from 'react-i18next';
import DottedFeatureSection from '../components/landingPage/DottedFeatureSection';

interface PlainFeatureItemProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}
const PlainFeatureItem: React.FC<PlainFeatureItemProps> = ({ imgSrc, imgAlt, title, description }) => (
  <div className="flex items-start">
    <img src={imgSrc} alt={imgAlt} className="mr-4" />
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-2 text-gray-800">
        {title}
      </h2>
      <p className="text-base md:text-lg lg:text-lg text-gray-600">
        {description}
      </p>
    </div>
  </div>
);


export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <div className="relative h-[70vh] pt-32 pb-32 flex flex-col items-center justify-center bg-pale-blue p-4 sm:p-8 text-center overflow-hidden">
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
            src="https://placehold.co/300x300"
            alt="rocket-hero"
            className="w-full max-w-[300px] h-auto rounded-lg mt-8 md:mt-0 md:ml-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>
        <button
          className="px-8 py-3 bg-blue-100 rounded-full text-lg font-bold hover:bg-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-8 max-w-xs w-full sm:w-auto"
        >
          Let's Talk
        </button>
      </div>
      <div className="bg-off-white py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full sm:w-3/4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 leading-tight">
              The one stop shop for all your digital professional needs
            </h1>
            <p className="text-lg md:text-xl font-medium mb-8 text-gray-600">
              Transforming your business's digital capacities and online presence to reflect how awesome you are! Meaningful results is our top priority at Stable Solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PlainFeatureItem
              imgSrc="https://placehold.co/64x64"
              imgAlt="AI tools icon"
              title="Custom AI Tools"
              description="Unlock the potential of artificial intelligence tailored specifically for your business needs. Together we can find focus on success to ensure your life easier."
            />
            <PlainFeatureItem
              imgSrc="https://placehold.co/64x64"
              imgAlt="Creative design icon"
              title="Creative Design"
              description="Our team can help you bring big aesthetics with the technology, delivering stunning websites and engaging apps like you’ve never seen before."
            />
            <PlainFeatureItem
              imgSrc="https://placehold.co/64x64"
              imgAlt="Digital full service icon"
              title="Digital Full Service"
              description="Turn your vision into reality! From setting up your digital presence to managing your online reputation, we’ve got you covered."
            />
            <PlainFeatureItem
              imgSrc="https://placehold.co/64x64"
              imgAlt="Relationship forward icon"
              title="Relationship Forward"
              description="Strong relationships are the foundation of success. We prioritize building lasting connections with our clients to ensure that their long-term goals are met."
            />
          </div>
        </div>
      </div>


      <div className="w-full h-60 bg-olive-green"></div>


      <div className="bg-off-white py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full sm:w-3/4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 leading-tight">
              Capabilities
            </h1>
            <p className="text-lg md:text-xl lg:text-xl font-medium mb-8 text-gray-600">
              Cutting-Edge Technologies, Tailor-Made Solutions Services By <LogoText />
            </p>
          </div>

          <DottedFeatureSection />


        </div>
      </div>



      <Footer />

    </div>
  );
}