import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import { ClassView } from './components/class/ClassView';
import { StreamPage } from "./components/class/StreamPage";
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ClassProvider } from './contexts/ClassContext';
import { useState, useEffect } from 'react';
import CalendarPage from './pages/CalendarPage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import LoadingScreen from './components/common/LoadingScreen';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  useEffect(() => {
    // Show loading screen for 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ClassProvider>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col relative">
                <Header toggleSidebar={toggleSidebar} />
                
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar isOpen={sidebarOpen} />
                  
                  <main className="flex-1 lg:ml-64 p-6 overflow-y-auto pt-20">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/class/:classId" element={<ClassView />} />
                      <Route path="/class/:classId/stream" element={<StreamPage />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/messages" element={<MessagesPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/help" element={<HelpPage />} />
                    </Routes>
                  </main>
                </div>
                
                {sidebarOpen && (
                  <div 
                    className="fixed inset-0 bg-black/20 lg:hidden z-20"
                    onClick={toggleSidebar}
                  />
                )}
              </div>
            )}
          </ClassProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;