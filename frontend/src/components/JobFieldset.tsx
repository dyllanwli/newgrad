import React from 'react';
import { Fieldset, Field, Input, Label, Legend, Button, Switch } from '@headlessui/react';
import { Job } from "./jobs/types";
import { NumericFormat } from 'react-number-format';

interface JobFieldsetProps {
    Job: Omit<Job, '_id'>; // Exclude _id from the Job interface
    title: string;
    buttonTitle: string;
    handleChange: (e: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const JobFieldset: React.FC<JobFieldsetProps> = ({ Job, title, buttonTitle, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
            <Fieldset>
                <Legend className="text-2xl font-bold mb-4">{title}</Legend>
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
                {Job.locations.map((loc, index) => (
                    <div key={index} className="flex mb-4">
                        <Field className="mr-2 flex-grow">
                            <Label htmlFor={`city_${index}`}>City</Label>
                            <Input
                                type="text"
                                name={`city_${index}`}
                                value={loc.city}
                                onChange={(e) => handleChange({
                                    target: { name: 'locations', value: Job.locations.map((l, i) => i === index ? { ...l, city: e.target.value } : l) }
                                })}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                        <Field className="mr-2 flex-grow">
                            <Label htmlFor={`state_${index}`}>State</Label>
                            <Input
                                type="text"
                                name={`state_${index}`}
                                value={loc.state}
                                onChange={(e) => handleChange({
                                    target: { name: 'locations', value: Job.locations.map((l, i) => i === index ? { ...l, state: e.target.value } : l) }
                                })}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                        <Field className="flex-grow">
                            <Label htmlFor={`country_${index}`}>Country</Label>
                            <Input
                                type="text"
                                name={`country_${index}`}
                                value={loc.country || ''}
                                onChange={(e) => handleChange({
                                    target: { name: 'locations', value: Job.locations.map((l, i) => i === index ? { ...l, country: e.target.value } : l) }
                                })}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </Field>
                    </div>
                ))}
                <Button
                    type="button"
                    onClick={() => handleChange({
                        target: { name: 'locations', value: [...Job.locations, { city: '', state: '', country: '' }] }
                    })}
                    className="mb-4 text-blue-500"
                >
                    + Add Location
                </Button>
                <Field className="mb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="internship">Remote Work</Label>
                        <Switch
                            name="remote"
                            checked={Job.remote}
                            onChange={(checked) => handleChange({
                                target: { name: 'remote', value: checked }
                            })}
                            className={`${Job.remote ? 'bg-purple-600' : 'bg-gray-200'}
                            ml-1 relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${Job.remote ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                </Field>
                <Field className="mb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="internship">Is Internship</Label>
                        <Switch
                            name="internship"
                            checked={Job.internship}
                            onChange={(checked) => handleChange({
                                target: { name: 'internship', value: checked }
                            })}
                            className={`${Job.internship ? 'bg-purple-600' : 'bg-gray-200'}
                            ml-1 relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${Job.internship ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                </Field>
                <Field className="mb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="not_sponsor">Does Not offer Sponsorship</Label>
                        <Switch
                            name="not_sponsor"
                            checked={Job.not_sponsor}
                            onChange={(checked) => handleChange({
                                target: { name: 'not_sponsor', value: checked }
                            })}
                            className={`${Job.not_sponsor ? 'bg-purple-600' : 'bg-gray-200'}
                            ml-1 relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${Job.not_sponsor ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                </Field>
                <Field className="mb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="us_citizen">Require U.S. Citizenship</Label>
                        <Switch
                            name="us_citizen"
                            checked={Job.us_citizen}
                            onChange={(checked) => handleChange({
                                target: { name: 'us_citizen', value: checked }
                            })}
                            className={`${Job.us_citizen ? 'bg-purple-600' : 'bg-gray-200'}
                            ml-1 relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${Job.us_citizen ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                </Field>
                <Field className="mb-4">
                    <Label htmlFor="min_salary">Minimum Salary</Label>
                    <NumericFormat
                        thousandSeparator={true}
                        prefix="$ "
                        name="min_salary"
                        value={Job.min_salary}
                        onValueChange={(values: any) => handleChange({
                            target: { name: 'min_salary', value: values.value }
                        })}
                        className="w-full px-4 py-2 border rounded"
                    />
                </Field>
                <Field className="mb-4">
                    <Label htmlFor="max_salary">Maximum Salary</Label>
                    <NumericFormat
                        thousandSeparator={true}
                        prefix="$ "
                        name="max_salary"
                        value={Job.max_salary}
                        onValueChange={(values: any) => handleChange({
                            target: { name: 'max_salary', value: values.value }
                        })}
                        className="w-full px-4 py-2 border rounded"
                    />
                </Field>
                <Button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition-colors duration-300"
                >
                    {buttonTitle}
                </Button>
            </Fieldset>
        </form>
    );
};

export default JobFieldset;