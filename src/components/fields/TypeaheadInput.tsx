import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Search } from 'lucide-react';
import { FormConfig } from '../../types/form';

interface TypeaheadInputProps {
  field: FormConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const TypeaheadInput: React.FC<TypeaheadInputProps> = ({ field, value, error, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const options = Array.isArray(field.data) ? field.data : [];
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(opt => opt.id === value);

  useEffect(() => {
    if (selectedOption) {
      setSearchTerm(selectedOption.title);
    }
  }, [selectedOption]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: any) => {
    onChange(option.id);
    setSearchTerm(option.title);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    
    // If the search term doesn't match any option exactly, clear the value
    const exactMatch = options.find(opt => opt.title === e.target.value);
    if (!exactMatch) {
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.title}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={field.placeholder || 'Search...'}
            className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {filteredOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
              >
                {option.title}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {error && (
        <div className="flex items-center text-sm text-red-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default TypeaheadInput;