import { Dictionary, DictionaryEntry, Grammar, GrammarRule, User, Roadmap, UserProgress } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    favorites: {
      dictionaries: [],
      grammars: []
    }
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    favorites: {
      dictionaries: [],
      grammars: []
    }
  }
];

export const currentUser: User = mockUsers[0];

export const mockDictionaries: Dictionary[] = [
  {
    id: 'dict-1',
    name: 'English to Spanish',
    description: 'A comprehensive English to Spanish dictionary',
    sourceLanguage: 'English',
    targetLanguage: 'Spanish',
    userId: 'user-1',
    isPublic: true,
    entryCount: 2,
    favoriteCount: 0,
    copyCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dict-2',
    name: 'French Vocabulary',
    description: 'Essential French vocabulary for beginners',
    sourceLanguage: 'English',
    targetLanguage: 'French',
    userId: 'user-2',
    isPublic: true,
    entryCount: 1,
    favoriteCount: 0,
    copyCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockDictionaryEntries: Record<string, DictionaryEntry[]> = {
  'dict-1': [
    {
      id: 'entry-1',
      dictionaryId: 'dict-1',
      term: 'hello',
      pronunciation: 'həˈloʊ',
      partOfSpeech: 'interjection',
      definitions: [
        {
          id: 'def-1',
          text: 'hola',
          isAiGenerated: false
        }
      ],
      examples: [
        {
          id: 'ex-1',
          text: 'Hello, how are you?',
          translation: '¡Hola! ¿Cómo estás?',
          isAiGenerated: false
        }
      ],
      notes: 'Common greeting',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'entry-2',
      dictionaryId: 'dict-1',
      term: 'goodbye',
      pronunciation: 'ɡʊdˈbaɪ',
      partOfSpeech: 'interjection',
      definitions: [
        {
          id: 'def-2',
          text: 'adiós',
          isAiGenerated: false
        }
      ],
      examples: [
        {
          id: 'ex-2',
          text: 'Goodbye, see you tomorrow!',
          translation: '¡Adiós, hasta mañana!',
          isAiGenerated: false
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  'dict-2': [
    {
      id: 'entry-3',
      dictionaryId: 'dict-2',
      term: 'bonjour',
      pronunciation: 'bɔ̃ʒuʁ',
      partOfSpeech: 'interjection',
      definitions: [
        {
          id: 'def-3',
          text: 'hello, good morning',
          isAiGenerated: false
        }
      ],
      examples: [
        {
          id: 'ex-3',
          text: 'Bonjour! Comment allez-vous?',
          translation: 'Hello! How are you?',
          isAiGenerated: false
        }
      ],
      notes: 'Formal greeting, used during the day',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

export const mockGrammars: Grammar[] = [
  {
    id: 'grammar-1',
    name: 'Spanish Verb Conjugation',
    description: 'Basic rules for conjugating Spanish verbs',
    language: 'Spanish',
    userId: 'user-1',
    isPublic: true,
    ruleCount: 2,
    favoriteCount: 0,
    copyCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'grammar-2',
    name: 'French Articles',
    description: 'Usage of definite and indefinite articles in French',
    language: 'French',
    userId: 'user-2',
    isPublic: true,
    ruleCount: 1,
    favoriteCount: 0,
    copyCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockGrammarRules: Record<string, GrammarRule[]> = {
  'grammar-1': [
    {
      id: 'rule-1',
      grammarId: 'grammar-1',
      title: 'Present Tense -AR Verbs',
      explanation: 'Regular -AR verbs in the present tense follow a specific pattern of conjugation. The endings are: -o, -as, -a, -amos, -áis, -an.',
      examples: [
        {
          id: 'ex-1',
          text: 'hablar → hablo, hablas, habla, hablamos, habláis, hablan',
          isAiGenerated: false
        },
        {
          id: 'ex-2',
          text: 'Yo hablo español. (I speak Spanish)',
          isAiGenerated: false
        }
      ],
      notes: 'Most common verb type in Spanish',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'rule-2',
      grammarId: 'grammar-1',
      title: 'Present Tense -ER Verbs',
      explanation: 'Regular -ER verbs in the present tense are conjugated with the endings: -o, -es, -e, -emos, -éis, -en.',
      examples: [
        {
          id: 'ex-3',
          text: 'comer → como, comes, come, comemos, coméis, comen',
          isAiGenerated: false
        },
        {
          id: 'ex-4',
          text: 'Ella come pizza. (She eats pizza)',
          isAiGenerated: false
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  'grammar-2': [
    {
      id: 'rule-3',
      grammarId: 'grammar-2',
      title: 'Definite Articles',
      explanation: 'French has four definite articles: le (masculine singular), la (feminine singular), l\' (before vowels), and les (plural).',
      examples: [
        {
          id: 'ex-5',
          text: 'le livre (the book)',
          isAiGenerated: false
        },
        {
          id: 'ex-6',
          text: 'la table (the table)',
          isAiGenerated: false
        },
        {
          id: 'ex-7',
          text: 'l\'homme (the man)',
          isAiGenerated: false
        }
      ],
      notes: 'Used to indicate specific nouns',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

export const mockRoadmaps: Roadmap[] = [
  {
    id: 'roadmap-1',
    name: 'Spanish for Beginners',
    description: 'Complete beginner\'s guide to Spanish language fundamentals',
    language: 'Spanish',
    level: 'beginner',
    estimatedDuration: '3 months',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user-1',
    isPublic: true,
    enrollmentCount: 245,
    favoriteCount: 89,
    copyCount: 12,
    steps: [
      {
        id: 'step-1',
        title: 'Basic Greetings & Introductions',
        description: 'Learn essential greetings and how to introduce yourself',
        order: 1,
        type: 'dictionary',
        resourceId: 'dict-1',
        isCompleted: false,
        estimatedTime: '1 week',
        objectives: [
          'Master common greetings (hola, buenos días, buenas tardes)',
          'Learn to introduce yourself (me llamo, soy de)',
          'Practice basic courtesy expressions'
        ]
      },
      {
        id: 'step-2',
        title: 'Spanish Pronunciation Basics',
        description: 'Master Spanish pronunciation rules and sounds',
        order: 2,
        type: 'practice',
        isCompleted: false,
        estimatedTime: '1 week',
        objectives: [
          'Learn the Spanish alphabet',
          'Practice vowel sounds',
          'Understand stress patterns'
        ]
      },
      {
        id: 'step-3',
        title: 'Present Tense Verbs',
        description: 'Learn regular verb conjugations in present tense',
        order: 3,
        type: 'grammar',
        resourceId: 'grammar-1',
        isCompleted: false,
        estimatedTime: '2 weeks',
        objectives: [
          'Conjugate -AR verbs',
          'Conjugate -ER verbs',
          'Conjugate -IR verbs',
          'Practice with common verbs'
        ]
      },
      {
        id: 'step-4',
        title: 'Numbers & Time',
        description: 'Learn numbers, dates, and telling time',
        order: 4,
        type: 'dictionary',
        isCompleted: false,
        estimatedTime: '1 week',
        objectives: [
          'Count from 1-100',
          'Learn days and months',
          'Tell time in Spanish'
        ]
      },
      {
        id: 'step-5',
        title: 'First Milestone: Basic Conversation',
        description: 'Practice a complete basic conversation',
        order: 5,
        type: 'milestone',
        isCompleted: false,
        estimatedTime: '3 days',
        objectives: [
          'Have a 5-minute conversation',
          'Use all learned vocabulary',
          'Apply grammar rules correctly'
        ]
      }
    ]
  },
  {
    id: 'roadmap-2',
    name: 'French Fundamentals',
    description: 'Essential French language skills for beginners',
    language: 'French',
    level: 'beginner',
    estimatedDuration: '4 months',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user-2',
    isPublic: true,
    enrollmentCount: 189,
    favoriteCount: 67,
    copyCount: 8,
    steps: [
      {
        id: 'step-6',
        title: 'French Pronunciation & Accents',
        description: 'Master French sounds and accent marks',
        order: 1,
        type: 'practice',
        isCompleted: false,
        estimatedTime: '2 weeks',
        objectives: [
          'Learn French vowel sounds',
          'Understand accent marks',
          'Practice nasal sounds'
        ]
      },
      {
        id: 'step-7',
        title: 'Articles & Gender',
        description: 'Learn French articles and noun gender',
        order: 2,
        type: 'grammar',
        resourceId: 'grammar-2',
        isCompleted: false,
        estimatedTime: '2 weeks',
        objectives: [
          'Master definite articles',
          'Learn indefinite articles',
          'Understand noun gender rules'
        ]
      },
      {
        id: 'step-8',
        title: 'Essential Vocabulary',
        description: 'Build core French vocabulary',
        order: 3,
        type: 'dictionary',
        resourceId: 'dict-2',
        isCompleted: false,
        estimatedTime: '3 weeks',
        objectives: [
          'Learn 200 common words',
          'Master family vocabulary',
          'Learn food and drink terms'
        ]
      }
    ]
  },
  {
    id: 'roadmap-3',
    name: 'Business English Mastery',
    description: 'Advanced English for professional communication',
    language: 'English',
    level: 'advanced',
    estimatedDuration: '6 months',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user-1',
    isPublic: true,
    enrollmentCount: 156,
    favoriteCount: 78,
    copyCount: 15,
    steps: [
      {
        id: 'step-9',
        title: 'Professional Email Writing',
        description: 'Master formal business communication',
        order: 1,
        type: 'practice',
        isCompleted: false,
        estimatedTime: '2 weeks',
        objectives: [
          'Write professional emails',
          'Use appropriate tone',
          'Master business phrases'
        ]
      },
      {
        id: 'step-10',
        title: 'Presentation Skills',
        description: 'Deliver effective business presentations',
        order: 2,
        type: 'practice',
        isCompleted: false,
        estimatedTime: '3 weeks',
        objectives: [
          'Structure presentations',
          'Use persuasive language',
          'Handle Q&A sessions'
        ]
      }
    ]
  }
];

export const mockUserProgress: UserProgress[] = [
  {
    roadmapId: 'roadmap-1',
    userId: 'user-1',
    currentStep: 2,
    completedSteps: ['step-1'],
    startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastAccessedAt: new Date().toISOString(),
    completionPercentage: 20
  }
];