import React from 'react';
import { useAppStore } from '../../store';
import { DictionaryList } from '../../components/Dictionary/DictionaryList';

export const DictionariesPage: React.FC = () => {
  const { dictionaries } = useAppStore();
  
  return (
    <div>
      <DictionaryList 
        dictionaries={dictionaries} 
        title="Your Dictionaries"
      />
    </div>
  );
};