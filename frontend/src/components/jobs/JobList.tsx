import React from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import JobListPagination from './JobListPagination';
import { Job } from './types';

interface JobListProps {
    jobs: Job[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    handleTagClick?: (tag: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, currentPage, setCurrentPage, totalPages, handleTagClick }) => {
    const navigate = useNavigate();

    const handleJobClick = (company_id: string) => {
        navigate(`/jobs/${company_id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Jobs</h2>
            <div className="space-y-4">
                {jobs.map((job) => (
                    <JobCard
                        job={job}
                        key={job._id}
                        handleJobClick={handleJobClick}
                        handleTagClick={handleTagClick || (() => { })} // Provide a default function
                    />))}
            </div>
            <div className="mt-8">
                <JobListPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};

export default JobList;