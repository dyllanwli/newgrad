import { useNavigate } from 'react-router-dom';
import { HomeIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">{t('errorPage.title')}</h1>
      <p className="text-lg text-gray-600 mb-6">{t('errorPage.description')}</p>
      <button
        onClick={handleBackToHome}
        className="bg-purple-500 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-400 transition duration-200"
      >
        <HomeIcon className="w-4 h-4 inline-block mr-1" />
        {t('errorPage.backButton')}
      </button>
    </div>
  );
};

export default ErrorPage;