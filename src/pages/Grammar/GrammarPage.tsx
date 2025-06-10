import React from 'react';
import { useAppStore } from '../../store';
import { GrammarList } from '../../components/Grammar/GrammarList';

export const GrammarPage: React.FC = () => {
  const { grammars } = useAppStore();
  
  return (
    <div>
      <GrammarList 
        grammars={grammars} 
        title="Your Grammar Resources"
      />
    </div>
  );
};