import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Languages, Search, Map, Play } from 'lucide-react';
import { useAppStore } from '../store';
import { DictionaryCard } from '../components/Dictionary/DictionaryCard';
import { GrammarCard } from '../components/Grammar/GrammarCard';
import { RoadmapCard } from '../components/Roadmaps/RoadmapCard';

export const HomePage: React.FC = () => {
  const { dictionaries, grammars, roadmaps, userProgress, currentUser } = useAppStore();
  
  // Get the most recently updated dictionaries and grammars
  const recentDictionaries = [...dictionaries]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);
    
  const recentGrammars = [...grammars]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  // Get enrolled roadmaps
  const enrolledRoadmapIds = userProgress
    .filter(p => p.userId === currentUser?.id)
    .map(p => p.roadmapId);
  
  const enrolledRoadmaps = roadmaps
    .filter(r => enrolledRoadmapIds.includes(r.id))
    .slice(0, 3);

  // Get featured roadmaps if not enrolled in any
  const featuredRoadmaps = roadmaps
    .filter(r => r.isPublic)
    .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
    .slice(0, 3);

  const displayRoadmaps = enrolledRoadmaps.length > 0 ? enrolledRoadmaps : featuredRoadmaps;

  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="p-3 bg-primary-100 rounded-full">
              <Languages className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to LinguaVault, {currentUser?.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your personal language learning library with AI-powered tools for dictionaries, grammar resources, and structured learning roadmaps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dictionaries/new" className="btn-primary">
              <BookOpen className="h-5 w-5 mr-2" />
              Create Dictionary
            </Link>
            <Link to="/grammar/new" className="btn-secondary">
              <GraduationCap className="h-5 w-5 mr-2" />
              Create Grammar Resource
            </Link>
            <Link to="/roadmaps/new" className="btn-accent">
              <Map className="h-5 w-5 mr-2" />
              Create Roadmap
            </Link>
            <Link to="/explore" className="btn-secondary">
              <Search className="h-5 w-5 mr-2" />
              Explore Resources
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Learning Roadmaps */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {enrolledRoadmaps.length > 0 ? 'Your Learning Journey' : 'Featured Roadmaps'}
          </h2>
          <Link 
            to="/roadmaps" 
            className="text-primary-600 hover:text-primary-800 font-medium text-sm"
          >
            View all
          </Link>
        </div>
        
        {displayRoadmaps.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-100">
            <p className="text-gray-600 mb-4">Start your structured learning journey with roadmaps.</p>
            <Link to="/roadmaps" className="btn-primary">
              <Map className="h-5 w-5 mr-2" />
              Explore Roadmaps
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRoadmaps.map((roadmap) => {
              const progress = userProgress.find(
                p => p.roadmapId === roadmap.id && p.userId === currentUser?.id
              );
              return (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} progress={progress} />
              );
            })}
          </div>
        )}
      </motion.section>
      
      {/* Recent Dictionaries */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Dictionaries</h2>
          <Link 
            to="/dictionaries" 
            className="text-primary-600 hover:text-primary-800 font-medium text-sm"
          >
            View all
          </Link>
        </div>
        
        {recentDictionaries.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-100">
            <p className="text-gray-600 mb-4">You haven't created any dictionaries yet.</p>
            <Link to="/dictionaries/new" className="btn-primary">
              Create Your First Dictionary
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDictionaries.map((dictionary) => (
              <DictionaryCard key={dictionary.id} dictionary={dictionary} />
            ))}
          </div>
        )}
      </motion.section>
      
      {/* Recent Grammar Resources */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Grammar Resources</h2>
          <Link 
            to="/grammar" 
            className="text-secondary-600 hover:text-secondary-800 font-medium text-sm"
          >
            View all
          </Link>
        </div>
        
        {recentGrammars.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-100">
            <p className="text-gray-600 mb-4">You haven't created any grammar resources yet.</p>
            <Link to="/grammar/new" className="btn-secondary">
              Create Your First Grammar Resource
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGrammars.map((grammar) => (
              <GrammarCard key={grammar.id} grammar={grammar} />
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};