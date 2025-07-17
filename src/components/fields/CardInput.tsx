import React from 'react';
import { AlertCircle, FolderOpen, Layers, ChevronRight } from 'lucide-react';
import { FormConfig } from '../../types/form';
import FieldRenderer from '../FieldRenderer';

interface CardInputProps {
  field: FormConfig;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  onNestedChange?: (childName: string, value: any, childConfig: FormConfig) => void;
  nestedErrors?: Record<string, string>;
}

const CardInput: React.FC<CardInputProps> = ({
  field,
  value,
  error,
  onChange,
  onNestedChange,
  nestedErrors
}) => {
  const nestedFields = Array.isArray(field.data) ? field.data : [];

  const handleNestedFieldChange = (childName: string, childValue: any, childConfig: FormConfig) => {
    const newValue = {
      ...value,
      [childName]: childValue
    };
    onChange(newValue);
    
    if (onNestedChange) {
      onNestedChange(childName, childValue, childConfig);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-4 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-lg">
          <FolderOpen className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <label className="text-2xl font-bold text-slate-900">
            {field.title}
            {field.required && <span className="text-rose-500 ml-2">*</span>}
          </label>
          <div className="flex items-center space-x-3 text-sm text-slate-600 mt-2">
            <Layers className="w-5 h-5" />
            <span className="font-medium">Nested form with {nestedFields.length} field{nestedFields.length !== 1 ? 's' : ''}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium">Dynamic rendering</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 rounded-3xl backdrop-blur-sm"></div>
        
        <div className="relative border-2 border-indigo-200/60 rounded-3xl p-10 bg-white/40 backdrop-blur-sm shadow-xl">
          <div className="space-y-10">
            {nestedFields.map((nestedField, index) => (
              <div key={`${field.name}.${nestedField.name}-${index}`} className="relative">
                <FieldRenderer
                  field={nestedField}
                  value={value?.[nestedField.name]}
                  error={nestedErrors?.[`${field.name}.${nestedField.name}`]}
                  onChange={(childValue) => handleNestedFieldChange(nestedField.name, childValue, nestedField)}
                />
                
                {/* Field separator */}
                {index < nestedFields.length - 1 && (
                  <div className="absolute -bottom-5 left-0 right-0 flex justify-center">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
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

export default CardInput;