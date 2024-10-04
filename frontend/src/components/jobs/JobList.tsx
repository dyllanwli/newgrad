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
}

const JobList: React.FC<JobListProps> = ({ jobs, currentPage, setCurrentPage, totalPages }) => {
    const navigate = useNavigate();

    const handleJobClick = (company_id: string) => {
        navigate(`/company/${company_id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Jobs</h2>
            <div className="space-y-4">
                {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                        <JobCard
                            job={job}
                            key={job._id}
                            handleJobClick={handleJobClick}
                        />
                    ))
                ) : (
                    <p>No jobs available at the moment.</p>
                )}
            </div>
            {jobs && jobs.length > 0 && (
                <div className="mt-8">
                    <JobListPagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </div>
    );
};

export default JobList;