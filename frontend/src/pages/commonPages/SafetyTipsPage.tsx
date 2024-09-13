import { motion } from 'framer-motion';
import Footer from "../../components/Footer";
import { useTranslation } from 'react-i18next';

const SafetyTipsPage = () => {
    const { t } = useTranslation();

    const safetyTipsContent = [
        {
            type: 'header',
            content: t('safety.title'),
            description: t('safety.description'),
        },
        {
            type: 'section',
            title: t('safety.generalSafetyTitle'),
            content: t('safety.generalSafetyContent'),
        },
        {
            type: 'section',
            title: t('safety.onlineSafetyTitle'),
            content: t('safety.onlineSafetyContent'),
        },
        {
            type: 'section',
            title: t('safety.emergencyContactTitle'),
            content: t('safety.emergencyContactContent'),
        },
        // {
        //     type: 'image',
        //     title: t('safety.safetyImageTitle'),
        //     text: t('safety.safetyImageText'),
        //     image: t('safety.safetyImage'),
        // },
        // Add more sections as needed
    ];

    const renderContent = (item: any, index: any) => {
        switch (item.type) {
            case 'header':
                return (
                    <div key={index} className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-800 leading-tight"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {item.content}
                        </motion.h1>
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-6 text-gray-700 leading-relaxed"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {item.description}
                        </motion.p>
                    </div>
                );
            case 'section':
                return (
                    <div key={index} className="mb-8">
                        <motion.h2
                            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 * index }}
                        >
                            {item.title}
                        </motion.h2>
                        <motion.p
                            className="text-base sm:text-lg text-gray-600 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                        >
                            {item.content}
                        </motion.p>
                    </div>
                );
            case 'image':
                return (
                    <div key={index} className="mb-8">
                        <motion.h2
                            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 * index }}
                        >
                            {item.title}
                        </motion.h2>
                        <motion.p
                            className="text-base sm:text-lg text-gray-600 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                        >
                            {item.text}
                        </motion.p>
                        <motion.img
                            src={item.image}
                            alt="safety"
                            className="w-full h-auto rounded-lg shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 * (index + 2) }}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col">
            <div className="relative min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-red-100 to-yellow-100 p-4 sm:p-8 text-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ y: 0 }}
                    animate={{ y: -50 }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                />
                {renderContent(safetyTipsContent[0], 0)}
            </div>

            <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full">
                {safetyTipsContent.slice(1).map((item, index) => renderContent(item, index + 1))}
            </div>

            <Footer />
        </div>
    );
};

export default SafetyTipsPage;