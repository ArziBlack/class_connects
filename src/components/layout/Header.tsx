import React from 'react';
import { Bell, Menu, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="h-16 bg-white dark:bg-gray-900 fixed top-0 right-0 left-0 z-50 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-gray-800 dark:text-white">ClassConnects</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
          <User size={26} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;