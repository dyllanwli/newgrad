import React from 'react';
import { Discussion } from './types';
import { Heart } from 'lucide-react';

interface DiscussionCardProps {
    discussion: Discussion;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 break-inside-avoid">
            <h2 className="text-xl font-semibold mb-2">{discussion.title}</h2>
            <div className="flex justify-between items-center text-gray-500">
                <p className="text-gray-600">{discussion.posted_by}</p>
                <span className="flex items-center">
                    <Heart className="mr-1 size-5" /> {discussion.likes}
                </span>
            </div>
        </div>
    );
};

export default DiscussionCard;
