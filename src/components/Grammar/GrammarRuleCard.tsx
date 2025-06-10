import React, { useState } from 'react';
import { 
  BookOpen, 
  Edit,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { GrammarRule } from '../../types';

interface GrammarRuleCardProps {
  rule: GrammarRule;
}

export const GrammarRuleCard: React.FC<GrammarRuleCardProps> = ({ rule }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card animate-fade-in overflow-visible">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-xl font-medium text-gray-900">{rule.title}</h3>
            </div>
            
            <div className="mt-3">
              <p className="text-gray-700">
                {rule.explanation}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-secondary-600 hover:bg-secondary-50 rounded-full transition-colors">
              <Edit className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-secondary-600 hover:text-secondary-700 flex items-center"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide examples
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show examples
              </>
            )}
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-slide-up">
            {rule.examples.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Examples:</h4>
                {rule.examples.map((example) => (
                  <div key={example.id} className="pl-4 border-l-2 border-gray-200">
                    <p className="text-gray-800">{example.text}</p>
                    {example.isAiGenerated && (
                      <span className="text-xs text-secondary-500 italic">AI-generated</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {rule.notes && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Notes:</h4>
                <p className="text-gray-700 text-sm mt-1">{rule.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};