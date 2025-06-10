import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GraduationCap, Plus, X, BookOpen, Tag, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '../../store';
import { RichTextEditor } from '../../components/Editor/RichTextEditor';
import { TableEditor } from '../../components/Grammar/TableEditor';
import { ViewTypeSelector, ViewType } from '../../components/Grammar/ViewTypeSelector';

interface ExampleSentence {
  id: string;
  text: string;
  translation?: string;
  isCorrect: boolean;
  explanation?: string;
}

interface UsageNote {
  id: string;
  title: string;
  content: string;
  type: 'tip' | 'warning' | 'info';
}

interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const NewGrammarRulePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { grammars, grammarRules, setGrammarRules } = useAppStore();
  
  const grammar = grammars.find(g => g.id === id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    category: '',
    content: '',
    isPublic: true
  });

  const [tableData, setTableData] = useState({
    headers: ['Form', 'Usage', 'Example'],
    rows: [
      {
        id: 'row-1',
        cells: [
          { id: 'cell-1-1', content: '', isHighlighted: false, colSpan: 1, rowSpan: 1 },
          { id: 'cell-1-2', content: '', isHighlighted: false, colSpan: 1, rowSpan: 1 },
          { id: 'cell-1-3', content: '', isHighlighted: false, colSpan: 1, rowSpan: 1 }
        ]
      }
    ],
    footnotes: []
  });

  const [viewType, setViewType] = useState<ViewType>('simple-text');
  const [examples, setExamples] = useState<ExampleSentence[]>([
    { id: '1', text: '', translation: '', isCorrect: true, explanation: '' }
  ]);
  const [usageNotes, setUsageNotes] = useState<UsageNote[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const categories = [
    'Verb Tenses',
    'Pronouns',
    'Articles',
    'Adjectives',
    'Adverbs',
    'Prepositions',
    'Conjunctions',
    'Sentence Structure',
    'Conditionals',
    'Passive Voice',
    'Direct/Indirect Speech',
    'Modal Verbs'
  ];

  const addExample = () => {
    setExamples([...examples, {
      id: Date.now().toString(),
      text: '',
      translation: '',
      isCorrect: true,
      explanation: ''
    }]);
  };

  const updateExample = (id: string, field: keyof ExampleSentence, value: any) => {
    setExamples(examples.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const removeExample = (id: string) => {
    if (examples.length > 1) {
      setExamples(examples.filter(ex => ex.id !== id));
    }
  };

  const addUsageNote = () => {
    setUsageNotes([...usageNotes, {
      id: Date.now().toString(),
      title: '',
      content: '',
      type: 'info'
    }]);
  };

  const updateUsageNote = (id: string, field: keyof UsageNote, value: any) => {
    setUsageNotes(usageNotes.map(note => 
      note.id === id ? { ...note, [field]: value } : note
    ));
  };

  const removeUsageNote = (id: string) => {
    setUsageNotes(usageNotes.filter(note => note.id !== id));
  };

  const addExercise = () => {
    setExercises([...exercises, {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }]);
  };

  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRule = {
      id: `rule-${Date.now()}`,
      grammarId: id!,
      title: formData.title,
      explanation: formData.description,
      examples: examples.map(ex => ({
        id: ex.id,
        text: ex.text,
        isAiGenerated: false
      })),
      notes: formData.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Extended properties for the new rule system
      difficulty: formData.difficulty,
      category: formData.category,
      viewType,
      tableData,
      usageNotes,
      exercises,
      tags,
      isPublic: formData.isPublic
    };
    
    const currentRules = grammarRules[id!] || [];
    setGrammarRules(id!, [...currentRules, newRule]);
    navigate(`/grammar/${id}`);
  };

  if (!grammar) {
    return <div>Grammar resource not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <GraduationCap className="h-7 w-7 text-secondary-500 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Grammar Rule</h1>
            <p className="text-gray-600 mt-1">to {grammar.name}</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Rule Details</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="form-label">Rule Title *</label>
              <input
                type="text"
                id="title"
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Present Perfect Tense Formation"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="form-label">Brief Description *</label>
              <textarea
                id="description"
                rows={3}
                className="form-input"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide a clear overview of this grammar rule"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="difficulty" className="form-label">Difficulty Level *</label>
                <select
                  id="difficulty"
                  className="form-input"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  id="category"
                  className="form-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="form-label">Visibility</label>
                <div className="flex items-center space-x-4 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="visibility"
                      checked={formData.isPublic}
                      onChange={() => setFormData({ ...formData, isPublic: true })}
                    />
                    <span className="ml-2 text-gray-700 flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      Public
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="visibility"
                      checked={!formData.isPublic}
                      onChange={() => setFormData({ ...formData, isPublic: false })}
                    />
                    <span className="ml-2 text-gray-700 flex items-center">
                      <EyeOff className="h-4 w-4 mr-1" />
                      Private
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Type Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <ViewTypeSelector value={viewType} onChange={setViewType} />
        </div>

        {/* Table Editor */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <TableEditor data={tableData} onChange={setTableData} />
        </div>

        {/* Example Sentences */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Example Sentences</h2>
            <button
              type="button"
              onClick={addExample}
              className="btn-secondary text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Example
            </button>
          </div>
          
          <div className="space-y-4">
            {examples.map((example, index) => (
              <div key={example.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Example {index + 1}</h3>
                  {examples.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExample(example.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Sentence *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={example.text}
                        onChange={(e) => updateExample(example.id, 'text', e.target.value)}
                        placeholder="Enter example sentence"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Translation</label>
                      <input
                        type="text"
                        className="form-input"
                        value={example.translation}
                        onChange={(e) => updateExample(example.id, 'translation', e.target.value)}
                        placeholder="Enter translation"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Type</label>
                      <div className="flex space-x-4 mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-green-600"
                            checked={example.isCorrect}
                            onChange={() => updateExample(example.id, 'isCorrect', true)}
                          />
                          <span className="ml-2 text-gray-700">Correct Usage</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-red-600"
                            checked={!example.isCorrect}
                            onChange={() => updateExample(example.id, 'isCorrect', false)}
                          />
                          <span className="ml-2 text-gray-700">Incorrect Usage</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Explanation</label>
                      <input
                        type="text"
                        className="form-input"
                        value={example.explanation}
                        onChange={(e) => updateExample(example.id, 'explanation', e.target.value)}
                        placeholder="Explain why this example works"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Notes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Usage Notes</h2>
            <button
              type="button"
              onClick={addUsageNote}
              className="btn-secondary text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Note
            </button>
          </div>
          
          {usageNotes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No usage notes added yet</p>
          ) : (
            <div className="space-y-4">
              {usageNotes.map((note, index) => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-900">Note {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeUsageNote(note.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-input"
                          value={note.title}
                          onChange={(e) => updateUsageNote(note.id, 'title', e.target.value)}
                          placeholder="Note title"
                        />
                      </div>
                      <div>
                        <label className="form-label">Type</label>
                        <select
                          className="form-input"
                          value={note.type}
                          onChange={(e) => updateUsageNote(note.id, 'type', e.target.value)}
                        >
                          <option value="info">Information</option>
                          <option value="tip">Tip</option>
                          <option value="warning">Warning</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Content</label>
                      <textarea
                        rows={3}
                        className="form-input"
                        value={note.content}
                        onChange={(e) => updateUsageNote(note.id, 'content', e.target.value)}
                        placeholder="Enter note content"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Related Topics</h2>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                className="form-input flex-1"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add related grammar topic"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-secondary"
              >
                <Tag className="h-4 w-4 mr-1" />
                Add Tag
              </button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detailed Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Explanation</h2>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            placeholder="Provide a comprehensive explanation of this grammar rule..."
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/grammar/${id}`)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-secondary">
            <Plus className="h-5 w-5 mr-1" />
            Add Grammar Rule
          </button>
        </div>
      </form>
    </div>
  );
};