import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Job {
    id: number;
    title: string;
    type: string;
    location: string;
    sponsor: boolean;
    views: number;
    upvote: number;
    downvote: number
}

interface JobListProps {
    jobs: Job[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    maxPages: number;
}

const JobList: React.FC<JobListProps> = ({ jobs, currentPage, setCurrentPage, maxPages }) => {
    const navigate = useNavigate();

    const navigateToJob = (jobId: string) => {
        navigate(`/jobs/${jobId}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p>{job.type}</p> {/* Full-time or Internship */}
                        <p>{job.location}</p>
                        <p>{job.sponsor ? 'Sponsored' : 'Not Sponsored'}</p>
                        <p>{job.views} views</p>
                        <button
                            onClick={() => navigateToJob(job.id)}
                            className="mt-2 text-blue-500 hover:underline"
                        >
                            View Job
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
                {Array.from({ length: maxPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, maxPages))}
                    disabled={currentPage === maxPages}
                    className="px-4 py-2 bg-gray-200 rounded-r disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default JobList;