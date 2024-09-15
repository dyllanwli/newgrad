// DiscussionComponent.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react'; 


interface DiscussionComponentProps {
  companyId: string;
}

interface Comment {
  _id: string;
  userId: string;
  content: string;
  datePosted: string;
}

const DiscussionComponent: React.FC<DiscussionComponentProps> = ({ companyId }) => {
  const { getToken, isSignedIn } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    // Fetch existing comments for the company
    fetch(`/api/companies/${companyId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, [companyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      return;
    }
    // Get the auth token
    const token = await getToken();
    // Post new comment to the server
    fetch(`/api/companies/${companyId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then((response) => response.json())
      .then((comment) => {
        setComments([...comments, comment]);
        setNewComment('');
      });
  };

  return (
    <div className="discussion-component">
      <h3 className="text-2xl font-bold mb-4">Discussion</h3>
      <ul className="mb-4">
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <small>{new Date(comment.datePosted).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      {isSignedIn ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="w-full p-2 border rounded mb-2"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Post Comment
          </button>
        </form>
      ) : (
        <p>You must be logged in to post a comment.</p>
      )}
    </div>
  );
};

export default DiscussionComponent;
