import React from 'react';
import { Book, Calendar, MessageSquare, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../common/Card';
import { Class } from '../../types';
import { useNavigate } from 'react-router-dom';

interface ClassCardProps {
  classData: Class;
}

export const ClassCard: React.FC<ClassCardProps> = ({ classData }) => {
  const { id, name, subject, tutor, students, coverImage, color } = classData;
  const navigate = useNavigate();
  
  return (
    <Card 
      hover 
      onClick={() => navigate(`/class/${id}`)} 
      className="transition-all duration-300 h-full flex flex-col"
    >
      <div 
        className="h-24 bg-cover bg-center"
        style={{ 
          backgroundColor: color || '#3B82F6',
          backgroundImage: coverImage ? `url(${coverImage})` : 'none'
        }}
      >
        <div className="h-full w-full flex items-center justify-center bg-black/30 p-4">
          <h3 className="text-lg font-semibold text-white">{subject}</h3>
        </div>
      </div>
      
      <CardHeader>
        <h2 className="font-semibold text-gray-800 dark:text-white">{name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{tutor}</p>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Users size={14} className="mr-1" />
            <span>{students} students</span>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Book size={14} className="mr-1" />
            <span>12 resources</span>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>Next class: Today, 2:00 PM</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500">
            <MessageSquare size={18} />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};