import React from 'react';
import { LogoText } from './branding/LogoText';

// Define the navigation items
const navigation = {
    resources: [
        { name: 'Blog', href: '/blog' },
    ],
    company: [
        { name: 'About Us', href: '/about-us' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-gray-600 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="mb-8 md:mb-0">
                        <LogoText />
                    </div>
                    {/* <button className="mt-0 text-blue-500 hover:underline focus:outline-none">
                        ☕️ <a href="https://www.buymeacoffee.com/lidiyaa03i" target="_blank" rel="noopener noreferrer">Support this site</a>
                    </button> */}
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p>&copy; {new Date().getFullYear()} NewGrad.works. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;