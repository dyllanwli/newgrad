import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import ProfileCard from '../components/myapply/ProfileCard';
import MyApplyContent from '../components/myapply/MyApplyContent';
import MyProfileContent from '../components/myapply/MyProfileContent';
import LikedContent from '../components/myapply/LikedContent';
import SettingsContent from '../components/myapply/SettingsContent';
import AdminContent from '../components/myapply/AdminContent';
import { Profile } from '../components/myapply/types';
import ProgressBar from '@/components/ui/ProgressBar';

const MyApplyPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null); 
  const [cards, setCards] = useState(['My Apply', 'My Profile', 'Liked', "Settings"]);
  const { getToken } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const token = await getToken();
        const response = await axios.get('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfile(response.data);
        setIsAdmin(response.data.admin);
        if (response.data.admin === true && !cards.includes('Admin')) {
          setCards(prevCards => [...prevCards, 'Admin']);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getCardContent = (title: string) => {
    switch (title) {
      case 'My Profile':
        return <MyProfileContent profile={profile} />;
      case 'My Apply':
        return <MyApplyContent applications={profile?.job_applications || []} />;
      case 'Liked':
        return <LikedContent />;
      case 'Settings':
        return <SettingsContent />;
      case 'Admin':
        return <AdminContent />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <ProgressBar isLoading={isLoading} />
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="space-y-4 p-4">
          {cards.map((card) => (
            <ProfileCard
              key={card}
              card={card}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              content={getCardContent(card)}
            />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex justify-center">
        <div className="w-4/5 flex">
          <div className="w-1/4 bg-white h-screen p-4 border-r shadow-lg mt-4 rounded-lg">
            <nav>
              {cards.map((card) => (
                <motion.div
                  key={card}
                  className={`p-2 mb-2 rounded cursor-pointer ${selectedCard === card ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedCard(card)}
                >
                  {card}
                </motion.div>
              ))}
            </nav>
          </div>
          <div className="w-3/4 p-8">
            <AnimatePresence mode="wait">
              {selectedCard && (
                <motion.div
                  key={selectedCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  {getCardContent(selectedCard)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplyPage;