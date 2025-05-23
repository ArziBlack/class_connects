import React, { useState } from 'react';
import { BookOpen, Calendar, FileText, MessageSquare, Users, Video, Mic } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { TabButton } from '../common/TabButton';
import { Assignments } from './Assignments';
import { ClassAnnouncements } from './ClassAnnouncements';
import { ClassMaterials } from './ClassMaterials';
import { ClassPeople } from './ClassPeople';
import { useParams } from 'react-router-dom';

type Tab = 'stream' | 'assignments' | 'materials' | 'people' | 'video';

export const ClassView: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('stream');
  
  if (!classId) return null;
  
  // In a real app, we would fetch this data based on the classId
  const classData = {
    id: classId,
    name: 'Advanced Mathematics',
    subject: 'Mathematics',
    tutor: 'Dr. Jane Smith',
    description: 'This course covers advanced mathematical concepts including calculus, linear algebra, and differential equations.',
    color: '#3B82F6',
    coverImage: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    students: 24,
    nextClass: 'Today, 2:00 PM',
    code: 'math-adv-123'
  };
  
  return (
    <div className="flex flex-col h-full">
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ 
          backgroundColor: classData.color,
          backgroundImage: classData.coverImage ? `url(${classData.coverImage})` : 'none'
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white">{classData.name}</h1>
            <p className="text-white/90">{classData.subject} • {classData.tutor}</p>
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex overflow-x-auto">
          <TabButton 
            active={activeTab === 'stream'} 
            onClick={() => setActiveTab('stream')}
            icon={<MessageSquare size={18} />}
            label="Stream"
          />
          <TabButton 
            active={activeTab === 'assignments'} 
            onClick={() => setActiveTab('assignments')}
            icon={<FileText size={18} />}
            label="Assignments"
          />
          <TabButton 
            active={activeTab === 'materials'} 
            onClick={() => setActiveTab('materials')}
            icon={<BookOpen size={18} />}
            label="Materials"
          />
          <TabButton 
            active={activeTab === 'people'} 
            onClick={() => setActiveTab('people')}
            icon={<Users size={18} />}
            label="People"
          />
          <TabButton 
            active={activeTab === 'video'} 
            onClick={() => setActiveTab('video')}
            icon={<Video size={18} />}
            label="Video Stream"
          />
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {activeTab === 'stream' && <ClassAnnouncements classId={classId} />}
            {activeTab === 'assignments' && <Assignments classId={classId} />}
            {activeTab === 'materials' && <ClassMaterials classId={classId} />}
            {activeTab === 'people' && <ClassPeople classId={classId} />}
            {activeTab === 'video' && (
              <div className="h-full flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Video Stream</h2>
                  <p className="text-gray-600 dark:text-gray-400">Join the live video session for this class.</p>
                </div>

                <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative min-h-96">
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="p-2 rounded-full bg-gray-900/75 dark:bg-gray-700/75 text-white hover:bg-gray-900 dark:hover:bg-gray-700 transition-colors">
                      <Mic className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-900/75 dark:bg-gray-700/75 text-white hover:bg-gray-900 dark:hover:bg-gray-700 transition-colors">
                      <Video className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-center">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                      Leave Session
                    </button>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-center">Video streaming interface will be implemented here</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded overflow-hidden relative border border-gray-200 dark:border-gray-700">
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-900/75 dark:bg-gray-700/75 text-white px-2 py-1 text-xs truncate text-center">
                      You
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded overflow-hidden relative border border-gray-200 dark:border-gray-700">
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-900/75 dark:bg-gray-700/75 text-white px-2 py-1 text-xs truncate text-center">
                      Student 1
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded overflow-hidden relative border border-gray-200 dark:border-gray-700">
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-900/75 dark:bg-gray-700/75 text-white px-2 py-1 text-xs truncate text-center">
                      Student 2
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded overflow-hidden relative border border-gray-200 dark:border-gray-700">
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-900/75 dark:bg-gray-700/75 text-white px-2 py-1 text-xs truncate text-center">
                      Teacher
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent>
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">Class Code</h3>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-2 rounded-md">
                  <code className="text-sm font-mono">{classData.code}</code>
                  <Button size="sm" variant="ghost">Copy</Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Students can use this code to join the class
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">Upcoming</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar size={16} className="text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Next Class</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Today, 2:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FileText size={16} className="text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Assignment Due</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Linear Algebra Problem Set</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tomorrow, 11:59 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">About</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {classData.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};