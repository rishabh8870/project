import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FormConfig } from '../../types/form';

interface NumberInputProps {
  field: FormConfig;
  value: number | string;
  error?: string;
  onChange: (value: number | string) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ field, value, error, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val === '' ? '' : Number(val));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.title}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        type="number"
        value={value || ''}
        onChange={handleChange}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        step={field.resolution || 1}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      />
      
      {(field.min || field.max) && (
        <div className="text-sm text-gray-500">
          {field.min && field.max ? `Range: ${field.min} - ${field.max}` :
           field.min ? `Minimum: ${field.min}` :
           field.max ? `Maximum: ${field.max}` : ''}
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

export default NumberInput;