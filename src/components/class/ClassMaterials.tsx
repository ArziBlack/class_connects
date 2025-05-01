import React from 'react';
import { BookOpen, FileText, Plus, Video } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

// Define types for material items
interface BaseMaterialItem {
  id: string;
  type: string;
  name: string;
  date: string;
}

interface DocumentItem extends BaseMaterialItem {
  type: 'document';
  size: string;
}

interface VideoItem extends BaseMaterialItem {
  type: 'video';
  duration: string;
}

interface LinkItem extends BaseMaterialItem {
  type: 'link';
  url: string;
}

type MaterialItem = DocumentItem | VideoItem | LinkItem;

interface MaterialSection {
  topic: string;
  items: MaterialItem[];
}

interface ClassMaterialsProps {
  classId: string;
}

export const ClassMaterials: React.FC<ClassMaterialsProps> = ({ classId }) => {
  const { user } = useAuth();
  const isTutor = user?.role === 'tutor';
console.log(classId);
  
  // Mock materials organized by topic
  const materials: MaterialSection[] = [
    {
      topic: 'Introduction to Calculus',
      items: [
        { id: '1', type: 'document', name: 'Calculus Overview.pdf', size: '3.2 MB', date: 'May 1, 2025' },
        { id: '2', type: 'video', name: 'Introduction to Limits', duration: '15:42', date: 'May 1, 2025' },
      ]
    },
    {
      topic: 'Linear Algebra Fundamentals',
      items: [
        { id: '3', type: 'document', name: 'Matrix Operations.pdf', size: '2.8 MB', date: 'May 3, 2025' },
        { id: '4', type: 'document', name: 'Vector Spaces Explained.pdf', size: '4.1 MB', date: 'May 3, 2025' },
        { id: '5', type: 'link', name: 'Interactive Matrix Calculator', url: 'https://example.com/matrix', date: 'May 3, 2025' },
      ]
    },
  ];
  
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText size={16} className="text-blue-600 dark:text-blue-400" />;
      case 'video':
        return <Video size={16} className="text-red-600 dark:text-red-400" />;
      default:
        return <BookOpen size={16} className="text-purple-600 dark:text-purple-400" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Class Materials</h2>
        {isTutor && (
          <Button variant="primary" icon={<Plus size={16} />}>
            Add Material
          </Button>
        )}
      </div>
      
      {materials.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-5 mb-4">
              <BookOpen size={32} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No materials yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              {isTutor 
                ? "Add your first class material to help your students" 
                : "No materials have been posted for this class yet"}
            </p>
            {isTutor && (
              <Button variant="primary" icon={<Plus size={16} />} className="mt-4">
                Add Material
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {materials.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                {section.topic}
              </h3>
              
              <div className="space-y-2">
                {section.items.map((item) => (
                  <Card key={item.id} hover className="transition-all duration-300">
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(item.type)}
                        
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            {item.name}
                          </h4>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                            <span>Added {item.date}</span>
                            {'size' in item && (
                              <>
                                <span>•</span>
                                <span>{item.size}</span>
                              </>
                            )}
                            {'duration' in item && (
                              <>
                                <span>•</span>
                                <span>{item.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};