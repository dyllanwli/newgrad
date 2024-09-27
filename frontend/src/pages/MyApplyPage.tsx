import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const MyApplyPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [profile, setProfile] = useState(null); 
  const cards = ['Personal Info', 'Interests', 'Preferences', "Settings"];
  const { getToken } = useAuth();

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const CardContent = ({ title }) => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p>Edit your {title.toLowerCase()} here.</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="space-y-4 p-4">
          {cards.map((card) => (
            <motion.div
              key={card}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCard(card === selectedCard ? null : card)}
            >
              <h2 className="text-lg font-semibold p-4">{card}</h2>
              <AnimatePresence>
                {selectedCard === card && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent title={card} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex justify-center">
        <div className="w-4/5 flex">
          <div className="w-1/4 bg-white h-screen p-4 border-r">
            <nav>
              {cards.map((card) => (
                <motion.div
                  key={card}
                  className={`p-2 mb-2 rounded cursor-pointer ${selectedCard === card ? 'bg-blue-100' : 'hover:bg-gray-100'
                    }`}
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
                  <CardContent title={selectedCard} />
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