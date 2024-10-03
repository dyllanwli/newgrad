import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const SettingsContent: React.FC = () => {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveSettings = () => {
    // Implement save settings functionality here
    console.log('Saving settings:', { emailNotifications, darkMode });
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
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <span>Dark mode</span>
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