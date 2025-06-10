import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileCardProps {
  user: UserType;
  size?: 'sm' | 'md' | 'lg';
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: {
      container: 'p-2',
      avatar: 'h-8 w-8',
      icon: 'h-4 w-4',
      name: 'text-sm',
    },
    md: {
      container: 'p-3',
      avatar: 'h-10 w-10',
      icon: 'h-5 w-5',
      name: 'text-base',
    },
    lg: {
      container: 'p-4',
      avatar: 'h-12 w-12',
      icon: 'h-6 w-6',
      name: 'text-lg',
    },
  };

  return (
    <Link 
      to={`/profile/${user.id}`}
      className={`flex items-center space-x-3 rounded-lg hover:bg-gray-50 transition-colors ${sizeClasses[size].container}`}
    >
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className={`${sizeClasses[size].avatar} rounded-full`}
        />
      ) : (
        <div className={`${sizeClasses[size].avatar} rounded-full bg-primary-100 flex items-center justify-center`}>
          <User className={`${sizeClasses[size].icon} text-primary-600`} />
        </div>
      )}
      <div>
        <h3 className={`${sizeClasses[size].name} font-medium text-gray-900`}>{user.name}</h3>
        {size !== 'sm' && (
          <p className="text-sm text-gray-500">{user.email}</p>
        )}
      </div>
    </Link>
  );
};