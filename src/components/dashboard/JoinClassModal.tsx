import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../common/Button';

interface JoinClassModalProps {
  onClose: () => void;
}

export const JoinClassModal: React.FC<JoinClassModalProps> = ({ onClose }) => {
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!classCode.trim()) {
      setError('Please enter a class code');
      return;
    }
    
    // In a real app, we would verify the class code exists
    if (classCode.trim() === 'INVALID') {
      setError('Invalid class code. Please check and try again.');
      return;
    }
    
    console.log('Joining class with code:', classCode);
    // Join class logic would go here
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Join a Class</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="classCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Class Code
            </label>
            <input
              id="classCode"
              type="text"
              placeholder="Enter the class code (e.g., abc-def-123)"
              value={classCode}
              onChange={(e) => {
                setClassCode(e.target.value);
                if (error) setError('');
              }}
              className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ask your tutor for the class code. Make sure to enter it exactly as it appears.
          </p>
          
          <div className="flex justify-end space-x-3 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Join Class
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};