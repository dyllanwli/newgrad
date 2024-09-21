import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@headlessui/react';
import MarkdownEditor from "../markdown/MarkdownEditor";
import { ChevronDownIcon } from "lucide-react";

interface JobCardDescriptionProps {
    description: string;
}

const JobCardDescription: React.FC<JobCardDescriptionProps> = ({ description }) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    const hideDescription = () => {
        setShowDescription(false);
    };

    return (
        <div className="text-gray-500 hover:text-gray-800">
            <Button
                onClick={toggleDescription}
                className="w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
                <span>View Job Description</span>
                <motion.div
                    initial={false}
                    animate={{ rotate: showDescription ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDownIcon size={20} className="ml-2 text-gray-500" />
                </motion.div>
            </Button>
            <AnimatePresence>
                {showDescription && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-2 p-4 border border-gray-200 rounded-md"
                    >
                        <MarkdownEditor
                            content={description}
                            editable={false}
                        />
                        <Button
                            onClick={hideDescription}
                            className="w-full mt-2 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                            Hide Job Description
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobCardDescription;
