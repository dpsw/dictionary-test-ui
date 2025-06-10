import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  label?: string;
}

// Simplified list of languages for demo purposes
const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Russian',
  'Japanese',
  'Chinese',
  'Korean',
  'Arabic',
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  label = 'Language',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="form-label">{label}</label>
      )}
      <button
        type="button"
        className="relative w-full form-input flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <Globe className="h-4 w-4 mr-2 text-gray-400" />
          {value || 'Select language'}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
          <ul className="py-1">
            {languages.map((language) => (
              <li key={language}>
                <button
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    value === language ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    onChange(language);
                    setIsOpen(false);
                  }}
                >
                  {language}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};