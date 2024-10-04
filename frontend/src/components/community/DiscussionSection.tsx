import React from 'react';
import { Discussion } from './types';
import DiscussionCard from './DiscussionCard';
import { motion } from 'framer-motion';

interface DiscussionSectionProps {
    discussions: Discussion[];
}

const DiscussionSection: React.FC<DiscussionSectionProps> = ({ discussions }) => {

    return (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {discussions.map(discussion => (
                <motion.div
                    key={discussion._id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <DiscussionCard discussion={discussion} />
                </motion.div>
            ))}
        </div>

    );
};

export default DiscussionSection;