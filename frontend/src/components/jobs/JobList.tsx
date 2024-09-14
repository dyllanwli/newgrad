import React from 'react';
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
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Jobs</h2>
            <div className="space-y-4">
                {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
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