import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ClassFormData } from '../components/class/CreateClassModal';

export interface Class {
  id: string;
  title: string;
  description: string;
  subject: string;
  startDate: string;
  endDate: string;
  meetingDays: string[];
  meetingTime: string;
  createdAt: string;
  updatedAt: string;
}

interface ClassContextType {
  classes: Class[];
  addClass: (classData: ClassFormData) => void;
  getClass: (id: string) => Class | undefined;
  updateClass: (id: string, classData: Partial<Class>) => void;
  deleteClass: (id: string) => void;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const useClasses = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error('useClasses must be used within a ClassProvider');
  }
  return context;
};

interface ClassProviderProps {
  children: ReactNode;
}

export const ClassProvider: React.FC<ClassProviderProps> = ({ children }) => {
  // Sample initial classes
  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      title: 'Mathematics 101',
      description: 'Introduction to basic mathematical concepts',
      subject: 'Mathematics',
      startDate: '2025-01-15',
      endDate: '2025-05-30',
      meetingDays: ['Monday', 'Wednesday', 'Friday'],
      meetingTime: '09:00',
      createdAt: '2025-01-01T12:00:00Z',
      updatedAt: '2025-01-01T12:00:00Z'
    },
    {
      id: '2',
      title: 'Physics Advanced',
      description: 'Advanced topics in physics including quantum mechanics',
      subject: 'Physics',
      startDate: '2025-01-16',
      endDate: '2025-06-01',
      meetingDays: ['Tuesday', 'Thursday'],
      meetingTime: '14:00',
      createdAt: '2025-01-02T10:30:00Z',
      updatedAt: '2025-01-02T10:30:00Z'
    },
    {
      id: '3',
      title: 'Computer Science',
      description: 'Introduction to programming and computer science principles',
      subject: 'Computer Science',
      startDate: '2025-01-17',
      endDate: '2025-06-02',
      meetingDays: ['Monday', 'Wednesday'],
      meetingTime: '11:00',
      createdAt: '2025-01-03T09:15:00Z',
      updatedAt: '2025-01-03T09:15:00Z'
    }
  ]);

  const addClass = (classData: ClassFormData) => {
    const newClass: Class = {
      id: (classes.length + 1).toString(), // In a real app, use a proper ID generator
      ...classData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setClasses(prevClasses => [...prevClasses, newClass]);
  };

  const getClass = (id: string) => {
    return classes.find(c => c.id === id);
  };

  const updateClass = (id: string, classData: Partial<Class>) => {
    setClasses(prevClasses => 
      prevClasses.map(c => 
        c.id === id 
          ? { ...c, ...classData, updatedAt: new Date().toISOString() } 
          : c
      )
    );
  };

  const deleteClass = (id: string) => {
    setClasses(prevClasses => prevClasses.filter(c => c.id !== id));
  };

  return (
    <ClassContext.Provider value={{ classes, addClass, getClass, updateClass, deleteClass }}>
      {children}
    </ClassContext.Provider>
  );
};
