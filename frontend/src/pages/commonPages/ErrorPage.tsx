import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-white mb-4">{t('errorPage.title')}</h1>
      <p className="text-xl text-white mb-8">{t('errorPage.description')}</p>
      <button
        onClick={handleBackToHome}
        className="bg-white text-pink-500 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-pink-100 transition duration-300 ease-in-out flex items-center"
      >
        <Home className="w-5 h-5 mr-2" />
        {t('errorPage.backButton')}
      </button>
    </div>
  );
};

export default ErrorPage;