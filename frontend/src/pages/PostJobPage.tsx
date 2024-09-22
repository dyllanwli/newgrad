// frontend/src/pages/PostJobPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Footer from '@/components/Footer';
import { useAuth, useUser } from '@clerk/clerk-react';
import JobFieldset from '@/components/JobFieldset';
import FullScreenDialog from "@/components/FullScreenDialog";
import ProgressBar from '@/components/ui/ProgressBar';

const PostJobPage: React.FC = () => {
    const { getToken, isSignedIn } = useAuth();
    const { user } = useUser();

    const [formData, setFormData] = useState({
        position: '',
        company_id: '',
        company_name: '',
        locations: [{
            city: "",
            state: "",
            country: "",
        }],
        not_sponsor: false,
        us_citizen: false,
        internship: false,
        remote: false,
        expired: false,
        apply_link: '',
        min_salary: 70000,
        max_salary: 90000,
        tags: [],
        posted_by: user?.id,
        description: ""
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignedIn) {
            return;
        }
        const token = await getToken();
        console.log(formData);
        setIsLoading(true);
        try {
            await axios.post('/api/post_job_request', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error creating job post:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <ProgressBar isLoading={isLoading} />
            <div className="flex justify-center py-8">
                <JobFieldset
                    Job={formData}
                    title={"Post a Job"}
                    buttonTitle={"Post Job"}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            <Footer />
            <FullScreenDialog
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    window.location.reload();
                }}
                title="Job Posted Successfully"
                description="Your job has been added and is awaiting review."
            />
        </div>
    );
};

export default PostJobPage;