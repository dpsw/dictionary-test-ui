import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Map, 
  Clock, 
  Users, 
  Star, 
  Copy, 
  BookOpen, 
  GraduationCap,
  CheckCircle,
  Play,
  Globe
} from 'lucide-react';
import { Roadmap, UserProgress } from '../../types';
import { formatDate } from '../../utils/formatters';
import { useAppStore } from '../../store';

interface RoadmapCardProps {
  roadmap: Roadmap;
  progress?: UserProgress;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap, progress }) => {
  const { currentUser, enrollInRoadmap } = useAppStore();
  
  const isEnrolled = !!progress;
  const completionPercentage = progress?.completionPercentage || 0;
  
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

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentUser && !isEnrolled) {
      enrollInRoadmap(roadmap.id);
    }
  };

  return (
    <Link 
      to={`/roadmaps/${roadmap.id}`}
      className="card group animate-fade-in h-full flex flex-col"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <Map className="h-5 w-5 text-primary-500" />
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {roadmap.name}
            </h3>
          </div>
          {isEnrolled && (
            <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <CheckCircle className="h-3 w-3 mr-1" />
              Enrolled
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
          {roadmap.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
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
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {roadmap.enrollmentCount} enrolled
            </span>
            <span className="flex items-center">
              <Star className="h-3 w-3 mr-1" />
              {roadmap.favoriteCount}
            </span>
            {roadmap.copyCount > 0 && (
              <span className="flex items-center">
                <Copy className="h-3 w-3 mr-1" />
                {roadmap.copyCount}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          {isEnrolled && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-primary-600">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Steps Preview */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-700">Learning Path ({roadmap.steps.length} steps)</h4>
            <div className="space-y-1">
              {roadmap.steps.slice(0, 3).map((step, index) => (
                <div key={step.id} className="flex items-center text-xs text-gray-600">
                  <div className="flex items-center mr-2">
                    {step.type === 'dictionary' && <BookOpen className="h-3 w-3" />}
                    {step.type === 'grammar' && <GraduationCap className="h-3 w-3" />}
                    {step.type === 'practice' && <Play className="h-3 w-3" />}
                    {step.type === 'milestone' && <CheckCircle className="h-3 w-3" />}
                  </div>
                  <span className="line-clamp-1">{step.title}</span>
                </div>
              ))}
              {roadmap.steps.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{roadmap.steps.length - 3} more steps
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Updated {formatDate(roadmap.updatedAt)}
          </span>
          
          {!isEnrolled && currentUser && (
            <button
              onClick={handleEnroll}
              className="text-xs bg-primary-50 text-primary-600 hover:bg-primary-100 px-3 py-1 rounded-full transition-colors"
            >
              <Play className="h-3 w-3 mr-1 inline" />
              Start Learning
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};