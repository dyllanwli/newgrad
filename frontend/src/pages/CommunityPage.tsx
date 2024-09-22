import React, { useState, useEffect } from 'react';
import WelcomeSection from '@/components/community/WelcomeSection';
import Footer from '@/components/Footer';
import DiscussionSection from '@/components/community/DiscussionSection';
import { Discussion } from '@/components/community/types';
import ProgressBar from '@/components/ui/ProgressBar'; // Import ProgressBar

const initialDiscussions: Discussion[] = [
  { id: 1, title: "Best practices for code reviews, tips and tricks, and more and more and more this a text to see how it looks like", posted_by: "user4", likes: 72, comments: 41, views: 350 },
  { id: 2, title: "Favorite productivity tools", posted_by: "user5", likes: 65, comments: 37, views: 280 },
  { id: 3, title: "Work-life balance tips", posted_by: "user6", likes: 58, comments: 45, views: 320 },
  { id: 4, title: "How to improve your coding skills", posted_by: "user7", likes: 45, comments: 20, views: 150 },
  { id: 5, title: "The importance of unit testing", posted_by: "user8", likes: 30, comments: 15, views: 100 },
  { id: 6, title: "Understanding TypeScript", posted_by: "user9", likes: 50, comments: 25, views: 200 },
  { id: 7, title: "Remote work best practices", posted_by: "user10", likes: 40, comments: 30, views: 180 },
];

const CommunityPage: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Optional: To handle loading state

  const loadMoreDiscussions = () => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => { 
      // Simulating network delay
      const generateRandomDiscussion = (id: number): Discussion => {
        const titles = [
          "The future of programming",
          "Exploring new frameworks",
          "Tips for effective debugging",
          "How to stay motivated while coding",
          "The role of AI in software development",
          "Best practices for code documentation",
          "Understanding design patterns",
          "The importance of code reviews",
        ];
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        const randomPostedBy = `user${Math.floor(Math.random() * 100)}`;
        const randomLikes = Math.floor(Math.random() * 100);
        const randomComments = Math.floor(Math.random() * 50);
        const randomViews = Math.floor(Math.random() * 500);

        return {
          id,
          title: randomTitle,
          posted_by: randomPostedBy,
          likes: randomLikes,
          comments: randomComments,
          views: randomViews,
        };
      };

      const newDiscussions: Discussion[] = [
        generateRandomDiscussion(8),
        generateRandomDiscussion(9),
        generateRandomDiscussion(10),
        // Add more discussions as needed
      ];
      setDiscussions(prevDiscussions => [...prevDiscussions, ...newDiscussions]);
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
    }, 1000); // 1-second delay
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.offsetHeight;

      // Trigger when scrolled to 100px from the bottom
      if (scrollTop + windowHeight >= fullHeight - 100) {
        loadMoreDiscussions();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]); // Add isLoading to dependencies

  return (
    <div className="flex flex-col min-h-screen">
      <ProgressBar isLoading={isLoading} /> {/* Add ProgressBar */}
      <WelcomeSection />
      <div className="container mx-auto px-4 py-8">
        <DiscussionSection discussions={discussions} />
        {isLoading && <p className="text-center mt-4">Loading more discussions...</p>}
      </div>
      <Footer />
    </div>
  );
};

export default CommunityPage;
