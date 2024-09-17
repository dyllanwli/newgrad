// src/components/comments/CommentItem.tsx

import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { formatDistanceToNow } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz'
import VoteButton from './VoteButtons';
import { Comment } from './types';

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}

interface CommentItemProps {
  comment: CommentWithReplies;
  level?: number;
  maxDepth: number;
  maxVisibleDepth: number;
  onAddReply: (parentComment: Comment, replyContent: string) => void;
  onEdit: (comment: Comment) => void;
  onVote: (commentId: string, voteType: number) => void;
  isSignedIn: boolean | undefined;
  getToken: () => Promise<string | null>;
  replyTo?: Comment | null;
  setReplyTo: (comment: Comment | null) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  level = 0,
  maxDepth,
  maxVisibleDepth,
  onAddReply,
  onEdit,
  onVote,
  isSignedIn,
  getToken,
  replyTo,
  setReplyTo,
}) => {
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>('');
  const [currentMaxVisibleDepth, setCurrentMaxVisibleDepth] = useState<number>(maxVisibleDepth);
  const { user } = useUser();
  const localDatePosted = fromZonedTime(comment.created_at, "UTC")
  const distanceToNow = formatDistanceToNow(localDatePosted, { addSuffix: true, includeSeconds: true })


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;
    onEdit({ ...comment, content: editContent });
    setIsEditing(false);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;
    await onAddReply(comment, replyContent);
    setReplyContent('');
    setReplyTo(null);
  };

  const handleViewMore = () => {
    setCurrentMaxVisibleDepth(maxDepth);
  };

  return (
    <div
      style={{
        marginLeft: level * 10,
        borderLeft: '1px solid #ccc',
        paddingLeft: 5,
        marginTop: 5,
      }}
    >
      <div>
        <strong>{comment.username}</strong>: {comment.content}
      </div>
      <small>Posted {distanceToNow}</small>
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
                onClick={() => setReplyTo(comment)}
                className="text-blue-500 hover:underline text-sm"
              >
                Reply
              </button>
            )}
            {comment.userId === user?.id && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-green-500 hover:underline text-sm"
              >
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
            <button
              type="submit"
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
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
      {replyTo?._id === comment._id && (
        <form onSubmit={handleReplySubmit} className="mt-1">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            required
            className="w-full p-1 border rounded mb-1"
          />
          <div className="flex space-x-1">
            <button
              type="submit"
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Post Reply
            </button>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="px-2 py-1 bg-gray-300 text-black rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {comment.replies.length > 0 && (
        <div className="mt-2">
          {level + 1 >= currentMaxVisibleDepth && currentMaxVisibleDepth < maxDepth ? (
            <button
              onClick={handleViewMore}
              className="text-blue-500 hover:underline text-sm"
            >
              View more comments
            </button>
          ) : (
            comment.replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                level={level + 1}
                maxDepth={maxDepth}
                maxVisibleDepth={currentMaxVisibleDepth}
                onAddReply={onAddReply}
                onEdit={onEdit}
                onVote={onVote}
                isSignedIn={isSignedIn}
                getToken={getToken}
                replyTo={replyTo}
                setReplyTo={setReplyTo}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
