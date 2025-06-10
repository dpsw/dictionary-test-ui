import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Camera, Lock, Bell, Globe, LogOut } from 'lucide-react';
import { useAppStore } from '../store';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    language: 'en',
    notifications: {
      email: true,
      push: true
    },
    privacy: {
      profileVisibility: 'public',
      activityVisibility: 'public'
    }
  });
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        name: formData.name,
        email: formData.email
      });
    }
    navigate('/profile');
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account preferences and settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
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
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Profile Picture</h2>
              <button className="mt-2 btn-secondary">
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="divide-y divide-gray-100">
          {/* Profile Information */}
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="form-label">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    className="form-input pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="form-input pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Profile Visibility</label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="profileVisibility"
                      value="public"
                      checked={formData.privacy.profileVisibility === 'public'}
                      onChange={(e) => setFormData({
                        ...formData,
                        privacy: { ...formData.privacy, profileVisibility: e.target.value }
                      })}
                    />
                    <span className="ml-2 text-gray-700">Public</span>
                  </label>
                  <br />
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="profileVisibility"
                      value="private"
                      checked={formData.privacy.profileVisibility === 'private'}
                      onChange={(e) => setFormData({
                        ...formData,
                        privacy: { ...formData.privacy, profileVisibility: e.target.value }
                      })}
                    />
                    <span className="ml-2 text-gray-700">Private</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={formData.notifications.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, email: e.target.checked }
                    })}
                  />
                  <span className="ml-2 text-gray-700">Email notifications</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={formData.notifications.push}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, push: e.target.checked }
                    })}
                  />
                  <span className="ml-2 text-gray-700">Push notifications</span>
                </label>
              </div>
            </div>
          </div>

          {/* Language Preferences */}
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Language Preferences</h3>
            <div>
              <label htmlFor="language" className="form-label">Interface Language</label>
              <div className="relative">
                <select
                  id="language"
                  className="form-input pl-10"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex justify-between items-center">
            <button
              type="button"
              onClick={handleLogout}
              className="btn-secondary text-error-600 hover:text-error-700 hover:bg-error-50"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
            
            <div className="space-x-4">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};