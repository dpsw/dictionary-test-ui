import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Mic, 
  ExternalLink, 
  Edit,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { DictionaryEntry } from '../../types';

interface DictionaryEntryCardProps {
  entry: DictionaryEntry;
  onOpenDetails?: (entry: DictionaryEntry) => void;
}

export const DictionaryEntryCard: React.FC<DictionaryEntryCardProps> = ({ 
  entry, 
  onOpenDetails 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open details if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onOpenDetails?.(entry);
  };

  return (
    <div 
      className="card animate-fade-in h-full cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-medium text-gray-900 hover:text-primary-600 transition-colors">
              {entry.term}
            </h3>
            {entry.pronunciation && (
              <span className="text-gray-500 text-sm">/{entry.pronunciation}/</span>
            )}
          </div>
          <div className="flex space-x-2">
            {entry.audioUrl && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAudio();
                }}
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
            )}
            <button 
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
        </div>

        <span className="mt-2 badge-secondary inline-flex self-start">
          {entry.partOfSpeech}
        </span>
        
        <div className="mt-4 flex-grow">
          {entry.definitions.slice(0, 2).map((definition, index) => (
            <div key={definition.id} className="mb-2">
              <p className="text-gray-800">
                <span className="text-gray-500 mr-2">{index + 1}.</span>
                {definition.text}
                {definition.isAiGenerated && (
                  <span className="ml-2 text-xs text-primary-500 italic">AI-generated</span>
                )}
              </p>
            </div>
          ))}
          {entry.definitions.length > 2 && (
            <p className="text-sm text-gray-500">
              +{entry.definitions.length - 2} more definitions
            </p>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide details
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show examples
                </>
              )}
            </button>
            
            {entry.userAudioUrl && (
              <span className="text-xs flex items-center text-accent-600">
                <Mic className="h-3 w-3 mr-1" />
                User recording
              </span>
            )}
          </div>
          
          {isExpanded && (
            <div className="mt-4 animate-slide-up">
              {entry.examples.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Examples:</h4>
                  {entry.examples.slice(0, 2).map((example) => (
                    <div key={example.id} className="pl-4 border-l-2 border-gray-200">
                      <p className="text-gray-800">{example.text}</p>
                      {example.translation && (
                        <p className="text-gray-600 text-sm mt-1">{example.translation}</p>
                      )}
                      {example.isAiGenerated && (
                        <span className="text-xs text-primary-500 italic">AI-generated</span>
                      )}
                    </div>
                  ))}
                  {entry.examples.length > 2 && (
                    <p className="text-sm text-gray-500 pl-4">
                      +{entry.examples.length - 2} more examples
                    </p>
                  )}
                </div>
              )}
              
              {entry.notes && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Notes:</h4>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2">{entry.notes}</p>
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails?.(entry);
                  }}
                  className="text-sm text-gray-600 hover:text-primary-600 flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View full details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};