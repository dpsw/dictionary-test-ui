import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  Mic, 
  Edit, 
  Star,
  ExternalLink,
  Youtube,
  BookOpen,
  Clock,
  User
} from 'lucide-react';
import { DictionaryEntry } from '../../types';
import { formatDate } from '../../utils/formatters';

interface WordDetailsModalProps {
  entry: DictionaryEntry;
  entries: DictionaryEntry[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const WordDetailsModal: React.FC<WordDetailsModalProps> = ({
  entry,
  entries,
  isOpen,
  onClose,
  onNavigate
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'examples' | 'youtube'>('details');
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [loadingYoutube, setLoadingYoutube] = useState(false);

  const currentIndex = entries.findIndex(e => e.id === entry.id);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < entries.length - 1;

  // Mock YouTube search function
  const searchYoutubeExamples = async (term: string) => {
    setLoadingYoutube(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockVideos = [
        {
          id: '1',
          title: `How to use "${term}" in English - Grammar Lesson`,
          thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=320&h=180',
          channel: 'English Learning Hub',
          duration: '5:23',
          views: '125K views'
        },
        {
          id: '2',
          title: `"${term}" - Pronunciation and Examples`,
          thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=320&h=180',
          channel: 'Pronunciation Pro',
          duration: '3:45',
          views: '89K views'
        },
        {
          id: '3',
          title: `Advanced usage of "${term}" - Native Speaker Examples`,
          thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=320&h=180',
          channel: 'Native English TV',
          duration: '8:12',
          views: '203K views'
        }
      ];
      setYoutubeVideos(mockVideos);
      setLoadingYoutube(false);
    }, 1000);
  };

  useEffect(() => {
    if (activeTab === 'youtube' && youtubeVideos.length === 0) {
      searchYoutubeExamples(entry.term);
    }
  }, [activeTab, entry.term, youtubeVideos.length]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onNavigate('prev')}
                    disabled={!canGoPrev}
                    className={`p-2 rounded-full transition-colors ${
                      canGoPrev 
                        ? 'text-gray-600 hover:text-primary-600 hover:bg-primary-50' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-gray-500">
                    {currentIndex + 1} of {entries.length}
                  </span>
                  <button
                    onClick={() => onNavigate('next')}
                    disabled={!canGoNext}
                    className={`p-2 rounded-full transition-colors ${
                      canGoNext 
                        ? 'text-gray-600 hover:text-primary-600 hover:bg-primary-50' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{entry.term}</h2>
                  {entry.pronunciation && (
                    <p className="text-gray-500">/{entry.pronunciation}/</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors">
                  <Star className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Audio controls */}
            <div className="mt-4 flex items-center space-x-3">
              <span className="badge-secondary">{entry.partOfSpeech}</span>
              
              <div className="flex items-center space-x-2">
                {entry.audioUrl && (
                  <button 
                    onClick={toggleAudio}
                    className={`p-2 rounded-full transition-colors ${
                      isPlaying 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                )}
                
                <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                  <Volume2 className="h-4 w-4" />
                </button>
                
                <button 
                  onClick={toggleRecording}
                  className={`p-2 rounded-full transition-colors ${
                    isRecording 
                      ? 'bg-red-100 text-red-700' 
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Mic className="h-4 w-4" />
                </button>
                
                {isRecording && (
                  <span className="text-sm text-red-600 animate-pulse">Recording...</span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'details'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <BookOpen className="h-4 w-4 inline mr-2" />
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('examples')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'examples'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <ExternalLink className="h-4 w-4 inline mr-2" />
                  Examples
                </button>
                <button
                  onClick={() => setActiveTab('youtube')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'youtube'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Youtube className="h-4 w-4 inline mr-2" />
                  YouTube Examples
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-6 max-h-96 overflow-y-auto">
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Definitions */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Definitions</h3>
                  <div className="space-y-3">
                    {entry.definitions.map((definition, index) => (
                      <div key={definition.id} className="flex">
                        <span className="text-gray-500 mr-3 font-medium">{index + 1}.</span>
                        <div>
                          <p className="text-gray-800">{definition.text}</p>
                          {definition.isAiGenerated && (
                            <span className="text-xs text-primary-500 italic mt-1 block">
                              AI-generated
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {entry.notes && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{entry.notes}</p>
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Entry Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Created {formatDate(entry.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>Last updated {formatDate(entry.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Usage Examples</h3>
                {entry.examples.length > 0 ? (
                  <div className="space-y-4">
                    {entry.examples.map((example) => (
                      <div key={example.id} className="border-l-4 border-primary-200 pl-4 py-2">
                        <p className="text-gray-800 font-medium">{example.text}</p>
                        {example.translation && (
                          <p className="text-gray-600 mt-1">{example.translation}</p>
                        )}
                        {example.isAiGenerated && (
                          <span className="text-xs text-primary-500 italic mt-1 block">
                            AI-generated
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No examples available for this entry.</p>
                    <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm">
                      Add example
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'youtube' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">YouTube Examples</h3>
                  <button 
                    onClick={() => searchYoutubeExamples(entry.term)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Refresh
                  </button>
                </div>
                
                {loadingYoutube ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Searching for examples...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {youtubeVideos.map((video) => (
                      <div key={video.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="relative flex-shrink-0">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-32 h-18 object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-70 rounded-full p-2">
                              <Play className="h-4 w-4 text-white" />
                            </div>
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {video.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{video.channel}</p>
                          <p className="text-xs text-gray-500 mt-1">{video.views}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-full transition-colors">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Use arrow keys to navigate between entries
            </div>
            <div className="flex space-x-2">
              <button className="btn-secondary text-sm">
                Export Entry
              </button>
              <button className="btn-primary text-sm">
                Edit Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};