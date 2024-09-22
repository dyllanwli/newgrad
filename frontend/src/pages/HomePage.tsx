import Footer from "@/components/Footer";
// import { useTranslation } from 'react-i18next';
import HeroSection from '@/components/landingPage/HeroSection';
import JobSearchPage from '@/components/JobSearchPage';

export default function HomePage() {
  // const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="md:flex md:flex-1 md:justify-center">
        <JobSearchPage />
      </div>
      <Footer />
    </div>
  );
}