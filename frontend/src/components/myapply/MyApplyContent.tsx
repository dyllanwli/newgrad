import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserJobApplication } from './types';
import { useAuth } from '@clerk/clerk-react';
import ProgressBar from '../ui/ProgressBar';

const MyApplyContent: React.FC = () => {
    const [applications, setApplications] = useState<UserJobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchJobApplications = async () => {
            try {
                setIsLoading(true);
                const token = await getToken();
                const response = await axios.get('/api/profile/job_applications', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setApplications(response.data.job_applications);
            } catch (error) {
                console.error('Error fetching job applications:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobApplications();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <ProgressBar isLoading={isLoading} />
            <h2 className="text-2xl font-bold mb-6">My Job Applications</h2>
            {applications.length === 0 ? (
                <p className="text-gray-600">No applications yet.</p>
            ) : (
                <ul className="space-y-4">
                    {applications.map((app) => (
                        <li key={app.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-2">{app.job_title}</h3>
                            <p className="text-gray-600 mb-2">{app.company_name}</p>
                            <p className="mb-2">
                                Status: <span className={`font-medium ${getStatusColor(app.status)}`}>{app.status}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Applied: {new Date(app.applied_at).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Position: {app.job?.position}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'text-yellow-600';
        case 'accepted':
            return 'text-green-600';
        case 'rejected':
            return 'text-red-600';
        default:
            return 'text-gray-600';
    }
};

export default MyApplyContent;