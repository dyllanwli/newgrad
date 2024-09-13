import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";

interface Match {
  id: number;
  name: string;
  distance: string;
  imageUrl: string;
}

const FindPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Mock data for matches
    const mockMatches: Match[] = [
      { id: 1, name: 'Alice', distance: '2 miles away', imageUrl: 'https://placehold.co/300x300' },
      { id: 2, name: 'Bob', distance: '5 miles away', imageUrl: 'https://placehold.co/300x300' },
      { id: 3, name: 'Charlie', distance: '10 miles away', imageUrl: 'https://placehold.co/300x300' },
    ];
    setMatches(mockMatches);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Find Matches Near You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {matches.map((match) => (
          <motion.div
            key={match.id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={match.imageUrl}
              alt={match.name}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-bold">{match.name}</h3>
            <p className="text-gray-600">{match.distance}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FindPage;