import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        active 
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
          : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/20'
      }`}
    >
      <span className={active ? 'text-blue-700 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  );
};