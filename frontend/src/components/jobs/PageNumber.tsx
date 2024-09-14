import React from 'react';

interface PageNumberProps {
    pageNumber: number | string;
    currentPage: number;
    onClick: () => void;
}

const PageNumber: React.FC<PageNumberProps> = ({ pageNumber, currentPage, onClick }) => {
    const isCurrentPage = currentPage === pageNumber;
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 ${isCurrentPage ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
            {pageNumber}
        </button>
    );
};

export default PageNumber;