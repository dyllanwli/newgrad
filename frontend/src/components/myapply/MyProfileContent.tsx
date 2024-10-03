import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Profile } from './types';

interface MyProfileContentProps {
  profile: Profile | null;
}

const MyProfileContent: React.FC<MyProfileContentProps> = ({ profile }) => {

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <div>
        <p className="font-semibold">Username: {profile?.username}</p>
        <p>Email: {profile?.email}</p>
      </div>
    </div>
  );
};

export default MyProfileContent;
