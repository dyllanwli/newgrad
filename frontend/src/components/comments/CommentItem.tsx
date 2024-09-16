// src/components/comments/CommentItem.tsx

import React, { useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import VoteButton from './VoteButtons';
import { Comment } from './types'

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}


interface CommentItemProps {
  comment: CommentWithReplies;
  level?: number;
  maxDepth: number; // Add maxDepth prop
  onReply: (comment: Comment) => void;
  onEdit: (comment: Comment) => void;
  onVote: (commentId: string, voteType: number) => void;
  isSignedIn: boolean | undefined;
  getToken: () => Promise<string | null>;
}


const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  level = 0,
  maxDepth, // Destructure maxDepth
  onReply,
  onEdit,
  onVote,
  isSignedIn,
  getToken,
}) => {
  const [editContent, setEditContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useUser(); // Move useUser hook to the top level

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;
    // Assuming onEdit handles the update logic in the parent component
    onEdit({ ...comment, content: editContent });
    setIsEditing(false);
  };

  return (
    <div style={{ marginLeft: level * 10, borderLeft: '1px solid #ccc', paddingLeft: 5, marginTop: 5 }}>
      <div>
        <strong>{comment.username}</strong>: {comment.content}
      </div>
      <small>{new Date(comment.datePosted).toLocaleString()}</small>
      <div className="flex items-center space-x-1 mt-1">
        <VoteButton
          commentId={comment._id}
          currentUserVote={comment.userVote || 0}
          upvoteCount={comment.upvote_count}
          downvoteCount={comment.downvote_count}
          onVote={onVote}
        />
        {isSignedIn && (
          <>
            {level < maxDepth && (
              <button
                onClick={() => onReply(comment)}
                className="text-blue-500 hover:underline text-sm"
              >
                Reply
              </button>
            )}
            {comment.userId === user?.id && (
              <button onClick={() => setIsEditing(true)} className="text-green-500 hover:underline text-sm">
                Edit
              </button>
            )}
          </>
        )}
      </div>
      {isEditing && (
        <form onSubmit={handleUpdate} className="mt-1">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            required
            className="w-full p-1 border rounded mb-1"
          />
          <div className="flex space-x-1">
            <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-gray-300 text-black rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              level={level + 1}
              maxDepth={maxDepth}
              onReply={onReply}
              onEdit={onEdit}
              onVote={onVote}
              isSignedIn={isSignedIn}
              getToken={getToken}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;