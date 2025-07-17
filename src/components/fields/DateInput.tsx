import React from 'react';
import { AlertCircle, Calendar } from 'lucide-react';
import { FormConfig } from '../../types/form';

interface DateInputProps {
  field: FormConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ field, value, error, onChange }) => {
  const inputType = field.type === 'datetime' ? 'datetime-local' : 'date';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.title}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={inputType}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          min={field.min}
          max={field.max}
          step={field.resolution}
          className={`w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      
      {(field.min || field.max) && (
        <div className="text-sm text-gray-500">
          {field.min && field.max ? `Range: ${field.min} - ${field.max}` :
           field.min ? `From: ${field.min}` :
           field.max ? `Until: ${field.max}` : ''}
        </div>
      )}
      
      {error && (
        <div className="flex items-center text-sm text-red-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default DateInput;