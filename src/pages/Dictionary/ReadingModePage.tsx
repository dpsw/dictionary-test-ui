import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Upload, 
  FileText, 
  Plus, 
  X, 
  Save,
  Eye,
  EyeOff,
  Settings,
  Sparkles,
  Volume2,
  Mic
} from 'lucide-react';
import { useAppStore } from '../../store';
import { RichTextEditor } from '../../components/Editor/RichTextEditor';
import { AddWordModal } from '../../components/Dictionary/AddWordModal';

export const ReadingModePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dictionaries, dictionaryEntries, setDictionaryEntries } = useAppStore();
  
  const dictionary = dictionaries.find(d => d.id === id);
  const [content, setContent] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const [readingSettings, setReadingSettings] = useState({
    fontSize: 16,
    lineHeight: 1.6,
    fontFamily: 'Inter',
    theme: 'light'
  });
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        const text = selection.toString().trim();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Only show popup for single words or short phrases (max 3 words)
        const wordCount = text.split(/\s+/).length;
        if (wordCount <= 3) {
          setSelectedText(text);
          setSelectionPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
          });
        }
      } else {
        setSelectedText('');
        setSelectionPosition(null);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, []);

  const handleAddWord = () => {
    setIsAddWordModalOpen(true);
    // Clear selection
    window.getSelection()?.removeAllRanges();
    setSelectionPosition(null);
  };

  const handleWordAdded = (newEntry: any) => {
    const currentEntries = dictionaryEntries[id!] || [];
    setDictionaryEntries(id!, [...currentEntries, newEntry]);
    setIsAddWordModalOpen(false);
    setSelectedText('');
  };

  const handlePasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setContent(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
      };
      reader.readAsText(file);
    }
  };

  const sampleTexts = [
    {
      title: "The Art of Language Learning",
      content: `Language learning is a fascinating journey that opens doors to new cultures and perspectives. When we embark on this adventure, we discover that each language carries within it the wisdom, humor, and worldview of its speakers.

The process of acquiring a new language involves multiple cognitive skills. We must train our ears to distinguish unfamiliar sounds, our tongues to produce new phonemes, and our minds to grasp different grammatical structures. This neuroplasticity demonstrates the remarkable adaptability of the human brain.

Immersion remains one of the most effective methods for language acquisition. When surrounded by native speakers, learners naturally absorb colloquialisms, intonation patterns, and cultural nuances that textbooks cannot fully capture. However, technology has revolutionized language learning, making immersive experiences accessible through virtual reality, interactive applications, and online communities.

The key to successful language learning lies in consistency and patience. Regular practice, even for short periods, proves more beneficial than sporadic intensive sessions. Embracing mistakes as learning opportunities rather than failures creates a positive mindset essential for progress.`
    },
    {
      title: "Digital Revolution in Education",
      content: `The digital transformation has fundamentally altered the educational landscape. Traditional classrooms are evolving into dynamic, technology-enhanced learning environments where students engage with interactive content and collaborate across geographical boundaries.

Artificial intelligence is personalizing education by adapting to individual learning styles and paces. Machine learning algorithms analyze student performance data to identify knowledge gaps and recommend targeted interventions. This personalized approach ensures that no student is left behind while challenging advanced learners appropriately.

Virtual and augmented reality technologies are creating immersive educational experiences. Students can explore ancient civilizations, conduct virtual chemistry experiments, or practice surgical procedures in risk-free environments. These technologies make abstract concepts tangible and memorable.

However, the digital divide remains a significant challenge. Ensuring equitable access to technology and high-speed internet is crucial for inclusive education. Educators must also develop digital literacy skills to effectively integrate technology into their pedagogical practices.`
    }
  ];

  if (!dictionary) {
    return <div>Dictionary not found</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className={`bg-white border-b border-gray-200 transition-all duration-300 ${showToolbar ? 'h-16' : 'h-12'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/dictionaries/${id}`)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary-500" />
                <h1 className="text-lg font-semibold text-gray-900">Reading Mode</h1>
                <span className="text-sm text-gray-500">• {dictionary.name}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowToolbar(!showToolbar)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                title={showToolbar ? 'Hide toolbar' : 'Show toolbar'}
              >
                {showToolbar ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Text Input */}
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${showToolbar ? 'w-96' : 'w-80'}`}>
          <div className="h-full flex flex-col">
            {showToolbar && (
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Import Text</h2>
                
                <div className="space-y-3">
                  <button
                    onClick={handlePasteText}
                    className="w-full btn-primary justify-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Paste from Clipboard
                  </button>
                  
                  <div className="relative">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button className="w-full btn-secondary justify-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Text File
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Sample Texts</h3>
                  <div className="space-y-2">
                    {sampleTexts.map((sample, index) => (
                      <button
                        key={index}
                        onClick={() => setContent(sample.content)}
                        className="w-full text-left p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded border border-gray-200"
                      >
                        {sample.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex-1 p-4">
              <div className="h-full">
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Paste or type your text here to start reading..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Reading View */}
        <div className="flex-1 bg-white relative">
          <div className="h-full overflow-y-auto">
            <div 
              ref={contentRef}
              className="max-w-4xl mx-auto p-8"
              style={{
                fontSize: `${readingSettings.fontSize}px`,
                lineHeight: readingSettings.lineHeight,
                fontFamily: readingSettings.fontFamily
              }}
            >
              {content ? (
                <div 
                  className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="text-center py-20">
                  <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Start Reading</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Import text from the left panel to begin reading. Select unfamiliar words to add them to your dictionary.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handlePasteText}
                      className="btn-primary"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      Paste Text
                    </button>
                    <button
                      onClick={() => setContent(sampleTexts[0].content)}
                      className="btn-secondary"
                    >
                      Try Sample Text
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Word Selection Popup */}
          {selectedText && selectionPosition && (
            <div
              className="fixed z-50 transform -translate-x-1/2 -translate-y-full"
              style={{
                left: selectionPosition.x,
                top: selectionPosition.y
              }}
            >
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 animate-scale-in">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">"{selectedText}"</span>
                  <button
                    onClick={handleAddWord}
                    className="btn-primary text-xs px-3 py-1"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add to Dictionary
                  </button>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Word Modal */}
      {isAddWordModalOpen && (
        <AddWordModal
          isOpen={isAddWordModalOpen}
          onClose={() => setIsAddWordModalOpen(false)}
          onWordAdded={handleWordAdded}
          dictionaryId={id!}
          initialTerm={selectedText}
        />
      )}
    </div>
  );
};