import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Map, Users, Clock, Star } from 'lucide-react';
import { useAppStore } from '../../store';
import { RoadmapCard } from '../../components/Roadmaps/RoadmapCard';
import { LanguageSelector } from '../../components/UI/LanguageSelector';

type RoadmapFilter = 'all' | 'enrolled' | 'favorites' | 'my-roadmaps';

export const RoadmapsPage: React.FC = () => {
  const { roadmaps, userProgress, currentUser } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [activeFilter, setActiveFilter] = useState<RoadmapFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get user's enrolled roadmaps
  const enrolledRoadmapIds = userProgress
    .filter(p => p.userId === currentUser?.id)
    .map(p => p.roadmapId);

  // Filter roadmaps based on active filter
  const getFilteredRoadmaps = () => {
    let filtered = roadmaps;

    switch (activeFilter) {
      case 'enrolled':
        filtered = roadmaps.filter(r => enrolledRoadmapIds.includes(r.id));
        break;
      case 'favorites':
        // For now, show all public roadmaps as potential favorites
        filtered = roadmaps.filter(r => r.isPublic);
        break;
      case 'my-roadmaps':
        filtered = roadmaps.filter(r => r.userId === currentUser?.id);
        break;
      default:
        filtered = roadmaps.filter(r => r.isPublic);
    }

    // Apply search and language filters
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLanguage) {
      filtered = filtered.filter(r => r.language === selectedLanguage);
    }

    if (selectedLevel) {
      filtered = filtered.filter(r => r.level === selectedLevel);
    }

    return filtered;
  };

  const filteredRoadmaps = getFilteredRoadmaps();

  const filterButtons = [
    { key: 'all', label: 'All Roadmaps', icon: Map },
    { key: 'enrolled', label: 'My Learning', icon: Users },
    { key: 'favorites', label: 'Favorites', icon: Star },
    { key: 'my-roadmaps', label: 'Created by Me', icon: Plus }
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Roadmaps</h1>
            <p className="text-gray-600">
              Structured learning paths to guide your language journey from beginner to advanced
            </p>
          </div>
          <Link to="/roadmaps/new" className="btn-primary">
            <Plus className="h-5 w-5 mr-1" />
            Create Roadmap
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {filterButtons.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key as RoadmapFilter)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeFilter === key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {key === 'enrolled' && enrolledRoadmapIds.length > 0 && (
                  <span className="bg-primary-100 text-primary-800 text-xs rounded-full px-2 py-0.5">
                    {enrolledRoadmapIds.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                className="form-input pl-10 w-full"
                placeholder="Search roadmaps..."
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
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <LanguageSelector 
                  label="Language"
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                />
              </div>
              <div>
                <label className="form-label">Level</label>
                <select
                  className="form-input"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  className="btn-secondary text-sm h-10"
                  onClick={() => {
                    setSelectedLanguage('');
                    setSelectedLevel('');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Roadmaps Grid */}
      {filteredRoadmaps.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
            <Map className="h-8 w-8 text-primary-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeFilter === 'enrolled' ? 'No enrolled roadmaps' : 
             activeFilter === 'my-roadmaps' ? 'No roadmaps created' :
             'No roadmaps found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {activeFilter === 'enrolled' ? 'Start your learning journey by enrolling in a roadmap' :
             activeFilter === 'my-roadmaps' ? 'Create your first roadmap to share your knowledge' :
             'Try adjusting your search criteria or filters'}
          </p>
          {activeFilter === 'my-roadmaps' && (
            <Link to="/roadmaps/new" className="btn-primary">
              <Plus className="h-5 w-5 mr-1" />
              Create Your First Roadmap
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap) => {
            const progress = userProgress.find(
              p => p.roadmapId === roadmap.id && p.userId === currentUser?.id
            );
            
            return (
              <RoadmapCard 
                key={roadmap.id} 
                roadmap={roadmap} 
                progress={progress}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};