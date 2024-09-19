import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import { useAuth } from '@clerk/clerk-react';
import PostJobFieldset from '../components/PostJobFieldset';

const PostJobPage: React.FC = () => {
    const { getToken, isSignedIn } = useAuth();

    const [formData, setFormData] = useState({
        position: '',
        company_id: '',
        company_name: '',
        locations: [],
        expired: false,
        min_salary: 0,
        max_salary: 0,
        description: '',
        apply_link: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            alert('Please fill in all required fields.');
            return;
        }
        try {
            await axios.post('/api/jobs', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/home');
        } catch (error) {
            console.error('Error creating job post:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-center py-8">
                <PostJobFieldset
                    Job={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            <Footer />
        </div>
    );
};

export default PostJobPage;