// src/components/comments/DiscussionComponent.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import CommentItem from './CommentItem';
import { Comment } from './types';
import { MAX_DEPTH, MAX_VISIBLE_DEPTH } from './constants';
import { Button, Textarea } from '@headlessui/react'
import axios from 'axios';

interface DiscussionComponentProps {
  discussId: string;
}

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}

const DiscussionComponent: React.FC<DiscussionComponentProps> = ({ discussId }) => {
  const { getToken, isSignedIn } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const maxDepth = MAX_DEPTH;
  let maxVisibleDepth = MAX_VISIBLE_DEPTH;

  useEffect(() => {
    const fetchComments = async () => {
      const token = isSignedIn ? await getToken() : null;
      try {
        const response = await axios.get(`/api/discuss/${discussId}/comments`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [discussId, isSignedIn, getToken]);

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
    try {
      const response = await axios.post(`/api/discuss/${discussId}/comments`, 
        { content: newComment }, 
        { headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        } }
      );
      setComments([...comments, response.data]);
      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleAddReply = async (parentComment: Comment, replyContent: string) => {
    if (!isSignedIn) {
      return;
    }
    const token = await getToken();
    try {
      const response = await axios.post(`/api/discuss/${discussId}/comments`, 
        { content: replyContent, parent_id: parentComment._id }, 
        { headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        } }
      );
      setComments([...comments, response.data]);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleVote = async (commentId: string, voteType: number) => {
    if (!isSignedIn) {
      return;
    }
    const token = await getToken();
    try {
      await axios.post(`/api/comments/${commentId}/vote`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          vote_type: voteType,
        },
      });
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
    } catch (error) {
      console.error('Error voting on comment:', error);
    }
  };

  const handleEdit = async (updatedComment: Comment) => {
    if (!isSignedIn || !updatedComment._id) {
      return;
    }
    const token = await getToken();
    try {
      const response = await axios.put(`/api/comments/${updatedComment._id}`, 
        { content: updatedComment.content }, 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updated = response.data;
      setComments((prevComments) =>
        prevComments.map((comment) => (comment._id === updated._id ? updated : comment))
      );
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
  
  return (
    <div className="discussion-component">
      <h3 className="text-2xl font-bold mb-4">Discussion</h3>
      <div>
        {commentTree.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            level={0}
            maxDepth={maxDepth}
            maxVisibleDepth={maxVisibleDepth} // Pass the default visible depth
            onAddReply={handleAddReply}
            onEdit={handleEdit}
            onVote={handleVote}
            isSignedIn={isSignedIn}
            getToken={getToken}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
          />
        ))}
      </div>
      {isSignedIn && !replyTo ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="w-full p-2 border rounded rounded-lg mb-2"
            placeholder="Add a comment"
            maxLength={1000}
          />
          <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Post Comment
          </Button>
        </form>
      ) : null}
      {!isSignedIn && <p>You must be logged in to post a comment.</p>}
    </div>
  );
};

export default DiscussionComponent;