import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Description, Field, Fieldset, Input, Label, Legend, Select, Textarea, Button } from '@headlessui/react';
import axios from 'axios';
import Footer from '../components/Footer';

const ShareJobsPage: React.FC = () => {
    const [formData, setFormData] = useState({
        position: '',
        company_name: '',
        location: '',
        min_salary: '',
        max_salary: '',
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
        try {
            await axios.post('/api/jobs', formData);
            navigate('/home');
        } catch (error) {
            console.error('Error creating job post:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-center py-8">
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                    <Fieldset>
                        <Legend className="text-2xl font-bold mb-4">Share a Job</Legend>
                        <Field className="mb-4">
                            <Label htmlFor="position">Position</Label>
                            <Input
                                type="text"
                                value={formData.position}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                        <Field className="mb-4">
                            <Label htmlFor="company_name">Company Name</Label>
                            <Input
                                type="text"
                                value={formData.company_name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                        <Field className="mb-4">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                        <Field className="mb-4">
                            <Label htmlFor="min_salary">Minimum Salary</Label>
                            <Input
                                type="number"
                                value={formData.min_salary}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                        <Field className="mb-4">
                            <Label htmlFor="max_salary">Maximum Salary</Label>
                            <Input
                                type="number"
                                value={formData.max_salary}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                        <Field className="mb-4">
                            <Label htmlFor="description">Job Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                        <Field className="mb-4">
                            <Label htmlFor="apply_link">Application Link</Label>
                            <Input
                                type="url"
                                value={formData.apply_link}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                        <Button
                            type="submit"
                            className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition-colors duration-300"
                        >
                            Share Job
                        </Button>
                    </Fieldset>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default ShareJobsPage;