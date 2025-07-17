import React from 'react';
import { FormConfig, FormData } from '../types/form';
import TextInput from './fields/TextInput';
import SelectInput from './fields/SelectInput';
import MultiSelectInput from './fields/MultiSelectInput';
import NumberInput from './fields/NumberInput';
import TextareaInput from './fields/TextareaInput';
import FileInput from './fields/FileInput';
import DateInput from './fields/DateInput';
import CardInput from './fields/CardInput';
import ButtonsInput from './fields/ButtonsInput';
import TypeaheadInput from './fields/TypeaheadInput';

interface FieldRendererProps {
  field: FormConfig;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  onNestedChange?: (childName: string, value: any, childConfig: FormConfig) => void;
  nestedErrors?: Record<string, string>;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  error,
  onChange,
  onNestedChange,
  nestedErrors
}) => {
  const commonProps = {
    field,
    value,
    error,
    onChange
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
      return <TextInput {...commonProps} />;
    
    case 'select':
      return <SelectInput {...commonProps} />;
    
    case 'multiselect':
      return <MultiSelectInput {...commonProps} />;
    
    case 'typeahead':
      return <TypeaheadInput {...commonProps} />;
    
    case 'buttons':
      return <ButtonsInput {...commonProps} />;
    
    case 'number':
      return <NumberInput {...commonProps} />;
    
    case 'textarea':
      return <TextareaInput {...commonProps} />;
    
    case 'file':
      return <FileInput {...commonProps} />;
    
    case 'date':
    case 'datetime':
      return <DateInput {...commonProps} />;
    
    case 'card':
      return (
        <CardInput
          {...commonProps}
          onNestedChange={onNestedChange}
          nestedErrors={nestedErrors}
        />
      );
    
    default:
      return (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <p className="text-red-600">
            Unsupported field type: <code className="font-mono">{field.type}</code>
          </p>
        </div>
      );
  }
};

export default FieldRenderer;