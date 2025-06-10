import { create } from 'zustand';
import { 
  Dictionary, 
  DictionaryEntry, 
  Grammar, 
  GrammarRule,
  Roadmap,
  UserProgress,
  SearchFilters,
  User,
  ViewMode 
} from '../types';
import { 
  mockDictionaries, 
  mockDictionaryEntries, 
  mockGrammars, 
  mockGrammarRules,
  mockUsers,
  mockRoadmaps,
  mockUserProgress
} from '../data/mockData';

interface AppState {
  // User state
  currentUser: User | null;
  isAuthenticated: boolean;
  users: User[];
  
  // Dictionary state
  dictionaries: Dictionary[];
  currentDictionary: Dictionary | null;
  dictionaryEntries: Record<string, DictionaryEntry[]>;
  entriesViewMode: ViewMode;
  
  // Grammar state
  grammars: Grammar[];
  currentGrammar: Grammar | null;
  grammarRules: Record<string, GrammarRule[]>;
  
  // Roadmap state
  roadmaps: Roadmap[];
  currentRoadmap: Roadmap | null;
  userProgress: UserProgress[];
  
  // Search state
  searchFilters: SearchFilters;
  
  // UI state
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  setDictionaries: (dictionaries: Dictionary[]) => void;
  setCurrentDictionary: (dictionary: Dictionary | null) => void;
  setDictionaryEntries: (dictionaryId: string, entries: DictionaryEntry[]) => void;
  setEntriesViewMode: (mode: ViewMode) => void;
  setGrammars: (grammars: Grammar[]) => void;
  setCurrentGrammar: (grammar: Grammar | null) => void;
  setGrammarRules: (grammarId: string, rules: GrammarRule[]) => void;
  setRoadmaps: (roadmaps: Roadmap[]) => void;
  setCurrentRoadmap: (roadmap: Roadmap | null) => void;
  updateUserProgress: (progress: UserProgress) => void;
  enrollInRoadmap: (roadmapId: string) => void;
  completeStep: (roadmapId: string, stepId: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  toggleFavoriteDictionary: (dictionaryId: string) => void;
  toggleFavoriteGrammar: (grammarId: string) => void;
  toggleFavoriteRoadmap: (roadmapId: string) => void;
  copyDictionary: (dictionary: Dictionary) => void;
  copyGrammar: (grammar: Grammar) => void;
  copyRoadmap: (roadmap: Roadmap) => void;
  searchUsers: (query: string) => User[];
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state - start unauthenticated
  currentUser: null,
  isAuthenticated: true,
  users: mockUsers,
  dictionaries: mockDictionaries.map(dict => ({
    ...dict,
    favoriteCount: 0,
    copyCount: 0
  })),
  currentDictionary: null,
  dictionaryEntries: mockDictionaryEntries,
  entriesViewMode: 'row',
  grammars: mockGrammars.map(grammar => ({
    ...grammar,
    favoriteCount: 0,
    copyCount: 0
  })),
  currentGrammar: null,
  grammarRules: mockGrammarRules,
  roadmaps: mockRoadmaps,
  currentRoadmap: null,
  userProgress: mockUserProgress,
  searchFilters: {
    query: '',
    languages: [],
    isPublicOnly: false,
  },
  isSidebarOpen: true,
  isDarkMode: false,
  
  // Actions
  setCurrentUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
  
  setDictionaries: (dictionaries) => set({ dictionaries }),
  
  setCurrentDictionary: (dictionary) => set({ currentDictionary: dictionary }),
  
  setDictionaryEntries: (dictionaryId, entries) => 
    set((state) => ({
      dictionaryEntries: {
        ...state.dictionaryEntries,
        [dictionaryId]: entries,
      }
    })),

  setEntriesViewMode: (mode) => set({ entriesViewMode: mode }),
  
  setGrammars: (grammars) => set({ grammars }),
  
  setCurrentGrammar: (grammar) => set({ currentGrammar: grammar }),
  
  setGrammarRules: (grammarId, rules) => 
    set((state) => ({
      grammarRules: {
        ...state.grammarRules,
        [grammarId]: rules,
      }
    })),

  setRoadmaps: (roadmaps) => set({ roadmaps }),

  setCurrentRoadmap: (roadmap) => set({ currentRoadmap: roadmap }),

  updateUserProgress: (progress) =>
    set((state) => ({
      userProgress: state.userProgress.map(p =>
        p.roadmapId === progress.roadmapId && p.userId === progress.userId
          ? progress
          : p
      )
    })),

  enrollInRoadmap: (roadmapId) =>
    set((state) => {
      if (!state.currentUser) return state;

      const existingProgress = state.userProgress.find(
        p => p.roadmapId === roadmapId && p.userId === state.currentUser!.id
      );

      if (existingProgress) return state;

      const newProgress: UserProgress = {
        roadmapId,
        userId: state.currentUser.id,
        currentStep: 1,
        completedSteps: [],
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
        completionPercentage: 0
      };

      const updatedRoadmaps = state.roadmaps.map(roadmap =>
        roadmap.id === roadmapId
          ? { ...roadmap, enrollmentCount: roadmap.enrollmentCount + 1 }
          : roadmap
      );

      return {
        userProgress: [...state.userProgress, newProgress],
        roadmaps: updatedRoadmaps
      };
    }),

  completeStep: (roadmapId, stepId) =>
    set((state) => {
      if (!state.currentUser) return state;

      const roadmap = state.roadmaps.find(r => r.id === roadmapId);
      if (!roadmap) return state;

      const progressIndex = state.userProgress.findIndex(
        p => p.roadmapId === roadmapId && p.userId === state.currentUser!.id
      );

      if (progressIndex === -1) return state;

      const progress = state.userProgress[progressIndex];
      const completedSteps = [...progress.completedSteps, stepId];
      const completionPercentage = Math.round((completedSteps.length / roadmap.steps.length) * 100);
      const currentStep = Math.min(progress.currentStep + 1, roadmap.steps.length);

      const updatedProgress = {
        ...progress,
        completedSteps,
        currentStep,
        completionPercentage,
        lastAccessedAt: new Date().toISOString()
      };

      const newUserProgress = [...state.userProgress];
      newUserProgress[progressIndex] = updatedProgress;

      return { userProgress: newUserProgress };
    }),
  
  setSearchFilters: (filters) => 
    set((state) => ({
      searchFilters: {
        ...state.searchFilters,
        ...filters,
      }
    })),
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  toggleFavoriteDictionary: (dictionaryId) => 
    set((state) => {
      if (!state.currentUser) return state;

      const dictionaries = state.dictionaries.map(dict => {
        if (dict.id === dictionaryId) {
          const isFavorited = state.currentUser.favorites.dictionaries.includes(dictionaryId);
          return {
            ...dict,
            favoriteCount: dict.favoriteCount + (isFavorited ? -1 : 1)
          };
        }
        return dict;
      });

      const favorites = {
        ...state.currentUser.favorites,
        dictionaries: state.currentUser.favorites.dictionaries.includes(dictionaryId)
          ? state.currentUser.favorites.dictionaries.filter(id => id !== dictionaryId)
          : [...state.currentUser.favorites.dictionaries, dictionaryId]
      };

      return {
        dictionaries,
        currentUser: {
          ...state.currentUser,
          favorites
        }
      };
    }),

  toggleFavoriteGrammar: (grammarId) =>
    set((state) => {
      if (!state.currentUser) return state;

      const grammars = state.grammars.map(grammar => {
        if (grammar.id === grammarId) {
          const isFavorited = state.currentUser.favorites.grammars.includes(grammarId);
          return {
            ...grammar,
            favoriteCount: grammar.favoriteCount + (isFavorited ? -1 : 1)
          };
        }
        return grammar;
      });

      const favorites = {
        ...state.currentUser.favorites,
        grammars: state.currentUser.favorites.grammars.includes(grammarId)
          ? state.currentUser.favorites.grammars.filter(id => id !== grammarId)
          : [...state.currentUser.favorites.grammars, grammarId]
      };

      return {
        grammars,
        currentUser: {
          ...state.currentUser,
          favorites
        }
      };
    }),

  toggleFavoriteRoadmap: (roadmapId) =>
    set((state) => {
      const roadmaps = state.roadmaps.map(roadmap => {
        if (roadmap.id === roadmapId) {
          return {
            ...roadmap,
            favoriteCount: roadmap.favoriteCount + 1
          };
        }
        return roadmap;
      });

      return { roadmaps };
    }),

  copyDictionary: (dictionary) =>
    set((state) => {
      const newDictionary = {
        ...dictionary,
        id: `dict-${Date.now()}`,
        name: `${dictionary.name} (Copy)`,
        userId: state.currentUser?.id || 'user-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favoriteCount: 0,
        copyCount: 0
      };

      const updatedDictionaries = state.dictionaries.map(dict =>
        dict.id === dictionary.id
          ? { ...dict, copyCount: dict.copyCount + 1 }
          : dict
      );

      return {
        dictionaries: [...updatedDictionaries, newDictionary]
      };
    }),

  copyGrammar: (grammar) =>
    set((state) => {
      const newGrammar = {
        ...grammar,
        id: `gram-${Date.now()}`,
        name: `${grammar.name} (Copy)`,
        userId: state.currentUser?.id || 'user-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favoriteCount: 0,
        copyCount: 0
      };

      const updatedGrammars = state.grammars.map(g =>
        g.id === grammar.id
          ? { ...g, copyCount: g.copyCount + 1 }
          : g
      );

      return {
        grammars: [...updatedGrammars, newGrammar]
      };
    }),

  copyRoadmap: (roadmap) =>
    set((state) => {
      const newRoadmap = {
        ...roadmap,
        id: `roadmap-${Date.now()}`,
        name: `${roadmap.name} (Copy)`,
        userId: state.currentUser?.id || 'user-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        enrollmentCount: 0,
        favoriteCount: 0,
        copyCount: 0
      };

      const updatedRoadmaps = state.roadmaps.map(r =>
        r.id === roadmap.id
          ? { ...r, copyCount: r.copyCount + 1 }
          : r
      );

      return {
        roadmaps: [...updatedRoadmaps, newRoadmap]
      };
    }),

  searchUsers: (query) => {
    const { users } = get();
    if (!query.trim()) return users;
    
    const lowercaseQuery = query.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery)
    );
  },
}));