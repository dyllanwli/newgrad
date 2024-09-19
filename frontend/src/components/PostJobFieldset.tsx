import React from 'react';
import { Fieldset, Field, Input, Label, Legend, Button } from '@headlessui/react';
import { Job } from "./jobs/types";

interface PostJobFieldsetProps {
    Job: Omit<Job, '_id'>; // Exclude _id from the Job interface
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const PostJobFieldset: React.FC<PostJobFieldsetProps> = ({ Job, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
            <Fieldset>
                <Legend className="text-2xl font-bold mb-4">Post a Job</Legend>
                <Field className="mb-4">
                    <Label htmlFor="position">Position</Label>
                    <Input
                        type="text"
                        name="position"
                        value={Job.position}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </Field>
                <Field className="mb-4">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                        type="text"
                        name="company_name"
                        value={Job.company_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </Field>
                <Field className="mb-4">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        type="text"
                        name="location"
                        value={Job.locations.map(loc => `${loc.city}, ${loc.state}`).join(', ')}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </Field>
                <Field className="mb-4">
                    <Label htmlFor="min_salary">Minimum Salary</Label>
                    <Input
                        type="number"
                        name="min_salary"
                        value={Job.min_salary}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </Field>
                <Field className="mb-4">
                    <Label htmlFor="max_salary">Maximum Salary</Label>
                    <Input
                        type="number"
                        name="max_salary"
                        value={Job.max_salary}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </Field>
                <Field className="mb-4">
                    <Label htmlFor="apply_link">Application Link</Label>
                    <Input
                        type="url"
                        name="apply_link"
                        value={Job.apply_link}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </Field>
                <Button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition-colors duration-300"
                >
                    Post Job
                </Button>
            </Fieldset>
        </form>
    );
};

export default PostJobFieldset;