import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Discussion } from './types';
import DiscussionCard from './DiscussionCard';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Dropdown from '@/components/ui/Dropdown';
import FullScreenDialog from '../ui/FullScreenDialog';
import { useAuth } from '@clerk/clerk-react';

interface DiscussionSectionProps {
    discussions: Discussion[];
    onCardClick: (discussion: Discussion) => void;
}

const DiscussionSection: React.FC<DiscussionSectionProps> = ({ discussions, onCardClick }) => {
    const [filter, setFilter] = useState('all');
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };

    const handlePostClick = () => {
        if (isSignedIn) {
            navigate('/post-discussion');
        } else {
            setShowDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <Dropdown
                    options={[
                        { value: 'all', label: 'All Discussions' },
                        { value: 'popular', label: 'Popular' },
                        { value: 'recent', label: 'Recent' },
                        { value: 'company', label: 'Company' }
                    ]}
                    onSelect={handleFilterChange}
                />
                <div className="flex items-center">
                    <span className="text-gray-700">Post</span>
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        className="p-2 text-purple-500 rounded w-10 h-10"
                        onClick={handlePostClick}
                    >
                        <Plus />
                    </motion.div>
                </div>
            </div>
            <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {discussions.map(discussion => (
                    <motion.div
                        key={discussion._id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCardClick(discussion)}
                    >
                        <DiscussionCard discussion={discussion} />
                    </motion.div>
                ))}
            </div>
            {showDialog && (
                <FullScreenDialog
                    isOpen={showDialog}
                    onClose={handleCloseDialog}
                    title="Sign In Required"
                    description="Please sign in to post a discussion."
                />
            )}
        </>
    );
};

export default DiscussionSection;