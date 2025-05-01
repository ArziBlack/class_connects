import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  duration?: number; // Duration in milliseconds
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ duration = 4000 }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, duration / 50); // Update progress ~50 times during the duration
    
    return () => clearInterval(interval);
  }, [duration]);
  
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600 text-center dark:text-blue-400">ClassConnects</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">Connecting classrooms, empowering education</p>
        </div>
        
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 mt-4">
          {progress < 100 ? 'Loading...' : 'Ready!'}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
