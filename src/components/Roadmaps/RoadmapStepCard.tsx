import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Circle, 
  BookOpen, 
  GraduationCap, 
  Play, 
  Award,
  Clock,
  Target,
  ExternalLink,
  Lock
} from 'lucide-react';
import { RoadmapStep } from '../../types';

interface RoadmapStepCardProps {
  step: RoadmapStep;
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isAccessible: boolean;
  onComplete: () => void;
  isEnrolled: boolean;
}

export const RoadmapStepCard: React.FC<RoadmapStepCardProps> = ({
  step,
  index,
  isCompleted,
  isCurrent,
  isAccessible,
  onComplete,
  isEnrolled
}) => {
  const getStepIcon = () => {
    switch (step.type) {
      case 'dictionary':
        return <BookOpen className="h-5 w-5" />;
      case 'grammar':
        return <GraduationCap className="h-5 w-5" />;
      case 'practice':
        return <Play className="h-5 w-5" />;
      case 'milestone':
        return <Award className="h-5 w-5" />;
      default:
        return <Circle className="h-5 w-5" />;
    }
  };

  const getStepColor = () => {
    if (isCompleted) return 'text-green-600 bg-green-50 border-green-200';
    if (isCurrent) return 'text-primary-600 bg-primary-50 border-primary-200';
    if (isAccessible) return 'text-gray-600 bg-white border-gray-200';
    return 'text-gray-400 bg-gray-50 border-gray-200';
  };

  const getTypeColor = () => {
    switch (step.type) {
      case 'dictionary':
        return 'bg-blue-100 text-blue-800';
      case 'grammar':
        return 'bg-green-100 text-green-800';
      case 'practice':
        return 'bg-yellow-100 text-yellow-800';
      case 'milestone':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`card border-2 transition-all ${getStepColor()}`}>
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Step Number & Status */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              isCompleted 
                ? 'bg-green-500 border-green-500 text-white' 
                : isCurrent 
                ? 'bg-primary-500 border-primary-500 text-white'
                : isAccessible
                ? 'bg-white border-gray-300 text-gray-600'
                : 'bg-gray-100 border-gray-300 text-gray-400'
            }`}>
              {isCompleted ? (
                <CheckCircle className="h-5 w-5" />
              ) : !isAccessible ? (
                <Lock className="h-4 w-4" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            {index < 4 && ( // Don't show connector for last item
              <div className={`w-0.5 h-8 mt-2 ${
                isCompleted ? 'bg-green-300' : 'bg-gray-200'
              }`} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  isCompleted ? 'bg-green-100 text-green-600' :
                  isCurrent ? 'bg-primary-100 text-primary-600' :
                  isAccessible ? 'bg-gray-100 text-gray-600' :
                  'bg-gray-50 text-gray-400'
                }`}>
                  {getStepIcon()}
                </div>
                <h3 className={`text-lg font-semibold ${
                  isAccessible ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </h3>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`badge ${getTypeColor()}`}>
                  {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                </span>
                <span className="badge bg-gray-100 text-gray-700 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {step.estimatedTime}
                </span>
              </div>
            </div>

            <p className={`text-sm mb-4 ${
              isAccessible ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {step.description}
            </p>

            {/* Objectives */}
            {step.objectives.length > 0 && (
              <div className="mb-4">
                <h4 className={`text-sm font-medium mb-2 flex items-center ${
                  isAccessible ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  <Target className="h-4 w-4 mr-1" />
                  Learning Objectives
                </h4>
                <ul className="space-y-1">
                  {step.objectives.map((objective, idx) => (
                    <li key={idx} className={`text-sm flex items-start ${
                      isAccessible ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      <span className="text-primary-500 mr-2">•</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {step.resourceId && isAccessible && (
                  <Link
                    to={step.type === 'dictionary' 
                      ? `/dictionaries/${step.resourceId}` 
                      : `/grammar/${step.resourceId}`
                    }
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Resource
                  </Link>
                )}
              </div>

              {isEnrolled && isAccessible && !isCompleted && (
                <button
                  onClick={onComplete}
                  className="btn-primary text-sm"
                  disabled={!isCurrent}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark Complete
                </button>
              )}

              {isCompleted && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Completed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};