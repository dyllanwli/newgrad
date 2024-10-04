import React, { useState, useEffect, useCallback } from 'react';
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
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
    const [editingApplication, setEditingApplication] = useState<string | null>(null);

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

    const toggleSelecting = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event propagation
        setIsSelecting(!isSelecting);
        setSelectedApplications([]);
    };

    const toggleApplicationSelection = (e: React.MouseEvent, jobId: string) => {
        e.stopPropagation(); // Prevent event propagation
        setSelectedApplications(prev =>
            prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
        );
    };

    const deleteSelectedApplications = async () => {
        try {
            const token = await getToken();
            await axios.post('/api/profile/delete_job_applications', selectedApplications, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setApplications(prev => prev.filter(app => !selectedApplications.includes(app.job_id)));
            setSelectedApplications([]);
            setIsSelecting(false);
        } catch (error) {
            console.error('Error deleting job applications:', error);
        }
    };

    const handleStatusClick = (e: React.MouseEvent, jobId: string) => {
        e.stopPropagation(); // Stop event propagation
        setEditingApplication(jobId);
    };

    const updateJobApplication = useCallback(async (application: UserJobApplication, newStatus: string, newUpdatedAt: string) => {
        try {
            const token = await getToken();
            application.status = newStatus;
            application.updated_at = newUpdatedAt;
            
            await axios.post('/api/profile/update_job_applications', application, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setApplications(prev => prev.map(app => 
                app.job_id === application.job_id ? { ...app, ...application } : app
            ));
        } catch (error) {
            console.error('Error updating job application:', error);
        } finally {
            setEditingApplication(null);
        }
    }, [getToken]);

    return (
        <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-white overflow-auto' : 'w-full mx-auto px-4 py-8'}`}>
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={toggleSelecting}
                    className="font-bold py-1 px-2 rounded bg-blue-500 text-white hover:bg-blue-600 mr-2"
                >
                    {isSelecting ? 'Cancel' : 'Select'}
                </button>
                <button
                    onClick={toggleFullScreen}
                    className={`font-bold py-1 px-2 rounded hidden sm:inline-block ${isFullScreen ? 'text-black' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    {isFullScreen ? 'Exit' : 'View All'}
                </button>
            </div>
            <ProgressBar isLoading={isLoading} />
            {applications.length === 0 ? (
                <p className="text-gray-600">No applications yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-gray-500 uppercase text-sm leading-normal">
                                {isSelecting && <th className="px-4 text-left">Select</th>}
                                <th className="px-4 text-left">Company</th>
                                <th className="px-4 text-left">Position</th>
                                <th className="px-4 text-left">Status</th>
                                <th className="px-4 text-left">Updated At</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {applications.map((app) => (
                                <tr key={app.job_id} className="border-b border-gray-200 hover:bg-gray-100">
                                    {isSelecting && (
                                        <td className="py-3 px-6 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedApplications.includes(app.job_id)}
                                                onChange={(e) => toggleApplicationSelection(e as unknown as React.MouseEvent, app.job_id)}
                                                onClick={(e) => e.stopPropagation()} // Add this line
                                            />
                                        </td>
                                    )}
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{app.job?.company_name}</td>
                                    <td
                                        className="py-3 px-6 text-left whitespace-nowrap cursor-pointer"
                                        onClick={() => togglePosition(app.job_id)}
                                    >
                                        {expandedPosition === app.job_id
                                            ? app.job?.position || app.job?.position || ''
                                            : ((app.job?.position || app.job?.position || '') || '').slice(0, 15) + ((app.job?.position || '')?.length > 15 ? '...' : '')}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {editingApplication === app.job_id ? (
                                            <select
                                                value={app.status}
                                                onChange={(e) => {
                                                    e.stopPropagation(); // Stop event propagation
                                                    updateJobApplication(app, e.target.value, app.updated_at);
                                                }}
                                                onClick={(e) => e.stopPropagation()} // Stop event propagation
                                                className="px-2 py-1 rounded text-xs font-semibold"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Accepted">Accepted</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Interview">Interview</option>
                                                <option value="Saved">Saved</option>
                                            </select>
                                        ) : (
                                            <span 
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)} cursor-pointer`}
                                                onClick={(e) => handleStatusClick(e, app.job_id)}
                                            >
                                                {app.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {editingApplication === app.job_id ? (
                                            <input
                                                type="date"
                                                value={new Date(app.updated_at).toISOString().split('T')[0]}
                                                onChange={(e) => {
                                                    e.stopPropagation(); // Stop event propagation
                                                    updateJobApplication(app, app.status, e.target.value);
                                                }}
                                                onClick={(e) => e.stopPropagation()} // Stop event propagation
                                                className="px-2 py-1 rounded text-xs"
                                            />
                                        ) : (
                                            <span 
                                                className="cursor-pointer"
                                                onClick={(e) => handleStatusClick(e, app.job_id)}
                                            >
                                                {new Date(app.updated_at).toLocaleDateString()}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {isSelecting && (
                <div className="mt-4">
                    <button
                        onClick={deleteSelectedApplications}
                        disabled={selectedApplications.length === 0}
                        className="font-bold py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Delete Selected ({selectedApplications.length})
                    </button>
                </div>
            )}
        </div>
    );
};

const getStatusColor = (status: string): string => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Accepted':
            return 'bg-green-100 text-green-800';
        case 'Rejected':
            return 'bg-red-100 text-red-800';
        case 'Interview':
            return 'bg-blue-100 text-blue-800';
        case 'Aaved':
            return 'bg-purple-100 text-purple-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default MyApplyContent;