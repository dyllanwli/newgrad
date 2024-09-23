import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Dropdown from '@/components/ui/Dropdown';

interface DiscussionOptionsProps {
    onFilterChange: (value: string) => void;
    onPostClick: () => void;
}

const DiscussionOptions: React.FC<DiscussionOptionsProps> = ({ onFilterChange, onPostClick }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <Dropdown
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'popular', label: 'Popular' },
                    { value: 'views', label: 'Views' },
                    { value: 'company', label: 'Company' }
                ]}
                onSelect={onFilterChange}
                placeholder="All Discussions"
            />
            <div className="flex items-center">
                <span className="text-gray-700">Post</span>
                <motion.div
                    whileHover={{ rotate: 90 }}
                    className="p-2 text-purple-500 rounded w-10 h-10"
                    onClick={onPostClick}
                >
                    <Plus />
                </motion.div>
            </div>
        </div>
    );
};

export default DiscussionOptions;
