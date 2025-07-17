import React, { useState } from 'react';
import { AlertCircle, Upload, File, X, CheckCircle, Cloud, Zap, Shield } from 'lucide-react';
import { FormConfig } from '../../types/form';

interface FileInputProps {
  field: FormConfig;
  value: any;
  error?: string;
  onChange: (value: any) => void;
}

const FileInput: React.FC<FileInputProps> = ({ field, value, error, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setUploadStatus('idle');
    setUploadProgress(0);

    try {
      const uploadConfig = field.data as any;
      
      // Simulate file upload with progress
      const formData = new FormData();
      formData.append('file', file);

      // Mock upload process with progress simulation
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      
      // Simulate successful upload response
      const uploadResult = {
        filename: file.name,
        size: file.size,
        type: file.type,
        url: `https://example.com/uploads/${file.name}`,
        uploadedAt: new Date().toISOString()
      };

      onChange(uploadResult);
      setUploadStatus('success');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setUploadStatus('idle');
  };

  return (
    <div className="space-y-4">
      <label className="block text-lg font-bold text-slate-800">
        {field.title}
        {field.required && <span className="text-rose-500 ml-2">*</span>}
      </label>
      
      {!value && (
        <div className={`relative group border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
          error 
            ? 'border-rose-300 bg-rose-50' 
            : 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50'
        }`}>
          <div className="space-y-6">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              uploading 
                ? 'bg-indigo-100 animate-pulse' 
                : 'bg-gradient-to-br from-indigo-100 to-violet-100 group-hover:from-indigo-200 group-hover:to-violet-200'
            }`}>
              {uploading ? (
                <Zap className="w-10 h-10 text-indigo-600" />
              ) : (
                <Upload className="w-10 h-10 text-indigo-600 group-hover:scale-110 transition-transform" />
              )}
            </div>
            
            <div className="space-y-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="hidden"
                />
                <span className={`inline-flex items-center px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  uploading
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 text-white hover:from-indigo-700 hover:via-blue-700 hover:to-violet-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
                }`}>
                  <Cloud className="w-6 h-6 mr-3" />
                  {uploading ? 'Uploading...' : 'Choose File'}
                </span>
              </label>
              <p className="text-slate-600 font-medium">
                Click to select a file or drag and drop
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Secure upload with custom endpoints</span>
              </div>
            </div>
            
            {uploading && (
              <div className="space-y-4">
                <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 h-3 rounded-full transition-all duration-300 shadow-lg"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-lg text-indigo-700 font-bold">{uploadProgress}% uploaded</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {value && (
        <div className={`border-2 rounded-3xl p-8 transition-all duration-300 ${
          uploadStatus === 'success' 
            ? 'border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg' 
            : 'border-slate-300 bg-slate-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className={`p-4 rounded-2xl shadow-lg ${
                uploadStatus === 'success' ? 'bg-emerald-100' : 'bg-slate-100'
              }`}>
                <File className={`w-10 h-10 ${
                  uploadStatus === 'success' ? 'text-emerald-600' : 'text-slate-600'
                }`} />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">{value.filename}</p>
                <p className="text-slate-600 font-medium">
                  {(value.size / 1024).toFixed(1)} KB • {value.type}
                </p>
                {uploadStatus === 'success' && (
                  <div className="flex items-center space-x-2 text-emerald-700 mt-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold">Upload successful</span>
                  </div>
                )}
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleRemove}
              className="p-3 text-rose-500 hover:text-rose-700 hover:bg-rose-100 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="flex items-center space-x-3 text-sm text-rose-700 bg-rose-50 px-4 py-3 rounded-xl border border-rose-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileInput;