// JobList.tsx
import React from 'react';
import JobCard from './JobCard';
import JobListPagination from './JobListPagination';
interface Job {
    _id: string;
    position: string;
    company: string;
    locations: { state: string; city: string }[];
    not_sponsor?: boolean;
    us_citizen?: boolean;
    views: number;
    date_posted: string;
    expired: boolean;
    apply_link: string;
    min_salary?: number;
    max_salary?: number;
}

interface JobListProps {
    jobs: Job[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

const JobList: React.FC<JobListProps> = ({ jobs, currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
            <JobListPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default JobList;