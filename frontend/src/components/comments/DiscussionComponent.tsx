// src/components/comments/DiscussionComponent.tsx

import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import CommentItem from './CommentItem';
import { Comment } from './types'
import { MAX_DEPTH } from './constants';

interface DiscussionComponentProps {
  companyId: string;
}

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}

const DiscussionComponent: React.FC<DiscussionComponentProps> = ({ companyId }) => {
  const { getToken, isSignedIn } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const maxDepth = MAX_DEPTH;

  useEffect(() => {
    const fetchComments = async () => {
      const token = isSignedIn ? await getToken() : null;
      fetch(`/api/companies/${companyId}/comments`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
        .then((response) => response.json())
        .then((data) => {
          setComments(data);
        });
    };
    fetchComments();
  }, [companyId, isSignedIn, getToken]);

  // Build the comment tree
  const buildCommentTree = (comments: Comment[]): CommentWithReplies[] => {
    const commentMap: { [key: string]: CommentWithReplies } = {};
    comments.forEach((comment) => {
      commentMap[comment._id] = { ...comment, replies: [] };
    });
    const rootComments: CommentWithReplies[] = [];
    comments.forEach((comment) => {
      if (comment.parent_id) {
        if (commentMap[comment.parent_id]) {
          commentMap[comment.parent_id].replies.push(commentMap[comment._id]);
        }
      } else {
        rootComments.push(commentMap[comment._id]);
      }
    });
    return rootComments;
  };

  const commentTree = buildCommentTree(comments);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      return;
    }
    const token = await getToken();
    fetch(`/api/companies/${companyId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newComment, parent_id: replyTo?._id }),
    })
      .then((response) => response.json())
      .then((comment) => {
        setComments([...comments, comment]);
        setNewComment('');
        setReplyTo(null);
      });
  };

  const handleVote = async (commentId: string, voteType: number) => {
    if (!isSignedIn) {
      return;
    }
    const token = await getToken();
    fetch(`/api/comments/${commentId}/vote?vote_type=${voteType}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Update the comment's vote counts optimistically
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment._id === commentId) {
              const prevUserVote = comment.userVote || 0;
              let upvote_count = comment.upvote_count;
              let downvote_count = comment.downvote_count;
              let newUserVote = voteType;

              if (prevUserVote === voteType) {
                // User is removing their vote
                if (voteType === 1) {
                  upvote_count -= 1;
                } else if (voteType === -1) {
                  downvote_count -= 1;
                }
                newUserVote = 0;
              } else {
                // User is changing their vote or voting for the first time
                if (prevUserVote === 1) {
                  upvote_count -= 1;
                } else if (prevUserVote === -1) {
                  downvote_count -= 1;
                }
                if (voteType === 1) {
                  upvote_count += 1;
                } else if (voteType === -1) {
                  downvote_count += 1;
                }
              }
              return { ...comment, upvote_count, downvote_count, userVote: newUserVote };
            }
            return comment;
          })
        );
      });
  };

  const handleEdit = async (updatedComment: Comment) => {
    if (!isSignedIn || !updatedComment._id) {
      return;
    }
    const token = await getToken();
    fetch(`/api/comments/${updatedComment._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: updatedComment.content }),
    })
      .then((response) => response.json())
      .then((updated) => {
        setComments((prevComments) =>
          prevComments.map((comment) => (comment._id === updated._id ? updated : comment))
        );
      });
  };

  const handleReply = (comment: Comment) => {
    setReplyTo(comment);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  return (
    <div className="discussion-component">
      <h3 className="text-2xl font-bold mb-4">Discussion</h3>
      {replyTo && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          Replying to <strong>{replyTo.username}</strong>
          <button onClick={() => setReplyTo(null)} className="ml-4 text-red-500 hover:underline">
            Cancel Reply
          </button>
        </div>
      )}
      <div>
        {commentTree.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            level={0}
            maxDepth={maxDepth}
            onReply={handleReply}
            onEdit={handleEdit}
            onVote={handleVote}
            isSignedIn={isSignedIn}
            getToken={getToken}
            replyTo={replyTo} // Pass replyTo prop
            setReplyTo={setReplyTo} // Pass setReplyTo prop
          />
        ))}
      </div>
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="w-full p-2 border rounded mb-2"
            placeholder={replyTo ? `Replying to ${replyTo.username}` : 'Add a comment'}
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {replyTo ? 'Post Reply' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p>You must be logged in to post a comment.</p>
      )}
    </div>
  );
};

export default DiscussionComponent;