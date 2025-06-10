import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLink: string;
  actionText: string;
  icon?: 'dictionary' | 'grammar';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLink,
  actionText,
  icon = 'dictionary',
}) => {
  return (
    <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary-50 mb-4">
        {icon === 'dictionary' ? (
          <BookOpen className="h-8 w-8 text-primary-500" />
        ) : (
          <GraduationCap className="h-8 w-8 text-secondary-500" />
        )}
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      <Link 
        to={actionLink} 
        className={`btn ${icon === 'dictionary' ? 'btn-primary' : 'btn-secondary'}`}
      >
        <Plus className="h-5 w-5 mr-1" />
        {actionText}
      </Link>
    </div>
  );
};