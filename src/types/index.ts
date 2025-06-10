export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  favorites: {
    dictionaries: string[];
    grammars: string[];
  };
}

export interface Dictionary {
  id: string;
  name: string;
  description: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic: boolean;
  entryCount: number;
  favoriteCount: number;
  copyCount: number;
}

export interface DictionaryEntry {
  id: string;
  dictionaryId: string;
  term: string;
  pronunciation?: string;
  partOfSpeech: string;
  definitions: Definition[];
  examples: Example[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  audioUrl?: string;
  userAudioUrl?: string;
}

export interface Definition {
  id: string;
  text: string;
  isAiGenerated: boolean;
}

export interface Example {
  id: string;
  text: string;
  translation?: string;
  isAiGenerated: boolean;
}

export interface Grammar {
  id: string;
  name: string;
  description: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic: boolean;
  ruleCount: number;
  favoriteCount: number;
  copyCount: number;
}

export interface GrammarRule {
  id: string;
  grammarId: string;
  title: string;
  explanation: string;
  examples: Example[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Roadmap {
  id: string;
  name: string;
  description: string;
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic: boolean;
  enrollmentCount: number;
  favoriteCount: number;
  copyCount: number;
  steps: RoadmapStep[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  order: number;
  type: 'dictionary' | 'grammar' | 'practice' | 'milestone';
  resourceId?: string; // ID of linked dictionary or grammar
  isCompleted: boolean;
  estimatedTime: string;
  objectives: string[];
}

export interface UserProgress {
  roadmapId: string;
  userId: string;
  currentStep: number;
  completedSteps: string[];
  startedAt: string;
  lastAccessedAt: string;
  completionPercentage: number;
}

export interface SearchFilters {
  query: string;
  languages: string[];
  isPublicOnly: boolean;
}

export type ViewMode = 'row' | 'card';