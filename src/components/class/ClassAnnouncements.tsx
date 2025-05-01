import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

interface ClassAnnouncementsProps {
  classId: string;
}

export const ClassAnnouncements: React.FC<ClassAnnouncementsProps> = ({ classId }) => {
  const { user } = useAuth();
  const isTutor = user?.role === 'tutor';
  const [newAnnouncement, setNewAnnouncement] = useState('');
console.log(classId);
  
  // Mock announcements data
  const announcements = [
    {
      id: '1',
      author: 'Dr. Jane Smith',
      authorRole: 'tutor',
      content: 'Welcome to Advanced Mathematics! This course will challenge you to think critically about complex mathematical concepts. Please review the syllabus and let me know if you have any questions.',
      date: 'May 1, 2025',
      attachments: [],
      comments: [],
    },
    {
      id: '2',
      author: 'Dr. Jane Smith',
      authorRole: 'tutor',
      content: 'The first assignment is now available in the Assignments tab. It\'s due next Friday. We\'ll review some of the concepts in class tomorrow.',
      date: 'May 3, 2025',
      attachments: [
        { name: 'Study Guide.pdf', size: '2.3 MB' }
      ],
      comments: [
        { author: 'Alex Thompson', content: 'Is there a specific format you\'d like us to use for the proofs?', date: 'May 3, 2025' },
        { author: 'Dr. Jane Smith', content: 'Good question, Alex. Please use the format we discussed in class with clear statements of each step.', date: 'May 3, 2025' }
      ],
    },
  ];
  
  const handlePostAnnouncement = () => {
    if (!newAnnouncement.trim()) return;
    
    console.log('Posting announcement:', newAnnouncement);
    // Post announcement logic would go here
    
    setNewAnnouncement('');
  };
  
  return (
    <div className="space-y-6">
      {isTutor && (
        <Card>
          <CardContent>
            <div className="space-y-3">
              <textarea
                placeholder="Share something with your class..."
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 min-h-[100px]"
              />
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Add Files
                  </Button>
                  <Button variant="outline" size="sm">
                    Create Poll
                  </Button>
                </div>
                
                <Button 
                  variant="primary" 
                  icon={<Send size={16} />}
                  onClick={handlePostAnnouncement}
                  disabled={!newAnnouncement.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardContent>
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  {announcement.author.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div>
                  <div className="flex items-baseline">
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {announcement.author}
                    </h3>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {announcement.date}
                    </span>
                  </div>
                  
                  <p className="mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {announcement.content}
                  </p>
                  
                  {announcement.attachments.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Attachments</p>
                      <div className="space-y-1">
                        {announcement.attachments.map((attachment, index) => (
                          <div 
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
                          >
                            <span className="text-sm text-gray-700 dark:text-gray-300">{attachment.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{attachment.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {announcement.comments.length > 0 && (
                <div className="mt-4 pl-12 space-y-3">
                  <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
                  
                  {announcement.comments.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      <div>
                        <div className="flex items-baseline">
                          <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                            {comment.author}
                          </h4>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {comment.date}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                    />
                    <Button variant="ghost" size="sm" icon={<Send size={14} />}>
                      Reply
                    </Button>
                  </div>
                </div>
              )}
              
              {announcement.comments.length === 0 && (
                <div className="mt-3 pl-12">
                  <Button variant="ghost" size="sm">
                    Add Comment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};