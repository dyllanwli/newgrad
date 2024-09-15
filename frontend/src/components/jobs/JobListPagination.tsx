import React from 'react';
import PageNumber from './PageNumber';

interface JobListPaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

const JobListPagination: React.FC<JobListPaginationProps> = ({ currentPage, setCurrentPage, totalPages }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 10;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <PageNumber
                        key={i}
                        pageNumber={i}
                        currentPage={currentPage}
                        onClick={() => setCurrentPage(i)}
                    />
                );
            }
        } else {
            const leftSide = Math.max(1, currentPage - 2);
            const rightSide = Math.min(totalPages, currentPage + 2);

            if (leftSide > 1) {
                pageNumbers.push(
                    <PageNumber
                        key={1}
                        pageNumber={1}
                        currentPage={currentPage}
                        onClick={() => setCurrentPage(1)}
                    />
                );
                if (leftSide > 2) {
                    pageNumbers.push(
                        <button
                            key="left-ellipsis"
                            className="px-4 py-2 bg-gray-200"
                            onClick={() => setCurrentPage(Math.floor((1 + leftSide) / 2))}
                        >
                            ...
                        </button>
                    );
                }
            }

            for (let i = leftSide; i <= rightSide; i++) {
                pageNumbers.push(
                    <PageNumber
                        key={i}
                        pageNumber={i}
                        currentPage={currentPage}
                        onClick={() => setCurrentPage(i)}
                    />
                );
            }

            if (rightSide < totalPages) {
                if (rightSide < totalPages - 1) {
                    pageNumbers.push(
                        <button
                            key="right-ellipsis"
                            className="px-4 py-2 bg-gray-200"
                            onClick={() => setCurrentPage(Math.floor((rightSide + totalPages) / 2))}
                        >
                            ...
                        </button>
                    );
                }
            }
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-l disabled:opacity-50"
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-r disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default JobListPagination;