import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

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

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const toggleLocations = () => {
        setExpanded(!expanded);
    };

    const navigateToJob = () => {
        navigate(`/jobs/${job._id}`);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{job.position}</h3>
            <p>{job.company}</p>
            <div className="flex items-center">
                <p>{job.locations[0].city}, {job.locations[0].state}</p>
                {job.locations.length > 1 && (
                    <button onClick={toggleLocations} className="ml-2">
                        {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </button>
                )}
            </div>
            {expanded && job.locations.length > 1 && (
                <div>
                    {job.locations.slice(1).map((loc, index) => (
                        <p key={index}>{loc.city}, {loc.state}</p>
                    ))}
                </div>
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
                onClick={navigateToJob}
                className="mt-2 text-blue-500 hover:underline"
            >
                View Job Discussion
            </button>
        </div>
    );
};

export default JobCard;