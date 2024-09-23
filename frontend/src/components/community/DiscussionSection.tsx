import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Discussion } from './types';
import DiscussionCard from './DiscussionCard';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Dropdown from '@/components/ui/Dropdown';

interface DiscussionSectionProps {
    discussions: Discussion[];
    onCardClick: (discussion: Discussion) => void;
}

const DiscussionSection: React.FC<DiscussionSectionProps> = ({ discussions, onCardClick }) => {
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };

    const handlePostClick = () => {
        navigate('/post-discussion'); // Navigate to PostDiscussion page
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <Dropdown
                    options={[
                        { value: 'all', label: 'All Discussions' },
                        { value: 'popular', label: 'Popular' },
                        { value: 'recent', label: 'Recent' }
                    ]}
                    onSelect={handleFilterChange}
                />
                <div className="flex items-center">
                    <span className="text-gray-700">Post</span>
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        className="p-2 text-purple-500 rounded w-10 h-10"
                        onClick={handlePostClick} // Add onClick event
                    >
                        <Plus />
                    </motion.div>
                </div>
            </div>
            <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {discussions.map(discussion => (
                    <motion.div
                        key={discussion.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCardClick(discussion)}
                    >
                        <DiscussionCard discussion={discussion} />
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default DiscussionSection;