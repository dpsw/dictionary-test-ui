import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Dictionary } from '../../types';
import { DictionaryCard } from './DictionaryCard';

interface DictionaryListProps {
  dictionaries: Dictionary[];
  title?: string;
  showCreateButton?: boolean;
}

export const DictionaryList: React.FC<DictionaryListProps> = ({
  dictionaries,
  title = 'Dictionaries',
  showCreateButton = true,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {showCreateButton && (
          <Link to="/dictionaries/new" className="btn-primary">
            <Plus className="h-5 w-5 mr-1" />
            New Dictionary
          </Link>
        )}
      </div>
      
      {dictionaries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No dictionaries found</h3>
          <p className="text-gray-600 mb-6">Start by creating your first dictionary</p>
          <Link to="/dictionaries/new" className="btn-primary">
            <Plus className="h-5 w-5 mr-1" />
            Create Dictionary
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dictionaries.map((dictionary) => (
            <DictionaryCard key={dictionary.id} dictionary={dictionary} />
          ))}
        </div>
      )}
    </div>
  );
};