export interface FormConfig {
  title: string;
  name: string;
  placeholder?: string;
  type: 'text' | 'buttons' | 'select' | 'multiselect' | 'typeahead' | 'number' | 'textarea' | 'tel' | 'email' | 'file' | 'date' | 'datetime' | 'card';
  validator?: string;
  min?: string;
  max?: string;
  resolution?: string;
  data?: any;
  value?: any;
  required?: boolean;
  error?: string;
}

export interface FormData {
  [key: string]: any;
}

export interface ValidationError {
  field: string;
  message: string;
}