// src/pages/JobSearchPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import JobList from '../components/jobs/JobList';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const JobSearchPage: React.FC = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    useEffect(() => {
        const fetchJobs = async () => {
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
            }
        };
        fetchJobs();
    }, [currentPage, search]);

    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <SearchBar />
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
