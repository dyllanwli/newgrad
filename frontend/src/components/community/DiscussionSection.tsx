import React from 'react';
import { Discussion } from './types';
import DiscussionCard from './DiscussionCard';
import { motion } from 'framer-motion'; 

interface DiscussionSectionProps {
    discussions: Discussion[];
    onCardClick: (discussion: Discussion) => void; 
}

const DiscussionSection: React.FC<DiscussionSectionProps> = ({ discussions, onCardClick }) => {
    return (
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
    );
};

export default DiscussionSection;