import React, { useState } from 'react';
import { CalendarDays, GraduationCap, Home, LifeBuoy, MessageSquare, PlusCircle, Settings } from 'lucide-react';
import { NavLink } from '../common/NavLink';
import { useAuth } from '../../contexts/AuthContext';
import CreateClassModal from '../class/CreateClassModal';
import { useClasses } from '../../contexts/ClassContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();
  const { classes, addClass } = useClasses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTutor = user?.role === 'tutor';
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleCreateClass = (classData: any) => {
    addClass(classData);
  };
  
  return (
    <>
      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out z-30`}>
        <div className="p-4">
          <div className="flex flex-col h-full">
            <nav className="space-y-1 flex-1">
              <NavLink to="/" icon={<Home size={20} />} text="Dashboard" />
              <NavLink to="/calendar" icon={<CalendarDays size={20} />} text="Calendar" />
              <NavLink to="/messages" icon={<MessageSquare size={20} />} text="Messages" />
              
              {isTutor && (
                <button 
                  onClick={handleOpenModal}
                  className="mt-4 w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle size={18} />
                  <span>Create New Class</span>
                </button>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  My Classes
                </h3>
                <div className="mt-3 space-y-1">
                  {classes.map(classItem => (
                    <NavLink 
                      key={classItem.id}
                      to={`/class/${classItem.id}`} 
                      icon={<GraduationCap size={20} />} 
                      text={classItem.title} 
                    />
                  ))}
                </div>
              </div>
            </nav>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
              <NavLink to="/settings" icon={<Settings size={20} />} text="Settings" />
              <NavLink to="/help" icon={<LifeBuoy size={20} />} text="Help & Support" />
            </div>
          </div>
        </div>
      </aside>
      
      <CreateClassModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateClass={handleCreateClass}
      />
    </>
  );
};

export default Sidebar;