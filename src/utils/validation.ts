import { FormConfig, FormData } from '../types/form';

export const validateField = (value: any, field: FormConfig): string | null => {
  // Check required field
  if (field.required) {
    if (value === null || value === undefined || value === '') {
      return field.error || `${field.title} is required`;
    }
    
    // Special handling for arrays (multiselect)
    if (Array.isArray(value) && value.length === 0) {
      return field.error || `${field.title} is required`;
    }
  }

  // Skip validation if field is empty and not required
  if (!field.required && (value === null || value === undefined || value === '')) {
    return null;
  }

  // Regex validation
  if (field.validator && typeof value === 'string') {
    const regex = new RegExp(field.validator);
    if (!regex.test(value)) {
      return field.error || `${field.title} format is invalid`;
    }
  }

  // Number validation
  if (field.type === 'number' && value !== '') {
    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      return field.error || `${field.title} must be a valid number`;
    }
    
    if (field.min !== undefined && numValue < Number(field.min)) {
      return field.error || `${field.title} must be at least ${field.min}`;
    }
    
    if (field.max !== undefined && numValue > Number(field.max)) {
      return field.error || `${field.title} must be at most ${field.max}`;
    }
  }

  // Date validation
  if ((field.type === 'date' || field.type === 'datetime') && value) {
    const dateValue = new Date(value);
    
    if (isNaN(dateValue.getTime())) {
      return field.error || `${field.title} must be a valid date`;
    }
    
    if (field.min) {
      const minDate = new Date(field.min);
      if (dateValue < minDate) {
        return field.error || `${field.title} must be after ${field.min}`;
      }
    }
    
    if (field.max) {
      const maxDate = new Date(field.max);
      if (dateValue > maxDate) {
        return field.error || `${field.title} must be before ${field.max}`;
      }
    }
  }

  return null;
};

export const validateForm = (formData: FormData, config: FormConfig[], parentKey = ''): Record<string, string> => {
  const errors: Record<string, string> = {};

  config.forEach(field => {
    const fieldKey = parentKey ? `${parentKey}.${field.name}` : field.name;
    const fieldValue = formData[field.name];

    if (field.type === 'card' && Array.isArray(field.data)) {
      // Validate nested card fields
      const nestedErrors = validateForm(fieldValue || {}, field.data, fieldKey);
      Object.assign(errors, nestedErrors);
    } else {
      // Validate regular field
      const error = validateField(fieldValue, field);
      if (error) {
        errors[fieldKey] = error;
      }
    }
  });

  return errors;
};