import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { Discussion } from '../community/types';
import DiscussionCard from '../community/DiscussionCard';
import ProgressBar from '../ui/ProgressBar';

const LikedContent: React.FC = () => {
  const [likedDiscussions, setLikedDiscussions] = useState<Discussion[]>([]);
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchLikedDiscussions = async () => {
      try {
        setIsLoading(true);
        const token = await getToken();
        const response = await axios.get('/api/liked-discussions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setLikedDiscussions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching liked discussions:', error);
        setIsLoading(false);
      }
    };

    fetchLikedDiscussions();
  }, [getToken]);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProgressBar isLoading={isLoading} />
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Liked Discussions</h2>
        {likedDiscussions.length === 0 ? (
        <p>No liked discussions yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {likedDiscussions.map((discussion) => (
            <DiscussionCard key={discussion._id} discussion={discussion} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default LikedContent;