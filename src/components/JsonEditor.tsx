import React from 'react';
import { Code2, Sparkles, Terminal } from 'lucide-react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg shadow-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <label className="text-sm font-bold text-slate-800 tracking-wide">JSON CONFIGURATION</label>
        </div>
        <div className="flex items-center space-x-2 text-xs text-indigo-600">
          <Sparkles className="w-4 h-4" />
          <span className="font-bold tracking-wide">LIVE PREVIEW</span>
        </div>
      </div>
      
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl"></div>
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-96 p-6 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-sm resize-none border-2 border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all placeholder-slate-500"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b  50%, #334155 100%)',
            }}
          />
          <div className="absolute top-4 right-4 flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800/80 rounded-full border border-slate-600">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-bold">JSON</span>
            </div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600 font-medium">Enter a valid JSON array of form field configurations</span>
        <div className="flex items-center space-x-6 text-slate-500">
          <span className="font-medium">Ctrl+A to select all</span>
          <span className="font-medium">Auto-validation enabled</span>
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;