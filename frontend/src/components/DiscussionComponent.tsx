// src/components/DiscussionComponent.tsx

import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

interface DiscussionComponentProps {
  companyId: string;
}

interface Comment {
  _id: string;
  userId: string;
  username: string;
  content: string;
  datePosted: string;
  upvote_count: number;
  downvote_count: number;
  parent_id?: string;
  userVote?: number; // 1 for upvote, -1 for downvote, 0 or undefined for no vote
}

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}

const DiscussionComponent: React.FC<DiscussionComponentProps> = ({ companyId }) => {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const currentUserId = user ? user.id : null;

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');

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
  }, [companyId, isSignedIn]);

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

  const handleEdit = (comment: Comment) => {
    setEditCommentId(comment._id);
    setEditContent(comment.content);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !editCommentId) {
      return;
    }
    const token = await getToken();
    fetch(`/api/comments/${editCommentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: editContent }),
    })
      .then((response) => response.json())
      .then((updatedComment) => {
        setComments((prevComments) =>
          prevComments.map((comment) => (comment._id === editCommentId ? updatedComment : comment))
        );
        setEditCommentId(null);
        setEditContent('');
      });
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditContent('');
  };

  const handleReply = (comment: Comment) => {
    setReplyTo(comment);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const renderComments = (comments: CommentWithReplies[], level = 0) => {
    return comments.map((comment) => (
      <div key={comment._id} style={{ marginLeft: level * 20 }}>
        <p>
          <strong>{comment.username}</strong>: {comment.content}
        </p>
        <small>{new Date(comment.datePosted).toLocaleString()}</small>
        <div>
          <button
            onClick={() => handleVote(comment._id, 1)}
            style={{ color: comment.userVote === 1 ? 'blue' : 'black' }}
          >
            Upvote
          </button>
          <span>{comment.upvote_count}</span>
          <button
            onClick={() => handleVote(comment._id, -1)}
            style={{ color: comment.userVote === -1 ? 'blue' : 'black' }}
          >
            Downvote
          </button>
          <span>{comment.downvote_count}</span>
          {comment.userId === currentUserId && (
            <>
              <button onClick={() => handleEdit(comment)}>Edit</button>
            </>
          )}
          <button onClick={() => handleReply(comment)}>Reply</button>
        </div>
        {editCommentId === comment._id && (
          <form onSubmit={handleUpdate}>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              required
              className="w-full p-2 border rounded mb-2"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Update Comment
            </button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        )}
        {comment.replies.length > 0 && renderComments(comment.replies, level + 1)}
      </div>
    ));
  };

  return (
    <div className="discussion-component">
      <h3 className="text-2xl font-bold mb-4">Discussion</h3>
      {replyTo && (
        <div>
          Replying to <strong>{replyTo.username}</strong>
          <button onClick={handleCancelReply}>Cancel Reply</button>
        </div>
      )}
      {renderComments(commentTree)}
      {isSignedIn ? (
        <form onSubmit={handleSubmit}>
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
