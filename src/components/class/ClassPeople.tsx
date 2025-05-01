import React from 'react';
import { Mail, Plus, User } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

interface ClassPeopleProps {
  classId: string;
}

export const ClassPeople: React.FC<ClassPeopleProps> = ({ classId }) => {
  const { user } = useAuth();
  const isTutor = user?.role === 'tutor';
  
  // Mock people data
  const tutors = [
    { id: '1', name: 'Dr. Jane Smith', email: 'jane.smith@example.com', role: 'Tutor' }
  ];
  
  const students = [
    { id: '1', name: 'Alex Thompson', email: 'alex.t@example.com', lastActive: '2 hours ago' },
    { id: '2', name: 'Morgan Lee', email: 'morgan.lee@example.com', lastActive: '1 day ago' },
    { id: '3', name: 'Sam Wilson', email: 'sam.w@example.com', lastActive: 'Just now' },
    { id: '4', name: 'Jordan Rodriguez', email: 'jordan.r@example.com', lastActive: '3 days ago' },
    { id: '5', name: 'Cameron Hayes', email: 'cameron.h@example.com', lastActive: '1 week ago' },
  ];
  
  const PersonCard = ({ person, showLastActive = false }: { person: any, showLastActive?: boolean }) => (
    <Card className="border-0 shadow-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <CardContent className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
            {person.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">
              {person.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {showLastActive ? `Active ${person.lastActive}` : person.role}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" icon={<Mail size={14} />}>
            Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Tutors</h2>
        </div>
        
        <div className="space-y-2">
          {tutors.map((tutor) => (
            <PersonCard key={tutor.id} person={tutor} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Students ({students.length})
          </h2>
          
          {isTutor && (
            <Button variant="outline" size="sm" icon={<Plus size={14} />}>
              Invite Students
            </Button>
          )}
        </div>
        
        <div className="space-y-2">
          {students.map((student) => (
            <PersonCard key={student.id} person={student} showLastActive />
          ))}
        </div>
      </div>
    </div>
  );
};