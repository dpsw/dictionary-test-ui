import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Plus } from 'lucide-react';
import { useAppStore } from '../../store';
import { LanguageSelector } from '../../components/UI/LanguageSelector';

export const NewDictionaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { dictionaries, setDictionaries } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sourceLanguage: '',
    targetLanguage: '',
    isPublic: true
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDictionary = {
      id: `dict-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'user-1',
      entryCount: 0
    };
    
    setDictionaries([...dictionaries, newDictionary]);
    navigate(`/dictionaries/${newDictionary.id}`);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BookOpen className="h-7 w-7 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Create New Dictionary</h1>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div>
          <label htmlFor="name" className="form-label">Dictionary Name</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            rows={3}
            className="form-input"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <LanguageSelector
              label="Source Language"
              value={formData.sourceLanguage}
              onChange={(language) => setFormData({ ...formData, sourceLanguage: language })}
            />
          </div>
          <div>
            <LanguageSelector
              label="Target Language"
              value={formData.targetLanguage}
              onChange={(language) => setFormData({ ...formData, targetLanguage: language })}
            />
          </div>
        </div>
        
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
            />
            <span className="ml-2 text-gray-700">Make this dictionary public</span>
          </label>
          <p className="mt-1 text-sm text-gray-500">
            Public dictionaries can be viewed and copied by other users
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dictionaries')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <Plus className="h-5 w-5 mr-1" />
            Create Dictionary
          </button>
        </div>
      </form>
    </div>
  );
};