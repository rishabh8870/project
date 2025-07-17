import React from 'react';
import { AlertCircle, X, CheckCircle2, Grid3X3 } from 'lucide-react';
import { FormConfig } from '../../types/form';

interface MultiSelectInputProps {
  field: FormConfig;
  value: string[];
  error?: string;
  onChange: (value: string[]) => void;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({ field, value, error, onChange }) => {
  const options = Array.isArray(field.data) ? field.data : [];
  const selectedValues = Array.isArray(value) ? value : [];

  const handleToggle = (optionId: string) => {
    const newValue = selectedValues.includes(optionId)
      ? selectedValues.filter(id => id !== optionId)
      : [...selectedValues, optionId];
    onChange(newValue);
  };

  const getOptionTitle = (id: string) => {
    const option = options.find(opt => opt.id === id);
    return option ? option.title : id;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="block text-lg font-bold text-slate-800">
          {field.title}
          {field.required && <span className="text-rose-500 ml-2">*</span>}
        </label>
        <div className="flex items-center space-x-3 text-slate-600">
          <Grid3X3 className="w-5 h-5" />
          <span className="font-bold">{selectedValues.length} selected</span>
        </div>
      </div>
      
      {/* Selected items */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-3 p-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-violet-50 rounded-2xl border-2 border-indigo-200">
          {selectedValues.map(id => (
            <span
              key={id}
              className="inline-flex items-center px-4 py-3 bg-white text-indigo-800 rounded-xl font-bold shadow-lg border-2 border-indigo-200 group hover:shadow-xl transition-all"
            >
              <CheckCircle2 className="w-5 h-5 mr-2 text-indigo-600" />
              {getOptionTitle(id)}
              <button
                type="button"
                onClick={() => handleToggle(id)}
                className="ml-3 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-full p-1 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}
      
      {/* Options */}
      <div className={`border-2 rounded-2xl p-6 space-y-3 max-h-80 overflow-y-auto transition-all ${
        error ? 'border-rose-300 bg-rose-50' : 'border-slate-300 bg-white'
      }`}>
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center space-x-4 cursor-pointer p-4 rounded-xl transition-all group ${
              selectedValues.includes(option.id)
                ? 'bg-gradient-to-r from-indigo-50 to-violet-50 hover:from-indigo-100 hover:to-violet-100'
                : 'hover:bg-slate-50'
            }`}
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedValues.includes(option.id)}
                onChange={() => handleToggle(option.id)}
                className="w-6 h-6 text-indigo-600 rounded-lg focus:ring-indigo-500 focus:ring-2 transition-all"
              />
              {selectedValues.includes(option.id) && (
                <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-indigo-600" />
              )}
            </div>
            <span className={`font-bold text-lg transition-colors ${
              selectedValues.includes(option.id) ? 'text-indigo-700' : 'text-slate-700 group-hover:text-slate-900'
            }`}>
              {option.title}
            </span>
          </label>
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

export default MultiSelectInput;