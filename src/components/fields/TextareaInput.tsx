import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FormConfig } from '../../types/form';

interface TextareaInputProps {
  field: FormConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const TextareaInput: React.FC<TextareaInputProps> = ({ field, value, error, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.title}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={4}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      />
      
      {error && (
        <div className="flex items-center text-sm text-red-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default TextareaInput;