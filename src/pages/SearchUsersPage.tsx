import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { useAppStore } from '../store';
import { UserProfileCard } from '../components/UserProfileCard';

export const SearchUsersPage: React.FC = () => {
  const { users } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = searchQuery.trim() === '' 
    ? users 
    : users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Users</h1>
        <div className="relative">
          <input
            type="text"
            className="form-input pl-10 w-full"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-4">
                <UserProfileCard user={user} size="lg" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};