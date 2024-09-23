import React, { useState, useEffect } from 'react';
import WelcomeSection from '@/components/community/WelcomeSection';
import Footer from '@/components/commons/Footer';
import DiscussionSection from '@/components/community/DiscussionSection';
import { Discussion } from '@/components/community/types';
import ProgressBar from '@/components/ui/ProgressBar';
import axios from 'axios';
import CommunitySearchBar from '@/components/CommunitySearchBar';

const CommunityPage: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDiscussions = async (search: string = '') => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/discussions', {
        params: { search }
      });
      setDiscussions(response.data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCardClick = (discussion: Discussion) => {
    console.log('Discussion clicked:', discussion);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ProgressBar isLoading={isLoading} />
      <WelcomeSection />
      <div className="container mx-auto px-4 py-8">
        <CommunitySearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <DiscussionSection discussions={discussions} onCardClick={handleCardClick} />
        {isLoading && <p className="text-center mt-4">Loading more discussions...</p>}
      </div>
      <Footer />
    </div>
  );
};

export default CommunityPage;
