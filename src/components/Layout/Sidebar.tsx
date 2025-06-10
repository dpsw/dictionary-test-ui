import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Home, 
  Plus, 
  Search, 
  Settings, 
  Star,
  Map
} from 'lucide-react';
import { useAppStore } from '../../store';

export const Sidebar: React.FC = () => {
  const { isSidebarOpen } = useAppStore();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  if (!isSidebarOpen) return null;

  return (
    <aside className="hidden md:block fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 pt-16 pb-4 overflow-y-auto">
      <div className="h-full flex flex-col justify-between px-3 py-4">
        <nav className="space-y-1">
          <Link
            to="/home"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive('/home') 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="mr-3 h-5 w-5 flex-shrink-0" />
            Home
          </Link>

          <div className="pt-5">
            <div className="px-3 mb-2 flex justify-between items-center">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Dictionaries
              </h2>
              <Link
                to="/dictionaries/new"
                className="text-xs text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4" />
              </Link>
            </div>
            <Link
              to="/dictionaries"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/dictionaries') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="mr-3 h-5 w-5 flex-shrink-0" />
              All Dictionaries
            </Link>
            <Link
              to="/dictionaries/favorites"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/dictionaries/favorites') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Star className="mr-3 h-5 w-5 flex-shrink-0" />
              Favorites
            </Link>
          </div>

          <div className="pt-5">
            <div className="px-3 mb-2 flex justify-between items-center">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Grammar
              </h2>
              <Link
                to="/grammar/new"
                className="text-xs text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4" />
              </Link>
            </div>
            <Link
              to="/grammar"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/grammar') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="mr-3 h-5 w-5 flex-shrink-0" />
              All Grammar Resources
            </Link>
          </div>

          <div className="pt-5">
            <div className="px-3 mb-2 flex justify-between items-center">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Roadmaps
              </h2>
              <Link
                to="/roadmaps/new"
                className="text-xs text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4" />
              </Link>
            </div>
            <Link
              to="/roadmaps"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/roadmaps') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Map className="mr-3 h-5 w-5 flex-shrink-0" />
              All Roadmaps
            </Link>
          </div>

          <div className="pt-5">
            <div className="px-3 mb-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Browse
              </h2>
            </div>
            <Link
              to="/explore"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/explore') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Search className="mr-3 h-5 w-5 flex-shrink-0" />
              Explore
            </Link>
          </div>
        </nav>

        <div className="mt-auto">
          <Link
            to="/settings"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive('/settings') 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
            Settings
          </Link>
        </div>
      </div>
    </aside>
  );
};