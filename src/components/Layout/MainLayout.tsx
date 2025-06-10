import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAppStore } from '../../store';

export const MainLayout: React.FC = () => {
  const { isSidebarOpen } = useAppStore();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <main className={`pt-16 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};