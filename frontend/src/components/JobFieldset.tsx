// frontend/src/components/JobFieldset.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Input, Fieldset, Field, Label, Legend, Button, Switch, Combobox, ComboboxOption, ComboboxOptions, ComboboxInput } from '@headlessui/react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Job, Company } from "./jobs/types";
import { NumericFormat } from 'react-number-format';
import { useAuth } from '@clerk/clerk-react';
import { JOBTAGS } from './constants/Tags';
import MarkdownEditor from './ui/markdown/MarkdownEditor';
import axios from 'axios';


interface JobFieldsetProps {
    Job: Omit<Job, '_id'>; // Exclude _id from the Job interface
    title: string;
    buttonTitle: string;
    handleChange: (e: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const JobFieldset: React.FC<JobFieldsetProps> = ({ Job, title, buttonTitle, handleChange, handleSubmit }) => {
    const { getToken } = useAuth()
    const [companySuggestions, setCompanySuggestions] = useState<Company[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const [query, setQuery] = useState(Job.company_name || '');
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [createNewCompany, setCreateNewCompany] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);


    const fieldVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        if (query.length > 1) {
            // Debounce API call
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            debounceTimeout.current = setTimeout(async () => {
                try {
                    const token = await getToken();
                    const response = await axios.get(
                        `/api/companies/search?query=${encodeURIComponent(query)}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setCompanySuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching company suggestions:', error);
                }
            }, 300);
        } else {
            setCompanySuggestions([]);
        }

        // Cleanup on unmount
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [query, getToken]);

    const handleCompanySelect = (company: Company | null) => {
        if (company) {
            setSelectedCompany(company);
            handleChange({
                target: { name: 'company_id', value: company._id },
            });
            handleChange({
                target: { name: "company_name", value: company.title }
            });
        } else if (createNewCompany) {
            handleChange({
                target: { name: 'company_id', value: '' },
            });
            handleChange({
                target: { name: "company_name", value: query }
            });
        } else {
            handleChange({
                target: { name: 'company_id', value: '' },
            });
            handleChange({
                target: { name: "company_name", value: '' }
            });
        }
    };

    const handleTagChange = (tags: string[]) => {
        setSelectedTags(tags);
        handleChange({
            target: { name: 'tags', value: tags }
        });
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Fieldset>
                <Legend className="text-2xl font-bold mb-4">{title}</Legend>
                <motion.div
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
                >
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
                    <Field className="mb-4 relative">
                        <Combobox
                            value={selectedCompany}
                            onChange={handleCompanySelect}
                        >
                            <Label className="block text-sm font-medium text-gray-700">
                                Company Name
                            </Label>
                            <div className="relative mt-1">
                                <ComboboxInput
                                    className="w-full px-4 py-2 border rounded"
                                    onChange={(event) => {
                                        setQuery(event.target.value);
                                        setCreateNewCompany(false);
                                    }}
                                    displayValue={(company: Company) => (company ? company.title : '')}
                                    required
                                />
                                <ComboboxOptions
                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {query.length > 0 && (
                                        <ComboboxOption
                                            value={{ id: null, name: query }}
                                            className={({ focus }) =>
                                                `relative cursor-default select-none py-2 pl-3 pr-9 ${focus ? 'bg-purple-600 text-white' : 'text-gray-900'}`
                                            }
                                        >
                                            Create new company "{query}"
                                        </ComboboxOption>
                                    )}
                                    {companySuggestions.map((company) => (
                                        <ComboboxOption
                                            key={company._id}
                                            value={company}
                                            className={({ focus }) =>
                                                `relative cursor-default select-none py-2 pl-3 pr-9 ${focus ? 'bg-purple-600 text-white' : 'text-gray-900'}`
                                            }
                                        >
                                            {company.title}
                                        </ComboboxOption>
                                    ))}
                                </ComboboxOptions>
                            </div>
                        </Combobox>
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
                            <Label htmlFor="remote">Remote</Label>
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
                            <Label htmlFor="part_time">Part Time</Label>
                            <Switch
                                name="part_time"
                                checked={Job.part_time}
                                onChange={(checked) => handleChange({
                                    target: { name: 'part_time', value: checked }
                                })}
                                className={`${Job.part_time ? 'bg-purple-600' : 'bg-gray-200'}
                            ml-1 relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span
                                    className={`${Job.part_time ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                />
                            </Switch>
                        </div>
                    </Field>
                    <Field className="mb-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="internship">Internship</Label>
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
                    <Field className="mb-4">
                        <Label htmlFor="tags">Tags</Label>
                        <Listbox value={selectedTags} onChange={handleTagChange} multiple>
                            <div className="relative">
                                <ListboxButton className="w-full px-4 py-2 border rounded">
                                    {selectedTags.length > 0 ? selectedTags.join(', ') : 'Select tags'}
                                </ListboxButton>
                                <ListboxOptions className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {JOBTAGS.map((tag) => (
                                        <ListboxOption
                                            key={tag}
                                            value={tag}
                                            className={({ focus, selected }) =>
                                                `relative cursor-default select-none py-2 pl-3 pr-9 ${focus ? 'bg-purple-600 text-white' : 'text-gray-900'} ${selected ? 'font-semibold' : 'font-normal'}`
                                            }
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                        {tag}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-600">
                                                            <Check className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </div>
                        </Listbox>
                    </Field>
                    <Field className="mb-4">
                        <Label htmlFor="description">Job Description</Label>
                        <MarkdownEditor
                            value={Job.description || ''}
                            onChange={(value) => handleChange({
                                target: { name: 'description', value: value }
                            })}
                        />
                    </Field>
                    <Button
                        type="submit"
                        className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition-colors duration-300"
                    >
                        {buttonTitle}
                    </Button>
                </motion.div>
            </Fieldset>
        </motion.form>
    );
};

export default JobFieldset;