import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, BookOpen, GraduationCap, Star } from 'lucide-react';
import { useAppStore } from '../store';
import { DictionaryList } from '../components/Dictionary/DictionaryList';
import { GrammarList } from '../components/Grammar/GrammarList';

export const ProfilePage: React.FC = () => {
  const { currentUser, dictionaries, grammars } = useAppStore();
  
  const userDictionaries = dictionaries.filter(dict => dict.userId === currentUser?.id);
  const userGrammars = grammars.filter(grammar => grammar.userId === currentUser?.id);
  
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          {currentUser?.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="h-20 w-20 rounded-full"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="h-10 w-10 text-primary-600" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{currentUser?.name}</h1>
            <p className="text-gray-600">{currentUser?.email}</p>
          </div>
          <Link to="/settings" className="btn-secondary">
            <Settings className="h-5 w-5 mr-2" />
            Edit Profile
          </Link>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary-600" />
              <h3 className="font-medium text-gray-900">Dictionaries</h3>
            </div>
            <p className="text-2xl font-bold text-primary-700 mt-2">{userDictionaries.length}</p>
          </div>
          
          <div className="bg-secondary-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-secondary-600" />
              <h3 className="font-medium text-gray-900">Grammar Resources</h3>
            </div>
            <p className="text-2xl font-bold text-secondary-700 mt-2">{userGrammars.length}</p>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-accent-600" />
              <h3 className="font-medium text-gray-900">Favorites</h3>
            </div>
            <p className="text-2xl font-bold text-accent-700 mt-2">
              {(currentUser?.favorites?.dictionaries?.length || 0) + 
               (currentUser?.favorites?.grammars?.length || 0)}
            </p>
          </div>
        </div>
      </div>
      
      {/* User's Dictionaries */}
      <DictionaryList 
        dictionaries={userDictionaries}
        title="My Dictionaries"
      />
      
      {/* User's Grammar Resources */}
      <GrammarList 
        grammars={userGrammars}
        title="My Grammar Resources"
      />
    </div>
  );
};