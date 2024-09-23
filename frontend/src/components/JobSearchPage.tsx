// src/pages/JobSearchPage.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import JobList from './jobs/JobList';
import JobSearchBar from './JobSearchBar';
import axios from 'axios';
import ProgressBar from './ui/ProgressBar'; 

const JobSearchPage: React.FC = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false); 
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true); 
            try {
                const response = await axios.get(`/api/jobs`, {
                    params: {
                        page: currentPage,
                        limit: 8,
                        search,
                    },
                });
                setJobs(response.data.jobs);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, [currentPage, search]);

    return (
        <div className="flex flex-col">
            <ProgressBar isLoading={isLoading} /> 
            <div className="flex justify-center py-4">
                <JobSearchBar />
            </div>
            <JobList
                jobs={jobs}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default JobSearchPage;
