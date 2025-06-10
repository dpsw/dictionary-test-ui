import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Globe, 
  Share2, 
  Download, 
  Settings 
} from 'lucide-react';
import { useAppStore } from '../../store';
import { GrammarRuleCard } from '../../components/Grammar/GrammarRuleCard';
import { EmptyState } from '../../components/UI/EmptyState';
import { UserProfileCard } from '../../components/UserProfileCard';

export const GrammarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { grammars, grammarRules, setCurrentGrammar, users } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  const grammar = grammars.find(g => g.id === id);
  const rules = grammarRules[id || ''] || [];
  const creator = users.find(u => u.id === grammar?.userId);
  
  // Filter rules based on search query
  const filteredRules = rules.filter(rule => 
    rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    if (grammar) {
      setCurrentGrammar(grammar);
    }
    
    return () => {
      setCurrentGrammar(null);
    };
  }, [grammar, setCurrentGrammar]);
  
  if (!grammar) {
    return <div>Grammar resource not found</div>;
  }
  
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <GraduationCap className="h-7 w-7 text-secondary-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">{grammar.name}</h1>
          </div>
          <div className="flex items-center space-x-2">
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
        
        <p className="mt-2 text-gray-600">{grammar.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge bg-secondary-100 text-secondary-800 flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            {grammar.language}
          </span>
          <span className="badge bg-gray-100 text-gray-700">
            {grammar.ruleCount} rules
          </span>
          {!grammar.isPublic && (
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
              placeholder="Search grammar rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <Link to={`/grammar/${id}/rule/new`} className="btn-secondary">
          <Plus className="h-5 w-5 mr-1" />
          Add Rule
        </Link>
      </div>
      
      {rules.length === 0 ? (
        <EmptyState 
          title="No grammar rules yet"
          description="Start building your grammar resource by adding new rules."
          actionLink={`/grammar/${id}/rule/new`}
          actionText="Add First Rule"
          icon="grammar"
        />
      ) : (
        <div className="space-y-4">
          {filteredRules.map((rule) => (
            <GrammarRuleCard key={rule.id} rule={rule} />
          ))}
          {filteredRules.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">No rules match your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};