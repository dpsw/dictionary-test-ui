import React from 'react';
import { List, Grid, Eye, BarChart3 } from 'lucide-react';

export type ViewType = 'simple-text' | 'multiple-rules' | 'comparison' | 'interactive';

interface ViewTypeSelectorProps {
  value: ViewType;
  onChange: (viewType: ViewType) => void;
}

export const ViewTypeSelector: React.FC<ViewTypeSelectorProps> = ({ value, onChange }) => {
  const viewTypes = [
    {
      id: 'simple-text' as ViewType,
      name: 'Simple Text View',
      description: 'Linear presentation with clear headings',
      icon: List,
      features: ['Clear structure', 'Easy to read', 'Print-friendly']
    },
    {
      id: 'multiple-rules' as ViewType,
      name: 'Multiple Rules View',
      description: 'Grid layout with collapsible sections',
      icon: Grid,
      features: ['Grid layout', 'Collapsible sections', 'Quick navigation']
    },
    {
      id: 'comparison' as ViewType,
      name: 'Comparison View',
      description: 'Side-by-side comparison format',
      icon: BarChart3,
      features: ['Side-by-side layout', 'Compare rules', 'Highlight differences']
    },
    {
      id: 'interactive' as ViewType,
      name: 'Interactive View',
      description: 'Engaging format with examples',
      icon: Eye,
      features: ['Interactive elements', 'Rich examples', 'Visual aids']
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Choose Presentation Format</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {viewTypes.map((viewType) => {
          const Icon = viewType.icon;
          return (
            <div
              key={viewType.id}
              className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                value === viewType.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onChange(viewType.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  value === viewType.id ? 'bg-primary-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-5 w-5 ${
                    value === viewType.id ? 'text-primary-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    value === viewType.id ? 'text-primary-900' : 'text-gray-900'
                  }`}>
                    {viewType.name}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    value === viewType.id ? 'text-primary-700' : 'text-gray-600'
                  }`}>
                    {viewType.description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {viewType.features.map((feature, index) => (
                      <li key={index} className={`text-xs flex items-center ${
                        value === viewType.id ? 'text-primary-600' : 'text-gray-500'
                      }`}>
                        <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {value === viewType.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};