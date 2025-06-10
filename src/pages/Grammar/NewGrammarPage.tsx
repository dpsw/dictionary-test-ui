import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Plus } from 'lucide-react';
import { useAppStore } from '../../store';
import { LanguageSelector } from '../../components/UI/LanguageSelector';
import { RichTextEditor } from '../../components/Editor/RichTextEditor';

export const NewGrammarPage: React.FC = () => {
  const navigate = useNavigate();
  const { grammars, setGrammars } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: '',
    content: '',
    isPublic: true
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGrammar = {
      id: `gram-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'user-1',
      ruleCount: 0
    };
    
    setGrammars([...grammars, newGrammar]);
    navigate(`/grammar/${newGrammar.id}`);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <GraduationCap className="h-7 w-7 text-secondary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Create New Grammar Resource</h1>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div>
          <label htmlFor="name" className="form-label">Resource Name</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Spanish Verb Conjugation Rules"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="form-label">Short Description</label>
          <textarea
            id="description"
            rows={2}
            className="form-input"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief overview of what this grammar resource covers"
            required
          />
        </div>
        
        <div>
          <LanguageSelector
            label="Language"
            value={formData.language}
            onChange={(language) => setFormData({ ...formData, language })}
          />
        </div>
        
        <div>
          <label className="form-label">Content</label>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            placeholder="Start writing your grammar explanation here..."
          />
          <p className="mt-2 text-sm text-gray-500">
            Use the toolbar to format your text, add lists, and highlight important information.
          </p>
        </div>
        
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-secondary-600 shadow-sm focus:border-secondary-300 focus:ring focus:ring-secondary-200 focus:ring-opacity-50"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
            />
            <span className="ml-2 text-gray-700">Make this resource public</span>
          </label>
          <p className="mt-1 text-sm text-gray-500">
            Public resources can be viewed and copied by other users
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/grammar')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-secondary">
            <Plus className="h-5 w-5 mr-1" />
            Create Resource
          </button>
        </div>
      </form>
    </div>
  );
};