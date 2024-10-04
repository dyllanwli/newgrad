import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const SettingsContent: React.FC = () => {
  const { getToken } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSaveSettings = () => {;
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
          <span>Receive email notifications</span>
        </label>
      </div>
      <button
        onClick={handleSaveSettings}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsContent;