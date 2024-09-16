// src/components/comments/VoteButtons.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';

interface VoteButtonProps {
  commentId: string;
  currentUserVote: number;
  upvoteCount: number;
  downvoteCount: number;
  onVote: (commentId: string, voteType: number) => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({
  commentId,
  currentUserVote,
  upvoteCount,
  downvoteCount,
  onVote,
}) => {
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const countVariants = {
    voted: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  };

  const handleVote = (voteType: number) => {
    onVote(commentId, voteType);
  };

  return (
    <div className="flex items-center space-x-1">
      <motion.div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => handleVote(1)}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <ChevronUpIcon
          width={20}
          height={20}
          className={currentUserVote === 1 ? 'text-green-500' : 'text-gray-500'}
        />
        <motion.span
          className={`text-xs font-bold ${currentUserVote === 1 ? 'text-green-500' : 'text-gray-700'
            }`}
          variants={countVariants}
          animate={currentUserVote === 1 ? 'voted' : ''}
        >
          {upvoteCount}
        </motion.span>
      </motion.div>
      <motion.div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => handleVote(-1)}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <ChevronDownIcon
          width={20}
          height={20}
          className={currentUserVote === -1 ? 'text-red-500' : 'text-gray-500'}
        />
        <motion.span
          className={`text-xs font-bold ${currentUserVote === -1 ? 'text-red-500' : 'text-gray-700'
            }`}
          variants={countVariants}
          animate={currentUserVote === -1 ? 'voted' : ''}
        >
          {downvoteCount}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default VoteButton;