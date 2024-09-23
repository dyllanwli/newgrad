// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Globe } from 'lucide-react';

// const LanguageSwitcher = () => {
//     const { i18n, t } = useTranslation();
//     const [isOpen, setIsOpen] = useState(false);

//     const changeLanguage = (lng: string) => {
//         i18n.changeLanguage(lng);
//     };

//     const languageOptions = [
//         { value: 'en', label: 'English' },
//         { value: 'zh', label: '简体中文' },
//         // Add more languages as needed
//     ];

//     return (
//         <>
//             <button
//                 className="flex items-center space-x-1 text-black hover:text-gray-800"
//                 onClick={() => setIsOpen(true)}
//             >
//                 <Globe/> 
//                 <span>中文/English</span>
//             </button>
//         </>
//     );
// };

// export default LanguageSwitcher;