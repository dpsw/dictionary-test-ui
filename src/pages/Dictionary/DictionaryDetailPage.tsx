import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Globe, 
  Share2, 
  Download, 
  Settings,
  LayoutList,
  LayoutGrid,
  BookOpenCheck
} from 'lucide-react';
import { useAppStore } from '../../store';
import { DictionaryEntryRow } from '../../components/Dictionary/DictionaryEntryRow';
import { DictionaryEntryCard } from '../../components/Dictionary/DictionaryEntryCard';
import { WordDetailsModal } from '../../components/Dictionary/WordDetailsModal';
import { EmptyState } from '../../components/UI/EmptyState';
import { UserProfileCard } from '../../components/UserProfileCard';
import { DictionaryEntry } from '../../types';

export const DictionaryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    dictionaries, 
    dictionaryEntries, 
    setCurrentDictionary, 
    users,
    entriesViewMode,
    setEntriesViewMode 
  } = useAppStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const dictionary = dictionaries.find(d => d.id === id);
  const entries = dictionaryEntries[id || ''] || [];
  const creator = users.find(u => u.id === dictionary?.userId);
  
  // Filter entries based on search query
  const filteredEntries = entries.filter(entry => 
    entry.term.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    if (dictionary) {
      setCurrentDictionary(dictionary);
    }
    
    return () => {
      setCurrentDictionary(null);
    };
  }, [dictionary, setCurrentDictionary]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen || !selectedEntry) return;

      const currentIndex = filteredEntries.findIndex(entry => entry.id === selectedEntry.id);
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setSelectedEntry(filteredEntries[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < filteredEntries.length - 1) {
        setSelectedEntry(filteredEntries[currentIndex + 1]);
      } else if (e.key === 'Escape') {
        setIsModalOpen(false);
        setSelectedEntry(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedEntry, filteredEntries]);
  
  const handleOpenDetails = (entry: DictionaryEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedEntry) return;

    const currentIndex = filteredEntries.findIndex(entry => entry.id === selectedEntry.id);
    
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedEntry(filteredEntries[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < filteredEntries.length - 1) {
      setSelectedEntry(filteredEntries[currentIndex + 1]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };
  
  if (!dictionary) {
    return <div>Dictionary not found</div>;
  }
  
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-7 w-7 text-primary-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">{dictionary.name}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link 
              to={`/dictionaries/${id}/reading`}
              className="btn-accent"
            >
              <BookOpenCheck className="h-4 w-4 mr-1" />
              Reading Mode
            </Link>
            <button className="btn-secondary">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </button>
            <button className="btn-secondary">
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
            <button className="btn-secondary">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </button>
          </div>
        </div>
        
        <p className="mt-2 text-gray-600">{dictionary.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge-primary flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            {dictionary.sourceLanguage} → {dictionary.targetLanguage}
          </span>
          <span className="badge bg-gray-100 text-gray-700">
            {dictionary.entryCount} entries
          </span>
          {!dictionary.isPublic && (
            <span className="badge bg-gray-100 text-gray-700">
              Private
            </span>
          )}
        </div>

        {creator && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Created by</h3>
            <UserProfileCard user={creator} size="md" />
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              className="form-input pl-10"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="border border-gray-300 rounded-lg p-1 flex">
            <button
              className={`p-2 rounded ${
                entriesViewMode === 'row'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setEntriesViewMode('row')}
              title="List view"
            >
              <LayoutList className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded ${
                entriesViewMode === 'card'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setEntriesViewMode('card')}
              title="Grid view"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
          </div>
          <Link to={`/dictionaries/${id}/entry/new`} className="btn-primary">
            <Plus className="h-5 w-5 mr-1" />
            Add Entry
          </Link>
        </div>
      </div>
      
      {entries.length === 0 ? (
        <EmptyState 
          title="No entries yet"
          description="Start building your dictionary by adding new vocabulary entries or use Reading Mode to import text and add words as you read."
          actionLink={`/dictionaries/${id}/entry/new`}
          actionText="Add First Entry"
          icon="dictionary"
        />
      ) : (
        <div className={entriesViewMode === 'card' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredEntries.map((entry) => (
            entriesViewMode === 'card' ? (
              <DictionaryEntryCard 
                key={entry.id} 
                entry={entry} 
                onOpenDetails={handleOpenDetails}
              />
            ) : (
              <DictionaryEntryRow 
                key={entry.id} 
                entry={entry} 
                onOpenDetails={handleOpenDetails}
              />
            )
          ))}
          {filteredEntries.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">No entries match your search.</p>
            </div>
          )}
        </div>
      )}

      {/* Word Details Modal */}
      {selectedEntry && (
        <WordDetailsModal
          entry={selectedEntry}
          entries={filteredEntries}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
};