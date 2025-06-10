import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Map, 
  Clock, 
  Users, 
  Star, 
  Share2, 
  Copy as CopyIcon, 
  Play,
  CheckCircle,
  Circle,
  BookOpen,
  GraduationCap,
  Target,
  Award,
  Globe,
  User
} from 'lucide-react';
import { useAppStore } from '../../store';
import { UserProfileCard } from '../../components/UserProfileCard';
import { RoadmapStepCard } from '../../components/Roadmaps/RoadmapStepCard';

export const RoadmapDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    roadmaps, 
    userProgress, 
    currentUser, 
    users,
    enrollInRoadmap,
    completeStep,
    setCurrentRoadmap,
    copyRoadmap
  } = useAppStore();
  
  const roadmap = roadmaps.find(r => r.id === id);
  const creator = users.find(u => u.id === roadmap?.userId);
  const progress = userProgress.find(
    p => p.roadmapId === id && p.userId === currentUser?.id
  );
  
  const isEnrolled = !!progress;
  const completionPercentage = progress?.completionPercentage || 0;
  
  useEffect(() => {
    if (roadmap) {
      setCurrentRoadmap(roadmap);
    }
    
    return () => {
      setCurrentRoadmap(null);
    };
  }, [roadmap, setCurrentRoadmap]);

  const handleEnroll = () => {
    if (currentUser && !isEnrolled && roadmap) {
      enrollInRoadmap(roadmap.id);
    }
  };

  const handleCompleteStep = (stepId: string) => {
    if (roadmap && progress) {
      completeStep(roadmap.id, stepId);
    }
  };

  const handleCopyRoadmap = () => {
    if (roadmap) {
      copyRoadmap(roadmap);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!roadmap) {
    return <div>Roadmap not found</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Map className="h-7 w-7 text-primary-500 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{roadmap.name}</h1>
              <p className="text-gray-600 mt-1">{roadmap.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleCopyRoadmap}
              className="btn-secondary"
            >
              <CopyIcon className="h-4 w-4 mr-1" />
              Copy
            </button>
            <button className="btn-secondary">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </button>
            {!isEnrolled && currentUser && (
              <button 
                onClick={handleEnroll}
                className="btn-primary"
              >
                <Play className="h-4 w-4 mr-1" />
                Start Learning
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge bg-primary-100 text-primary-800 flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            {roadmap.language}
          </span>
          <span className={`badge ${getLevelColor(roadmap.level)}`}>
            {roadmap.level.charAt(0).toUpperCase() + roadmap.level.slice(1)}
          </span>
          <span className="badge bg-gray-100 text-gray-700 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {roadmap.estimatedDuration}
          </span>
          <span className="badge bg-gray-100 text-gray-700 flex items-center">
            <Target className="h-3 w-3 mr-1" />
            {roadmap.steps.length} steps
          </span>
        </div>

        <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {roadmap.enrollmentCount} enrolled
          </span>
          <span className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            {roadmap.favoriteCount} favorites
          </span>
          {roadmap.copyCount > 0 && (
            <span className="flex items-center">
              <CopyIcon className="h-4 w-4 mr-1" />
              {roadmap.copyCount} copies
            </span>
          )}
        </div>

        {/* Progress Section */}
        {isEnrolled && progress && (
          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Your Progress</h3>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary-500" />
                <span className="font-semibold text-primary-700">{completionPercentage}% Complete</span>
              </div>
            </div>
            <div className="w-full bg-white rounded-full h-3 mb-2">
              <div 
                className="bg-primary-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{progress.completedSteps.length} of {roadmap.steps.length} steps completed</span>
              <span>Started {new Date(progress.startedAt).toLocaleDateString()}</span>
            </div>
          </div>
        )}

        {/* Creator Info */}
        {creator && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Created by</h3>
            <UserProfileCard user={creator} size="md" />
          </div>
        )}
      </div>

      {/* Learning Path */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Path</h2>
        
        <div className="space-y-4">
          {roadmap.steps.map((step, index) => {
            const isCompleted = progress?.completedSteps.includes(step.id) || false;
            const isCurrent = progress?.currentStep === step.order;
            const isAccessible = !progress || step.order <= progress.currentStep;
            
            return (
              <RoadmapStepCard
                key={step.id}
                step={step}
                index={index}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isAccessible={isAccessible}
                onComplete={() => handleCompleteStep(step.id)}
                isEnrolled={isEnrolled}
              />
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      {!isEnrolled && currentUser && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join {roadmap.enrollmentCount} other learners who are mastering {roadmap.language} 
            with this comprehensive roadmap. Track your progress and achieve your language goals.
          </p>
          <button 
            onClick={handleEnroll}
            className="btn-primary text-lg px-8 py-3"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Learning Now
          </button>
        </div>
      )}
    </div>
  );
};