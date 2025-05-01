import React from 'react';
import { Clock, FileCheck, Plus } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

interface AssignmentsProps {
  classId: string;
}

export const Assignments: React.FC<AssignmentsProps> = ({ classId }) => {
  const { user } = useAuth();
  const isTutor = user?.role === 'tutor';
  
  // Mock assignments data
  const assignments = [
    {
      id: '1',
      title: 'Linear Algebra Problem Set',
      dueDate: 'Tomorrow, 11:59 PM',
      status: 'pending',
      points: 100,
    },
    {
      id: '2',
      title: 'Calculus Quiz',
      dueDate: 'May 15, 11:59 PM',
      status: 'submitted',
      points: 50,
    },
    {
      id: '3',
      title: 'Differential Equations Project',
      dueDate: 'May 20, 11:59 PM',
      status: 'graded',
      grade: '90/100',
      points: 100,
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 py-1 px-2 rounded-full">Pending</span>;
      case 'submitted':
        return <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 py-1 px-2 rounded-full">Submitted</span>;
      case 'graded':
        return <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 py-1 px-2 rounded-full">Graded</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Assignments</h2>
        {isTutor && (
          <Button variant="primary" icon={<Plus size={16} />}>
            Create Assignment
          </Button>
        )}
      </div>
      
      {assignments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-5 mb-4">
              <FileCheck size={32} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No assignments yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              {isTutor 
                ? "Create your first assignment to get started" 
                : "No assignments have been posted for this class yet"}
            </p>
            {isTutor && (
              <Button variant="primary" icon={<Plus size={16} />} className="mt-4">
                Create Assignment
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} hover className="transition-all duration-300">
              <CardContent className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {assignment.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} className="mr-1" />
                    <span>Due {assignment.dueDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {getStatusBadge(assignment.status)}
                  
                  {assignment.status === 'graded' ? (
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {assignment.grade}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {assignment.points} pts
                    </div>
                  )}
                  
                  <Button variant="outline" size="sm">
                    {assignment.status === 'pending' 
                      ? 'Start' 
                      : assignment.status === 'submitted' 
                        ? 'View Submission' 
                        : 'View Feedback'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};