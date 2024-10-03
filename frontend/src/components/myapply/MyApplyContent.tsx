import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserJobApplication } from './types';
import { useAuth } from '@clerk/clerk-react';
import ProgressBar from '../ui/ProgressBar';

const MyApplyContent: React.FC = () => {
    const [applications, setApplications] = useState<UserJobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const { getToken } = useAuth();
    const [expandedPosition, setExpandedPosition] = useState<string | null>(null);

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

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const togglePosition = (id: string) => {
        setExpandedPosition(expandedPosition === id ? null : id);
    };

    return (
        <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-white overflow-auto' : 'container mx-auto px-4 py-8'}`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Job Applications</h2>
                <button
                    onClick={toggleFullScreen}
                    className={`font-bold py-2 px-4 rounded hidden sm:block ${isFullScreen ? 'text-black' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    {isFullScreen ? 'Exit' : 'View All'}
                </button>
            </div>
            <ProgressBar isLoading={isLoading} />
            {applications.length === 0 ? (
                <p className="text-gray-600">No applications yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                                <th className="px-4 text-left">Company</th>
                                <th className="px-4 text-left">Position</th>
                                <th className="px-4 text-left">Status</th>
                                <th className="px-4 text-left">Updated At</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {applications.map((app) => (
                                <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{app.job?.company_name}</td>
                                    <td 
                                        className="py-3 px-6 text-left whitespace-nowrap cursor-pointer"
                                        onClick={() => togglePosition(app.id)}
                                    >
                                        {expandedPosition === app.id
                                            ? app.job?.position || app.job_title
                                            : ((app.job?.position || app.job_title) || '').slice(0, 15) + ((app.job?.position || app.job_title)?.length > 15 ? '...' : '')}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <span className={`font-medium ${getStatusColor(app.status)}`}>{app.status}</span>
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{new Date(app.applied_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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