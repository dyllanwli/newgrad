import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import JobList from './jobs/JobList';

const Search = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/jobs?page=${currentPage}&limit=8`);
                const data = await response.json();
                setJobs(data.jobs);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, [currentPage]);

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

export default Search;