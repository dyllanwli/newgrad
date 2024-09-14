import React from 'react';
import Footer from "../components/Footer";
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/landingPage/HeroSection';
import Search from '../components/Search';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="md:flex md:flex-1 md:justify-center">
        <Search />
      </div>
      <Footer />
    </div>
  );
}