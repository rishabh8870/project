import React from 'react';
import { AlertCircle, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import { FormConfig } from '../../types/form';

interface TextInputProps {
  field: FormConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ field, value, error, onChange }) => {
  const inputType = field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text';
  const isValid = value && !error;
  
  const getIcon = () => {
    switch (field.type) {
      case 'email': return Mail;
      case 'tel': return Phone;
      default: return User;
    }
  };
  
  const Icon = getIcon();

  return (
    <div className="space-y-4">
      <label className="block text-lg font-bold text-slate-800">
        {field.title}
        {field.required && <span className="text-rose-500 ml-2">*</span>}
      </label>
      
      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Icon className={`w-6 h-6 transition-colors ${
            error ? 'text-rose-500' : isValid ? 'text-emerald-600' : 'text-slate-400 group-focus-within:text-indigo-600'
          }`} />
        </div>
        
        <input
          type={inputType}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`w-full pl-14 pr-14 py-5 border-2 rounded-2xl transition-all duration-200 text-lg font-medium ${
            error 
              ? 'border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20' 
              : isValid
              ? 'border-emerald-300 bg-emerald-50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'
              : 'border-slate-300 bg-white hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'
          } focus:outline-none placeholder-slate-400`}
        />
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {error ? (
            <AlertCircle className="w-6 h-6 text-rose-500" />
          ) : isValid ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          ) : null}
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

export default TextInput;