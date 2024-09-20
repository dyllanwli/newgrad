// frontend/src/pages/PostJobPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { useAuth } from '@clerk/clerk-react';
import JobFieldset from '../components/JobFieldset';

const PostJobPage: React.FC = () => {
    const { getToken, isSignedIn } = useAuth();

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
    });

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
        // Validation check
        if (!formData.position || !formData.company_name || !formData.locations || !formData.apply_link) {
            console.log('Please fill in all required fields.');
            return;
        }
        console.log(formData)
        try {
            await axios.post('/api/post_job_request', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating job post:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
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
        </div>
    );
};

export default PostJobPage;