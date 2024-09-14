import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Search from '../components/Search';
import Footer from '../components/Footer';

export default function SearchPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">
            <Search />
            <Footer />
        </div>
    );
}