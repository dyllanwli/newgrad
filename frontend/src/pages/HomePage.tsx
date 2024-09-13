import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl p-4">
        <motion.div
          className="w-full md:w-1/2 p-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/option1')}
        >
          <img
            src="https://placehold.co/600x400"
            alt="Option 1"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 p-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/option2')}
        >
          <img
            src="https://placehold.co/600x400"
            alt="Option 2"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;