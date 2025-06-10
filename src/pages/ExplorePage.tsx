import React, { useState } from 'react';
import { Search, Filter, BookOpen, GraduationCap } from 'lucide-react';
import { useAppStore } from '../store';
import { DictionaryCard } from '../components/Dictionary/DictionaryCard';
import { GrammarCard } from '../components/Grammar/GrammarCard';
import { LanguageSelector } from '../components/UI/LanguageSelector';

type ResourceType = 'all' | 'dictionaries' | 'grammar';

export const ExplorePage: React.FC = () => {
  const { dictionaries, grammars } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [resourceType, setResourceType] = useState<ResourceType>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract all unique languages from dictionaries and grammars
  const allLanguages = new Set<string>();
  dictionaries.forEach(dict => {
    allLanguages.add(dict.sourceLanguage);
    allLanguages.add(dict.targetLanguage);
  });
  grammars.forEach(grammar => {
    allLanguages.add(grammar.language);
  });
  
  // Filter resources based on search query, language, and type
  const filteredDictionaries = dictionaries.filter(dict => 
    (searchQuery === '' || 
      dict.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dict.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedLanguage === '' || 
      dict.sourceLanguage === selectedLanguage || 
      dict.targetLanguage === selectedLanguage)
  );
  
  const filteredGrammars = grammars.filter(grammar => 
    (searchQuery === '' || 
      grammar.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      grammar.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedLanguage === '' || grammar.language === selectedLanguage)
  );
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Resources</h1>
        <p className="text-gray-600">
          Discover dictionaries and grammar resources to enhance your language learning journey.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                className="form-input pl-10 w-full"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <button 
            className="btn-secondary md:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 mr-1" />
            Filters
          </button>
          
          <div className="flex space-x-1 border border-gray-300 rounded-md">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                resourceType === 'all' 
                  ? 'bg-primary-50 text-primary-700 border-r border-gray-300' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-r border-gray-300'
              }`}
              onClick={() => setResourceType('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                resourceType === 'dictionaries' 
                  ? 'bg-primary-50 text-primary-700 border-r border-gray-300' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-r border-gray-300'
              }`}
              onClick={() => setResourceType('dictionaries')}
            >
              <BookOpen className="h-4 w-4 mr-1 inline" />
              Dictionaries
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                resourceType === 'grammar' 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setResourceType('grammar')}
            >
              <GraduationCap className="h-4 w-4 mr-1 inline" />
              Grammar
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <LanguageSelector 
                  label="Filter by Language"
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                />
              </div>
              <div className="flex items-end">
                <button 
                  className="btn-secondary text-sm h-10"
                  onClick={() => {
                    setSelectedLanguage('');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dictionaries Section */}
      {(resourceType === 'all' || resourceType === 'dictionaries') && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dictionaries</h2>
          
          {filteredDictionaries.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-100">
              <p className="text-gray-600">No dictionaries match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDictionaries.map((dictionary) => (
                <DictionaryCard key={dictionary.id} dictionary={dictionary} />
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Grammar Resources Section */}
      {(resourceType === 'all' || resourceType === 'grammar') && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Grammar Resources</h2>
          
          {filteredGrammars.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-100">
              <p className="text-gray-600">No grammar resources match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGrammars.map((grammar) => (
                <GrammarCard key={grammar.id} grammar={grammar} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};