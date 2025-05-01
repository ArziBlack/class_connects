import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../common/Button';
import { ClassCard } from './ClassCard';
import { useAuth } from '../../contexts/AuthContext';
import { mockClasses } from '../../data/mockData';
import { JoinClassModal } from './JoinClassModal';
import { CreateClassModal } from './CreateClassModal';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isTutor = user?.role === 'tutor';
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredClasses = mockClasses.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Classes</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {isTutor ? (
            <Button 
              variant="primary"
              icon={<Plus size={16} />}
              onClick={() => setShowCreateModal(true)}
            >
              Create Class
            </Button>
          ) : (
            <Button 
              variant="outline"
              icon={<Plus size={16} />}
              onClick={() => setShowJoinModal(true)}
            >
              Join Class
            </Button>
          )}
        </div>
      </div>
      
      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <ClassCard 
              key={classItem.id} 
              classData={classItem}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-5 mb-4">
            <Search size={32} className="text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No classes found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-center max-w-md">
            {searchQuery
              ? `No classes match "${searchQuery}"`
              : isTutor
                ? "Create your first class to get started"
                : "Join a class using the code provided by your tutor"
            }
          </p>
          {isTutor ? (
            <Button 
              variant="primary"
              icon={<Plus size={16} />}
              onClick={() => setShowCreateModal(true)}
            >
              Create Class
            </Button>
          ) : (
            <Button 
              variant="primary"
              icon={<Plus size={16} />}
              onClick={() => setShowJoinModal(true)}
            >
              Join Class
            </Button>
          )}
        </div>
      )}
      
      {showJoinModal && <JoinClassModal onClose={() => setShowJoinModal(false)} />}
      {showCreateModal && <CreateClassModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
};

export default Dashboard;