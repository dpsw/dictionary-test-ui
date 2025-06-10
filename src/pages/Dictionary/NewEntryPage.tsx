import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Plus, Mic, Volume2, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store';

export const NewEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { dictionaryEntries, setDictionaryEntries, dictionaries } = useAppStore();
  
  const dictionary = dictionaries.find(d => d.id === id);
  
  const [formData, setFormData] = useState({
    term: '',
    pronunciation: '',
    partOfSpeech: 'noun',
    definition: '',
    example: '',
    translation: '',
    notes: ''
  });
  
  const [isRecording, setIsRecording] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry = {
      id: `entry-${Date.now()}`,
      dictionaryId: id!,
      term: formData.term,
      pronunciation: formData.pronunciation || undefined,
      partOfSpeech: formData.partOfSpeech,
      definitions: [{
        id: `def-${Date.now()}`,
        text: formData.definition,
        isAiGenerated: false
      }],
      examples: [{
        id: `ex-${Date.now()}`,
        text: formData.example,
        translation: formData.translation || undefined,
        isAiGenerated: false
      }],
      notes: formData.notes || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const currentEntries = dictionaryEntries[id!] || [];
    setDictionaryEntries(id!, [...currentEntries, newEntry]);
    navigate(`/dictionaries/${id}`);
  };
  
  if (!dictionary) {
    return <div>Dictionary not found</div>;
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BookOpen className="h-7 w-7 text-primary-500 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Entry</h1>
            <p className="text-gray-600 mt-1">to {dictionary.name}</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="term" className="form-label">Term</label>
            <input
              type="text"
              id="term"
              className="form-input"
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label htmlFor="pronunciation" className="form-label">Pronunciation</label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="pronunciation"
                className="form-input flex-1"
                value={formData.pronunciation}
                onChange={(e) => setFormData({ ...formData, pronunciation: e.target.value })}
                placeholder="e.g., /həˈloʊ/"
              />
              <button
                type="button"
                className="btn-secondary px-3"
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? (
                  <Mic className="h-5 w-5 text-error-500" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </button>
              <button
                type="button"
                className="btn-secondary px-3"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="partOfSpeech" className="form-label">Part of Speech</label>
          <select
            id="partOfSpeech"
            className="form-input"
            value={formData.partOfSpeech}
            onChange={(e) => setFormData({ ...formData, partOfSpeech: e.target.value })}
          >
            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            <option value="adjective">Adjective</option>
            <option value="adverb">Adverb</option>
            <option value="pronoun">Pronoun</option>
            <option value="preposition">Preposition</option>
            <option value="conjunction">Conjunction</option>
            <option value="interjection">Interjection</option>
          </select>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="definition" className="form-label !mb-0">Definition</label>
            <button
              type="button"
              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Generate with AI
            </button>
          </div>
          <textarea
            id="definition"
            rows={2}
            className="form-input"
            value={formData.definition}
            onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="example" className="form-label !mb-0">Example</label>
            <button
              type="button"
              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Generate with AI
            </button>
          </div>
          <textarea
            id="example"
            rows={2}
            className="form-input"
            value={formData.example}
            onChange={(e) => setFormData({ ...formData, example: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label htmlFor="translation" className="form-label">Translation</label>
          <input
            type="text"
            id="translation"
            className="form-input"
            value={formData.translation}
            onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            id="notes"
            rows={2}
            className="form-input"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any additional notes or context..."
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/dictionaries/${id}`)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <Plus className="h-5 w-5 mr-1" />
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
};