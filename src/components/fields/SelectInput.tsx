import React from 'react';
import { AlertCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { FormConfig } from '../../types/form';

interface SelectInputProps {
  field: FormConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ field, value, error, onChange }) => {
  const options = Array.isArray(field.data) ? field.data : [];
  const isValid = value && !error;

  return (
    <div className="space-y-4">
      <label className="block text-lg font-bold text-slate-800">
        {field.title}
        {field.required && <span className="text-rose-500 ml-2">*</span>}
      </label>
      
      <div className="relative group">
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-5 py-5 pr-14 border-2 rounded-2xl transition-all duration-200 appearance-none text-lg font-medium ${
            error 
              ? 'border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20' 
              : isValid
              ? 'border-emerald-300 bg-emerald-50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'
              : 'border-slate-300 bg-white hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'
          } focus:outline-none`}
        >
          <option value="" className="text-slate-400">Select an option...</option>
          {options.map((option) => (
            <option key={option.id} value={option.id} className="text-slate-800">
              {option.title}
            </option>
          ))}
        </select>
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
          {error ? (
            <AlertCircle className="w-6 h-6 text-rose-500" />
          ) : isValid ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          ) : null}
          <ChevronDown className={`w-6 h-6 transition-colors ${
            error ? 'text-rose-500' : isValid ? 'text-emerald-600' : 'text-slate-400 group-focus-within:text-indigo-600'
          }`} />
        </div>
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

export default SelectInput;