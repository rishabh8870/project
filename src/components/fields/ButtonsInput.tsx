import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { FormConfig } from '../../types/form';

interface ButtonsInputProps {
  field: FormConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const ButtonsInput: React.FC<ButtonsInputProps> = ({ field, value, error, onChange }) => {
  const options = Array.isArray(field.data) ? field.data : [];
  const isValid = value && !error;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-lg font-bold text-slate-800">
          {field.title}
          {field.required && <span className="text-rose-500 ml-2">*</span>}
        </label>
        {isValid && (
          <div className="flex items-center space-x-2 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-bold">Selected</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
              value === option.id
                ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-violet-50 shadow-xl transform scale-105'
                : error
                ? 'border-rose-200 bg-rose-50 hover:border-rose-300'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:transform hover:scale-105'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-bold text-lg transition-colors ${
                value === option.id
                  ? 'text-indigo-700'
                  : error
                  ? 'text-rose-600'
                  : 'text-slate-700 group-hover:text-slate-900'
              }`}>
                {option.title}
              </span>
              
              {value === option.id && (
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            {/* Selection indicator */}
            {value === option.id && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 pointer-events-none" />
            )}
          </button>
        ))}
      </div>
      
      {error && (
        <div className="flex items-center space-x-3 text-sm text-rose-700 bg-rose-50 px-4 py-3 rounded-xl border border-rose-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};

export default ButtonsInput;