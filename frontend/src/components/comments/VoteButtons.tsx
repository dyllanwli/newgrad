// src/components/comments/VoteButtons.tsx

import React from 'react';

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
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onVote(commentId, 1)}
        className={`px-2 py-1 rounded ${currentUserVote === 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
      >
        Upvote ({upvoteCount})
      </button>
      <button
        onClick={() => onVote(commentId, -1)}
        className={`px-2 py-1 rounded ${currentUserVote === -1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
      >
        Downvote ({downvoteCount})
      </button>
    </div>
  );
};

export default VoteButton;
