import React, { useState, useEffect } from 'react';
import { Send, AlertCircle, Sparkles, CheckCircle, TrendingUp, Shield } from 'lucide-react';
import FieldRenderer from './FieldRenderer';
import { FormConfig, FormData, ValidationError } from '../types/form';
import { validateField, validateForm } from '../utils/validation';

interface FormRendererProps {
  config: FormConfig[];
  onSubmit: (data: FormData) => void;
}

const FormRenderer: React.FC<FormRendererProps> = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validFields, setValidFields] = useState<Set<string>>(new Set());

  // Initialize form data with default values
  useEffect(() => {
    const initializeFormData = (fields: FormConfig[], parentKey = ''): FormData => {
      const data: FormData = {};
      
      fields.forEach((field) => {
        const fieldKey = parentKey ? `${parentKey}.${field.name}` : field.name;
        
        if (field.type === 'card' && field.data) {
          data[field.name] = initializeFormData(field.data as FormConfig[], fieldKey);
        } else if (field.type === 'multiselect') {
          data[field.name] = field.value || [];
        } else {
          data[field.name] = field.value || '';
        }
      });
      
      return data;
    };

    setFormData(initializeFormData(config));
    setErrors({});
    setValidFields(new Set());
  }, [config]);

  const handleFieldChange = (name: string, value: any, fieldConfig: FormConfig) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const error = validateField(value, fieldConfig);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));

    // Track valid fields
    setValidFields(prev => {
      const newSet = new Set(prev);
      if (!error && value !== '' && value !== null && value !== undefined) {
        newSet.add(name);
      } else {
        newSet.delete(name);
      }
      return newSet;
    });
  };

  const handleNestedFieldChange = (parentName: string, childName: string, value: any, fieldConfig: FormConfig) => {
    setFormData(prev => ({
      ...prev,
      [parentName]: {
        ...prev[parentName],
        [childName]: value
      }
    }));

    // Real-time validation for nested fields
    const error = validateField(value, fieldConfig);
    const fieldKey = `${parentName}.${childName}`;
    setErrors(prev => ({
      ...prev,
      [fieldKey]: error || ''
    }));

    // Track valid nested fields
    setValidFields(prev => {
      const newSet = new Set(prev);
      if (!error && value !== '' && value !== null && value !== undefined) {
        newSet.add(fieldKey);
      } else {
        newSet.delete(fieldKey);
      }
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate entire form
      const validationErrors = validateForm(formData, config);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Clear errors and submit
      setErrors({});
      
      // Simulate submission delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalFields = config.reduce((count, field) => {
    if (field.type === 'card' && Array.isArray(field.data)) {
      return count + field.data.length;
    }
    return count + 1;
  }, 0);

  const completionPercentage = Math.round((validFields.size / totalFields) * 100);

  return (
    <div className="space-y-10">
      {/* Progress Indicator */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-indigo-900 text-lg">Form Progress</span>
              <p className="text-sm text-indigo-600 font-medium">Real-time completion tracking</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-indigo-700">{completionPercentage}%</span>
            <p className="text-sm text-indigo-600 font-medium">Complete</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-indigo-200 rounded-full h-4 shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 h-4 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center space-x-2 text-indigo-700">
            <CheckCircle className="w-4 h-4" />
            <span className="font-semibold">{validFields.size} of {totalFields} fields completed</span>
          </div>
          <div className="flex items-center space-x-2 text-indigo-600">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Real-time validation active</span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-10">
        {config.map((field, index) => (
          <div key={`${field.name}-${index}`} className="group">
            <FieldRenderer
              field={field}
              value={formData[field.name]}
              error={errors[field.name]}
              onChange={(value) => handleFieldChange(field.name, value, field)}
              onNestedChange={(childName, value, childConfig) => 
                handleNestedFieldChange(field.name, childName, value, childConfig)
              }
              nestedErrors={errors}
            />
          </div>
        ))}

        {/* Submit Section */}
        <div className="bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl shadow-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">Ready to submit?</p>
                <p className="text-sm text-slate-600 font-medium">All required fields must be completed</p>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex items-center px-10 py-5 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white rounded-2xl hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-700 focus:ring-4 focus:ring-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-bold text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin mr-4" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 mr-4 group-hover:translate-x-1 transition-transform" />
                  <span>Submit Form</span>
                </>
              )}
              
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRenderer;