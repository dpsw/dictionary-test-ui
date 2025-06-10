import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Globe, Lock, User, Clock, Star, Copy } from 'lucide-react';
import { Grammar } from '../../types';
import { formatDate } from '../../utils/formatters';
import { useAppStore } from '../../store';

interface GrammarCardProps {
  grammar: Grammar;
}

export const GrammarCard: React.FC<GrammarCardProps> = ({ grammar }) => {
  const { currentUser } = useAppStore();

  return (
    <Link 
      to={`/grammar/${grammar.id}`}
      className="card group animate-fade-in"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-secondary-500" />
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-secondary-600 transition-colors">
              {grammar.name}
            </h3>
          </div>
          {!grammar.isPublic && (
            <span className="flex items-center text-xs text-gray-500">
              <Lock className="h-3 w-3 mr-1" />
              Private
            </span>
          )}
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {grammar.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge bg-secondary-100 text-secondary-800 flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            {grammar.language}
          </span>
          <span className="badge bg-gray-100 text-gray-700 flex items-center">
            <GraduationCap className="h-3 w-3 mr-1" />
            {grammar.ruleCount} rules
          </span>
          {grammar.favoriteCount > 0 && (
            <span className="badge bg-yellow-100 text-yellow-800 flex items-center">
              <Star className="h-3 w-3 mr-1" />
              {grammar.favoriteCount}
            </span>
          )}
          {grammar.copyCount > 0 && (
            <span className="badge bg-blue-100 text-blue-800 flex items-center">
              <Copy className="h-3 w-3 mr-1" />
              {grammar.copyCount}
            </span>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Updated {formatDate(grammar.updatedAt)}
          </span>
          <span className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {grammar.userId === currentUser?.id ? 'You' : 'Other User'}
          </span>
        </div>
      </div>
    </Link>
  );
};