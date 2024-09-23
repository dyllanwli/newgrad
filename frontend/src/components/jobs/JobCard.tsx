// /src/components/jobs/JobCard.tsx

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from './types';
import { formatDistanceToNow } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import { Button } from '@headlessui/react';
import JobCardDescription from './JobCardDescription';
interface JobCardProps {
    job: Job;
    handleJobClick: (company_id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, handleJobClick }) => {
    const [expandedLocations, setExpandedLocations] = useState(false);

    const toggleLocations = () => {
        setExpandedLocations(!expandedLocations);
    };

    return (
        <motion.div
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-grow">
                    <h3 className="text-lg font-bold mb-1 cursor-pointer" onClick={() => handleJobClick(job.company_id)}>{job.position}</h3>
                    <div className="flex items-center mb-1">
                        <p className="font-bold text-gray-600 mr-4 cursor-pointer" onClick={() => handleJobClick(job.company_id)}>{job.company_name}</p>
                        {job.locations?.length > 0 && <p className="text-gray-700">{job.locations[0].city} {job.locations[0].state}</p>}
                        {job.locations.length > 1 && (
                            <Button onClick={toggleLocations} className="ml-2 text-gray-500 hover:text-gray-700">
                                {expandedLocations ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
                            </Button>
                        )}
                    </div>
                    <motion.div
                        initial={false}
                        animate={{ height: expandedLocations ? 'auto' : 0, opacity: expandedLocations ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        {job.locations.slice(1).map((loc, index) => (
                            <p key={index} className="text-gray-600">{loc.city} {loc.state}</p>
                        ))}
                    </motion.div>
                    <div className="flex flex-wrap items-center text-sm text-gray-600">
                        <p className="mr-2">{job.company?.views || 0} views</p>
                        {job.created_at && <p className="mr-2">Posted {formatDistanceToNow(fromZonedTime(job.created_at, "UTC"), { addSuffix: true })}</p>}
                        {job.min_salary && job.max_salary && (
                            <span className="bg-gray-200 font-semibold py-1 px-2 rounded mr-2">
                                ${job.min_salary} - ${job.max_salary}
                            </span>
                        )}
                        {job.not_sponsor && <span className="bg-red-500 text-white py-1 px-2 rounded mr-2">Does NOT offer Sponsorship</span>}
                        {job.us_citizen && <span className="bg-blue-500 text-white py-1 px-2 rounded mr-2">Requires U.S. Citizenship</span>}
                        {job.internship && <span className="bg-green-500 text-white py-1 px-2 rounded mr-2">Internship</span>}
                        {job.remote && <span className="bg-blue-500 text-white py-1 px-2 rounded mr-2">Remote</span>}
                        {job.part_time && <span className="bg-yellow-500 text-white py-1 px-2 rounded mr-2">Part-Time</span>}
                        {job.tags && job.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 font-semibold py-1 px-2 rounded mr-2" >{tag}</span>
                        ))}
                        {job.description && (
                            <JobCardDescription description={job.description} />
                        )}
                    </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 flex flex-col space-y-2 md:w-auto">
                    <a
                        href={job.expired ? '#' : job.apply_link}
                        className={`w-full sm:w-auto text-center py-2 px-4 rounded whitespace-nowrap ${job.expired
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-purple-600 font-bold hover:bg-purple-700 text-white transition-colors duration-300'
                            }`}
                        onClick={job.expired ? (e) => e.preventDefault() : undefined}
                    >
                        {job.expired ? 'Application Closed' : 'Apply Now'}
                    </a>
                    <p
                        onClick={() => handleJobClick(job.company_id)}
                        className="text-purple-600 text-center transition-colors duration-300 whitespace-nowrap bg-transparent border-none cursor-pointer"
                    >
                        View Discussion
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;