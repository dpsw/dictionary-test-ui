import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, Lock, User, Clock, Star, Copy } from 'lucide-react';
import { Dictionary } from '../../types';
import { formatDate } from '../../utils/formatters';
import { useAppStore } from '../../store';

interface DictionaryCardProps {
  dictionary: Dictionary;
}

export const DictionaryCard: React.FC<DictionaryCardProps> = ({ dictionary }) => {
  const { currentUser } = useAppStore();

  return (
    <Link 
      to={`/dictionaries/${dictionary.id}`}
      className="card group animate-fade-in"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary-500" />
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
              {dictionary.name}
            </h3>
          </div>
          {!dictionary.isPublic && (
            <span className="flex items-center text-xs text-gray-500">
              <Lock className="h-3 w-3 mr-1" />
              Private
            </span>
          )}
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {dictionary.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge-primary flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            {dictionary.sourceLanguage} → {dictionary.targetLanguage}
          </span>
          <span className="badge bg-gray-100 text-gray-700 flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            {dictionary.entryCount} entries
          </span>
          {dictionary.favoriteCount > 0 && (
            <span className="badge bg-yellow-100 text-yellow-800 flex items-center">
              <Star className="h-3 w-3 mr-1" />
              {dictionary.favoriteCount}
            </span>
          )}
          {dictionary.copyCount > 0 && (
            <span className="badge bg-blue-100 text-blue-800 flex items-center">
              <Copy className="h-3 w-3 mr-1" />
              {dictionary.copyCount}
            </span>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Updated {formatDate(dictionary.updatedAt)}
          </span>
          <span className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {dictionary.userId === currentUser?.id ? 'You' : 'Other User'}
          </span>
        </div>
      </div>
    </Link>
  );
};