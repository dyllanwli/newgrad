import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileCardProps {
  card: string;
  selectedCard: string | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<string | null>>;
  content: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ card, selectedCard, setSelectedCard, content }) => {
  return (
    <motion.div
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
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileCard;
