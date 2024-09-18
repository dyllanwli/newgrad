// import React from 'react';
// import { useTranslation } from 'react-i18next';

import SearchJobs from '../components/JobSearchPage';
import Footer from '../components/Footer';

export default function SearchPage() {
    // const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen">
            <SearchJobs />
            <Footer />
        </div>
    );
}