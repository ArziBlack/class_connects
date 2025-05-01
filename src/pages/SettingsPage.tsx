import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  // User profile state
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'Student',
    department: 'Computer Science'
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    classReminders: true,
    assignmentReminders: true,
    messageAlerts: true
  });

  // Theme settings state
  const [themeSettings, setThemeSettings] = useState({
    darkMode: false,
    highContrast: false,
    fontSize: 'medium'
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showLastSeen: true,
    allowMessaging: 'everyone' // 'everyone', 'classmates', 'none'
  });

  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the profile to a backend here
    alert('Profile updated successfully!');
  };

  // Handle notification toggle
  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [setting]: !notifications[setting]
    });
  };

  // Handle theme setting change
  const handleThemeChange = (setting: keyof typeof themeSettings, value: any) => {
    setThemeSettings({
      ...themeSettings,
      [setting]: value
    });
  };

  // Handle privacy setting change
  const handlePrivacyChange = (setting: keyof typeof privacySettings, value: any) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: value
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold p-6 border-b border-gray-200 dark:border-gray-700">Settings</h1>
      
      <div className="p-6">
        {/* Profile Settings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profile.role}
                  onChange={(e) => setProfile({...profile, role: e.target.value})}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profile.department}
                  onChange={(e) => setProfile({...profile, department: e.target.value})}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Save Profile
            </button>
          </form>
        </section>
        
        {/* Notification Settings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  className="absolute w-6 h-6 opacity-0 cursor-pointer"
                  checked={notifications.emailNotifications}
                  onChange={() => handleNotificationChange('emailNotifications')}
                />
                <label
                  htmlFor="emailNotifications"
                  className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer ${
                    notifications.emailNotifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`block w-6 h-6 rounded-full transform transition-transform duration-200 ease-in-out bg-white ${
                      notifications.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications on your device</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  className="absolute w-6 h-6 opacity-0 cursor-pointer"
                  checked={notifications.pushNotifications}
                  onChange={() => handleNotificationChange('pushNotifications')}
                />
                <label
                  htmlFor="pushNotifications"
                  className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer ${
                    notifications.pushNotifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`block w-6 h-6 rounded-full transform transition-transform duration-200 ease-in-out bg-white ${
                      notifications.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Class Reminders</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive reminders for upcoming classes</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="classReminders"
                  className="absolute w-6 h-6 opacity-0 cursor-pointer"
                  checked={notifications.classReminders}
                  onChange={() => handleNotificationChange('classReminders')}
                />
                <label
                  htmlFor="classReminders"
                  className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer ${
                    notifications.classReminders ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`block w-6 h-6 rounded-full transform transition-transform duration-200 ease-in-out bg-white ${
                      notifications.classReminders ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </label>
              </div>
            </div>
          </div>
        </section>
        
        {/* Theme Settings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="darkMode"
                  className="absolute w-6 h-6 opacity-0 cursor-pointer"
                  checked={themeSettings.darkMode}
                  onChange={() => handleThemeChange('darkMode', !themeSettings.darkMode)}
                />
                <label
                  htmlFor="darkMode"
                  className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer ${
                    themeSettings.darkMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`block w-6 h-6 rounded-full transform transition-transform duration-200 ease-in-out bg-white ${
                      themeSettings.darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Font Size</h3>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="fontSize"
                    value="small"
                    checked={themeSettings.fontSize === 'small'}
                    onChange={() => handleThemeChange('fontSize', 'small')}
                  />
                  <span className="ml-2">Small</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="fontSize"
                    value="medium"
                    checked={themeSettings.fontSize === 'medium'}
                    onChange={() => handleThemeChange('fontSize', 'medium')}
                  />
                  <span className="ml-2">Medium</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="fontSize"
                    value="large"
                    checked={themeSettings.fontSize === 'large'}
                    onChange={() => handleThemeChange('fontSize', 'large')}
                  />
                  <span className="ml-2">Large</span>
                </label>
              </div>
            </div>
          </div>
        </section>
        
        {/* Privacy Settings */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Show Online Status</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Let others see when you're online</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="showOnlineStatus"
                  className="absolute w-6 h-6 opacity-0 cursor-pointer"
                  checked={privacySettings.showOnlineStatus}
                  onChange={() => handlePrivacyChange('showOnlineStatus', !privacySettings.showOnlineStatus)}
                />
                <label
                  htmlFor="showOnlineStatus"
                  className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer ${
                    privacySettings.showOnlineStatus ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`block w-6 h-6 rounded-full transform transition-transform duration-200 ease-in-out bg-white ${
                      privacySettings.showOnlineStatus ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Who Can Message You</h3>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={privacySettings.allowMessaging}
                onChange={(e) => handlePrivacyChange('allowMessaging', e.target.value)}
              >
                <option value="everyone">Everyone</option>
                <option value="classmates">Classmates Only</option>
                <option value="none">No One (Disable Messages)</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
