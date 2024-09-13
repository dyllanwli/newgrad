import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { LogoText } from "../components/branding/LogoText";
import { useTranslation } from 'react-i18next';

interface FeatureProps {
  title: string;
  description: string;
  imageUrl: string;
}

interface SubFeatureProps {
  title: string;
  description: string;
  gradientColors: {
    from: string;
    via: string;
    to: string;
  };
  imageUrl?: string;
  index: number;
}

const LandingPageFeature: React.FC<FeatureProps> = ({ title, description, imageUrl }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (ref.current) {
      setElementTop(ref.current.offsetTop);
    }
  }, []);

  const y = useTransform(scrollY, [elementTop - 500, elementTop + 500], [0, -200]);

  return (
    <div ref={ref} className="relative w-full h-[70vh] overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[100vh]"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-8 text-center">
        <motion.h3
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-xl text-white max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
};

const SubFeature: React.FC<SubFeatureProps> = ({
  title,
  description,
  gradientColors,
  imageUrl,
  index
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className="w-full h-[60vh] relative overflow-hidden flex items-center p-8">
      <div
        className={`absolute inset-0 animate-gradient-pulse bg-gradient-to-br from-${gradientColors.from} via-${gradientColors.via} to-${gradientColors.to}`}
      />
      {imageUrl ? (
        <div className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center w-full max-w-6xl mx-auto relative z-10`}>
          <div className={`w-1/2 ${isEven ? 'pr-8' : 'pl-8'}`}>
            <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className={`w-1/2 ${isEven ? 'pl-8' : 'pr-8'}`}>
            <motion.h3
              className="text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {description}
            </motion.p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto relative z-10 text-center">
          <motion.h3
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default function LandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const FeatureItems = [
    {
      title: t('landingPage.feature1.title'),
      description: t('landingPage.feature1.description'),
      imageUrl: "https://i.postimg.cc/1zgqVtRL/0004.jpg"
    },
    {
      title: t('landingPage.feature2.title'),
      description: t('landingPage.feature2.description'),
      imageUrl: "https://i.postimg.cc/kgYS58CQ/0002.jpg"
    },
    {
      title: t('landingPage.feature3.title'),
      description: t('landingPage.feature3.description'),
      imageUrl: "https://i.postimg.cc/W11rj8Bp/0001.jpg"
    }
  ];

  const SubFeatureItems = [
    {
      title: t('landingPage.subFeature1.title'),
      description: t('landingPage.subFeature1.description'),
      gradientColors: {
        from: 'purple-100',
        via: 'yellow-100',
        to: 'blue-100'
      },
    },
    {
      title: t('landingPage.subFeature2.title'),
      description: t('landingPage.subFeature2.description'),
      gradientColors: {
        from: 'purple-100',
        via: 'pink-100',
        to: 'blue-100'
      },
      imageUrl: "https://i.postimg.cc/Xv1vMZmp/0005-resize.png"
    }
  ];
  return (
    <div className="flex flex-col">
      <div className="relative h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-blue-100 p-8 text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ y: 0 }}
          animate={{ y: -50 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
        </motion.div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Where <span className="text-purple-800">Dreams</span> and <span className="text-purple-800">Desires</span> Meet
          </motion.h1>
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl font-light mb-6 text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('landingPage.welcomeMessagePrefix')} <LogoText /> {t('landingPage.welcomeMessageSuffix')}
          </motion.h2>
          <motion.button
            className="px-8 py-3 bg-purple-500 text-white rounded-full text-lg font-bold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')} // Add onClick handler
          >
            {t('landingPage.getStarted')}
          </motion.button>
        </div>
      </div>

      {FeatureItems.flatMap((feature, index) => [
        <LandingPageFeature key={`feature-${index}`} title={feature.title} description={feature.description} imageUrl={feature.imageUrl} />,
        SubFeatureItems[index] && <SubFeature key={`sub-feature-${index}`}
          title={SubFeatureItems[index].title}
          description={SubFeatureItems[index].description}
          gradientColors={SubFeatureItems[index].gradientColors}
          imageUrl={SubFeatureItems[index].imageUrl}
          index={index}
        />
      ]).filter(Boolean)}

      <Footer />

    </div>
  );
}