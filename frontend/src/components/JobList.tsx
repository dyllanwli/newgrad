import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    jobsPerPage: number;
}

const JobList: React.FC<JobListProps> = ({ jobs, currentPage, setCurrentPage, jobsPerPage }) => {
    const navigate = useNavigate();
    const totalPages = Math.ceil(jobs.length / jobsPerPage);
    const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

    const navigateToJob = (jobId: string) => {
        navigate(`/jobs/${jobId}`);
    };

    const toggleLocationList = (jobId: string) => {
        setExpandedJobId(expandedJobId === jobId ? null : jobId);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {jobs.map((job) => (
                    <div key={job._id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">{job.position}</h3>
                        <p>{job.company}</p>
                        <button onClick={() => toggleLocationList(job._id)} className="text-blue-500 hover:underline">
                            Locations {expandedJobId === job._id ? '▲' : '▼'}
                        </button>
                        {expandedJobId === job._id && (
                            <p>{job.locations.map(loc => `${loc.city}, ${loc.state}`).join(', ')}</p>
                        )}
                        {job.not_sponsor && <p>Does NOT offer Sponsorship</p>}
                        {job.us_citizen && <p>Requires U.S. Citizenship</p>}
                        <p>{job.views} views</p>
                        <p>{job.min_salary && job.max_salary ? `Salary: $${job.min_salary} - $${job.max_salary}` : 'Salary not specified'}</p>
                        <p>{job.date_posted}</p>
                        <a
                            href={job.expired ? '#' : job.apply_link}
                            className={`mt-2 inline-block px-4 py-2 rounded ${job.expired ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:underline'}`}
                            onClick={job.expired ? (e) => e.preventDefault() : undefined}
                        >
                            {job.expired ? 'Application Closed' : 'Apply Now'}
                        </a>
                        <button
                            onClick={() => navigateToJob(job._id)}
                            className="mt-2 text-blue-500 hover:underline"
                        >
                            View Job Discussion
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded-l disabled:opacity-50"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <React.Fragment key={index + 1}>
                        {(index + 1 === 1 || index + 1 === totalPages || Math.abs(currentPage - (index + 1)) <= 1) ? (
                            <button
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ) : (
                            (index + 1 === currentPage - 2 || index + 1 === currentPage + 2) && (
                                <span className="px-4 py-2">...</span>
                            )
                        )}
                    </React.Fragment>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-r disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default JobList;
