import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, Search, User, X } from 'lucide-react';
import { useAppStore } from '../../store';

export const Navbar: React.FC = () => {
  const { currentUser, isSidebarOpen, toggleSidebar } = useAppStore();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open main menu</span>
              {isSidebarOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
            
            <Link 
              to="/" 
              className="flex items-center text-primary-700 font-bold text-xl"
            >
              <BookOpen className="h-8 w-8 mr-2" />
              <span>Use My Dictionary</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/search/users"
              className="btn-secondary"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Users
            </Link>
            
            <Link
              to="/profile"
              className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span className="sr-only">View profile</span>
              {currentUser?.avatarUrl ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-700" />
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};