import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Grammar } from '../../types';
import { GrammarCard } from './GrammarCard';

interface GrammarListProps {
  grammars: Grammar[];
  title?: string;
  showCreateButton?: boolean;
}

export const GrammarList: React.FC<GrammarListProps> = ({
  grammars,
  title = 'Grammar Resources',
  showCreateButton = true,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {showCreateButton && (
          <Link to="/grammar/new" className="btn-secondary">
            <Plus className="h-5 w-5 mr-1" />
            New Grammar Resource
          </Link>
        )}
      </div>
      
      {grammars.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No grammar resources found</h3>
          <p className="text-gray-600 mb-6">Start by creating your first grammar resource</p>
          <Link to="/grammar/new" className="btn-secondary">
            <Plus className="h-5 w-5 mr-1" />
            Create Grammar Resource
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grammars.map((grammar) => (
            <GrammarCard key={grammar.id} grammar={grammar} />
          ))}
        </div>
      )}
    </div>
  );
};