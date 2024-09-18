// /src/components/jobs/JobCard.tsx

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from './types';
import { formatDistanceToNow } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import { Button } from '@headlessui/react'

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleLocations = () => {
        setExpanded(!expanded);
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
                    <h3 className="text-lg font-bold mb-1">{job.position}</h3>
                    <div className="flex items-center mb-1">
                        <p className="font-bold text-gray-600 mr-4">{job.company_name}</p>
                        <p className="text-gray-700">{job.locations[0].city}, {job.locations[0].state}</p>
                        {job.locations.length > 1 && (
                            <Button onClick={toggleLocations} className="ml-2 text-gray-500 hover:text-gray-700">
                                {expanded ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
                            </Button>
                        )}
                    </div>
                    <motion.div
                        initial={false}
                        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        {job.locations.slice(1).map((loc, index) => (
                            <p key={index} className="text-gray-600">{loc.city}, {loc.state}</p>
                        ))}
                    </motion.div>
                    <div className="flex flex-wrap items-center text-sm text-gray-600">
                        {job.not_sponsor && <p className="text-red-500 mr-2">Does NOT offer Sponsorship</p>}
                        {job.us_citizen && <p className="text-blue-500 mr-2">Requires U.S. Citizenship</p>}
                        <p className="mr-2">{job.company.views} views</p>
                        <p className="font-semibold mr-2">
                            {job.min_salary && job.max_salary ? `$${job.min_salary} - $${job.max_salary}` : 'Salary not specified'}
                        </p>
                        <p>Posted {formatDistanceToNow(fromZonedTime(job.created_at, "UTC"), { addSuffix: true })}</p>
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
                    <a
                        className="text-purple-600 text-center transition-colors duration-300 whitespace-nowrap"
                    >
                        View Discussion
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;