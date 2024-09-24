import React, { useState, useEffect } from 'react';
import WelcomeSection from '@/components/community/WelcomeSection';
import Footer from '@/components/commons/Footer';
import DiscussionSection from '@/components/community/DiscussionSection';
import { Discussion } from '@/components/community/types';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ui/ProgressBar';
import axios from 'axios';
import CommunitySearchBar from '@/components/CommunitySearchBar';
import { useAuth } from '@clerk/clerk-react';
import DiscussionOptions from '@/components/community/DiscussionOptions';
import FullScreenDialog from '@/components/ui/FullScreenDialog';

const CommunityPage: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const fetchDiscussions = async (search: string = '') => {
    setIsLoading(true);
    try {
      if (filter === 'Company') {
        const response = await axios.get('/api/companies/discussions', {
          params: { search }
        });
        setDiscussions(response.data);
      } else {
        const response = await axios.get('/api/discussions', {
          params: { search, filter_by: filter }
        });
        setDiscussions(response.data);
      }
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions(searchTerm);
  }, [searchTerm, filter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handlePostClick = () => {
    if (isSignedIn) {
      navigate('/post-discussion');
    } else {
      setShowDialog(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ProgressBar isLoading={isLoading} />
      <WelcomeSection />
      <div className="container mx-auto px-4 py-8">
        <CommunitySearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <DiscussionOptions onFilterChange={handleFilterChange} onPostClick={handlePostClick} />
        <DiscussionSection discussions={discussions} />
        {isLoading && <p className="text-center mt-4">Loading more discussions...</p>}
      </div>
      <Footer />
      {showDialog && (
        <FullScreenDialog
          isOpen={showDialog}
          onClose={handleCloseDialog}
          title="Sign In Required"
          description="Please sign in to post a discussion."
        />
      )}
    </div>
  );
};

export default CommunityPage;
