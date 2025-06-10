import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Plus, X, BookOpen, GraduationCap, Play, Award } from 'lucide-react';
import { useAppStore } from '../../store';
import { LanguageSelector } from '../../components/UI/LanguageSelector';
import { RoadmapStep } from '../../types';

export const NewRoadmapPage: React.FC = () => {
  const navigate = useNavigate();
  const { roadmaps, setRoadmaps, dictionaries, grammars } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    estimatedDuration: '',
    isPublic: true
  });

  const [steps, setSteps] = useState<Omit<RoadmapStep, 'id' | 'isCompleted'>[]>([
    {
      title: '',
      description: '',
      order: 1,
      type: 'dictionary',
      estimatedTime: '',
      objectives: ['']
    }
  ]);

  const addStep = () => {
    setSteps([...steps, {
      title: '',
      description: '',
      order: steps.length + 1,
      type: 'dictionary',
      estimatedTime: '',
      objectives: ['']
    }]);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      // Reorder the remaining steps
      const reorderedSteps = newSteps.map((step, i) => ({
        ...step,
        order: i + 1
      }));
      setSteps(reorderedSteps);
    }
  };

  const updateStep = (index: number, field: string, value: any) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const addObjective = (stepIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].objectives.push('');
    setSteps(newSteps);
  };

  const updateObjective = (stepIndex: number, objIndex: number, value: string) => {
    const newSteps = [...steps];
    newSteps[stepIndex].objectives[objIndex] = value;
    setSteps(newSteps);
  };

  const removeObjective = (stepIndex: number, objIndex: number) => {
    const newSteps = [...steps];
    if (newSteps[stepIndex].objectives.length > 1) {
      newSteps[stepIndex].objectives.splice(objIndex, 1);
      setSteps(newSteps);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRoadmap = {
      id: `roadmap-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'user-1',
      enrollmentCount: 0,
      favoriteCount: 0,
      copyCount: 0,
      steps: steps.map((step, index) => ({
        ...step,
        id: `step-${Date.now()}-${index}`,
        isCompleted: false,
        objectives: step.objectives.filter(obj => obj.trim() !== '')
      }))
    };
    
    setRoadmaps([...roadmaps, newRoadmap]);
    navigate(`/roadmaps/${newRoadmap.id}`);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'dictionary':
        return <BookOpen className="h-4 w-4" />;
      case 'grammar':
        return <GraduationCap className="h-4 w-4" />;
      case 'practice':
        return <Play className="h-4 w-4" />;
      case 'milestone':
        return <Award className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getAvailableResources = (type: string) => {
    if (type === 'dictionary') {
      return dictionaries.filter(d => d.language === formData.language || d.sourceLanguage === formData.language || d.targetLanguage === formData.language);
    } else if (type === 'grammar') {
      return grammars.filter(g => g.language === formData.language);
    }
    return [];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <Map className="h-7 w-7 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Create Learning Roadmap</h1>
        </div>
        <p className="mt-2 text-gray-600">
          Design a structured learning path to guide students through their language journey
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="form-label">Roadmap Name *</label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Spanish for Beginners"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="form-label">Description *</label>
              <textarea
                id="description"
                rows={3}
                className="form-input"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what students will learn and achieve"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <LanguageSelector
                  label="Language *"
                  value={formData.language}
                  onChange={(language) => setFormData({ ...formData, language })}
                />
              </div>
              
              <div>
                <label htmlFor="level" className="form-label">Level *</label>
                <select
                  id="level"
                  className="form-input"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="estimatedDuration" className="form-label">Estimated Duration *</label>
                <input
                  type="text"
                  id="estimatedDuration"
                  className="form-input"
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                  placeholder="e.g., 3 months"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                />
                <span className="ml-2 text-gray-700">Make this roadmap public</span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Public roadmaps can be discovered and enrolled in by other users
              </p>
            </div>
          </div>
        </div>

        {/* Learning Steps */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Learning Steps</h2>
            <button
              type="button"
              onClick={addStep}
              className="btn-primary text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Step
            </button>
          </div>
          
          <div className="space-y-6">
            {steps.map((step, stepIndex) => (
              <div key={stepIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium">
                      {stepIndex + 1}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900">Step {stepIndex + 1}</h3>
                  </div>
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(stepIndex)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Step Title *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={step.title}
                        onChange={(e) => updateStep(stepIndex, 'title', e.target.value)}
                        placeholder="e.g., Basic Greetings"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="form-label">Estimated Time *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={step.estimatedTime}
                        onChange={(e) => updateStep(stepIndex, 'estimatedTime', e.target.value)}
                        placeholder="e.g., 1 week"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="form-label">Description *</label>
                    <textarea
                      rows={2}
                      className="form-input"
                      value={step.description}
                      onChange={(e) => updateStep(stepIndex, 'description', e.target.value)}
                      placeholder="Describe what students will learn in this step"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Step Type *</label>
                      <div className="relative">
                        <select
                          className="form-input pl-10"
                          value={step.type}
                          onChange={(e) => updateStep(stepIndex, 'type', e.target.value)}
                          required
                        >
                          <option value="dictionary">Dictionary Study</option>
                          <option value="grammar">Grammar Lesson</option>
                          <option value="practice">Practice Exercise</option>
                          <option value="milestone">Milestone Assessment</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {getStepIcon(step.type)}
                        </div>
                      </div>
                    </div>
                    
                    {(step.type === 'dictionary' || step.type === 'grammar') && (
                      <div>
                        <label className="form-label">Linked Resource</label>
                        <select
                          className="form-input"
                          value={step.resourceId || ''}
                          onChange={(e) => updateStep(stepIndex, 'resourceId', e.target.value || undefined)}
                        >
                          <option value="">No resource linked</option>
                          {getAvailableResources(step.type).map((resource) => (
                            <option key={resource.id} value={resource.id}>
                              {resource.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  
                  {/* Learning Objectives */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="form-label !mb-0">Learning Objectives</label>
                      <button
                        type="button"
                        onClick={() => addObjective(stepIndex)}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        <Plus className="h-4 w-4 mr-1 inline" />
                        Add Objective
                      </button>
                    </div>
                    <div className="space-y-2">
                      {step.objectives.map((objective, objIndex) => (
                        <div key={objIndex} className="flex space-x-2">
                          <input
                            type="text"
                            className="form-input flex-1"
                            value={objective}
                            onChange={(e) => updateObjective(stepIndex, objIndex, e.target.value)}
                            placeholder="e.g., Master common greetings"
                          />
                          {step.objectives.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeObjective(stepIndex, objIndex)}
                              className="text-gray-400 hover:text-red-500 p-2"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/roadmaps')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <Plus className="h-5 w-5 mr-1" />
            Create Roadmap
          </button>
        </div>
      </form>
    </div>
  );
};