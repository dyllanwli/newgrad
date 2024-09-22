import React from 'react';
import { LogoText } from '../branding/LogoText';

const WelcomeSection: React.FC = () => {
    return (
        <div className="text-center py-8">
            <h1 className="text-3xl font-bold">Welcome to <LogoText /> Community</h1>
            <p className="mt-4">We're happy to have you here. If you need help, please search before you post.</p>
        </div>
    );
};

export default WelcomeSection;