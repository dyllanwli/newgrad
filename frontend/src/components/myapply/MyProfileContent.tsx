import React from 'react';
import { Profile } from './types';

interface MyProfileContentProps {
  profile: Profile | null;
}

const MyProfileContent: React.FC<MyProfileContentProps> = ({ profile }) => {

  return (
    <div className="container mx-auto px-4 py-2">
      <div>
        <p className="font-semibold">Username: {profile?.username}</p>
        <p>Email: {profile?.email}</p>
      </div>
    </div>
  );
};

export default MyProfileContent;
