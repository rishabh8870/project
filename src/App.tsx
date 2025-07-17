import React, { useState } from 'react';
import { Sparkles, Code2, FileText, Database, Zap, CheckCircle2, Shield, Layers, Rocket } from 'lucide-react';
import FormRenderer from './components/FormRenderer';
import { sampleConfigs } from './data/sampleConfigs';
import JsonEditor from './components/JsonEditor';

function App() {
  const [selectedConfig, setSelectedConfig] = useState('basic');
  const [customJson, setCustomJson] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const getCurrentConfig = () => {
    if (useCustom) {
      try {
        return JSON.parse(customJson);
      } catch (e) {
        return null;
      }
    }
    return sampleConfigs[selectedConfig];
  };

  const handleFormSubmit = (data: any) => {
    setSubmittedData(data);
    console.log('Form submitted with data:', data);
  };

  const features = [
    { icon: Zap, text: "Real-time Validation", color: "text-amber-600" },
    { icon: FileText, text: "Dynamic Rendering", color: "text-blue-600" },
    { icon: Database, text: "Nested Forms", color: "text-emerald-600" },
    { icon: Shield, text: "Secure File Uploads", color: "text-violet-600" }
  ];

  const configTypes = [
    { key: 'basic', title: 'Basic Form', description: 'Text, email, and number fields', icon: FileText, color: 'from-blue-600 to-cyan-600' },
    { key: 'selectMultiselect', title: 'Selection Fields', description: 'Dropdowns and multi-choice', icon: Layers, color: 'from-emerald-600 to-teal-600' },
    { key: 'fileCard', title: 'Advanced Fields', description: 'File uploads and nested cards', icon: Database, color: 'from-violet-600 to-purple-600' },
    { key: 'complex', title: 'Complex Form', description: 'Multi-level nested structure', icon: Rocket, color: 'from-rose-600 to-pink-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Dynamic Form Creator
                </h1>
                <p className="text-sm text-slate-600 font-medium">Professional JSON-driven form builder</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 group">
                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-8 shadow-sm">
            <Code2 className="w-5 h-5 text-blue-700 mr-3" />
            <span className="text-sm font-bold text-blue-800 tracking-wide">ASSIGNMENT SOLUTION</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Build Forms
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent block">
              Dynamically
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            A powerful React application that renders forms from JSON configuration with real-time validation, 
            nested forms, secure file uploads, and complete dynamic rendering capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 sticky top-28">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl mr-4 shadow-lg">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Configuration</h3>
                  <p className="text-sm text-slate-600 font-medium">JSON-based form definition</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Configuration Type Selector */}
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                  <label className="block text-sm font-bold text-slate-800 mb-4 tracking-wide">
                    CONFIGURATION SOURCE
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      !useCustom 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105' 
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        checked={!useCustom}
                        onChange={() => setUseCustom(false)}
                        className="sr-only"
                      />
                      <FileText className="w-5 h-5 mr-2" />
                      <span className="font-bold">Sample</span>
                    </label>
                    <label className={`flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      useCustom 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105' 
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        checked={useCustom}
                        onChange={() => setUseCustom(true)}
                        className="sr-only"
                      />
                      <Code2 className="w-5 h-5 mr-2" />
                      <span className="font-bold">Custom</span>
                    </label>
                  </div>
                </div>

                {!useCustom && (
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-4 tracking-wide">
                      SAMPLE CONFIGURATIONS
                    </label>
                    <div className="space-y-3">
                      {configTypes.map((config) => (
                        <button
                          key={config.key}
                          onClick={() => setSelectedConfig(config.key)}
                          className={`w-full p-5 text-left rounded-2xl transition-all duration-200 group ${
                            selectedConfig === config.key
                              ? `bg-gradient-to-r ${config.color} text-white shadow-xl transform scale-105`
                              : 'bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl ${
                              selectedConfig === config.key 
                                ? 'bg-white/20' 
                                : 'bg-slate-100 group-hover:bg-slate-200'
                            }`}>
                              <config.icon className={`w-6 h-6 ${
                                selectedConfig === config.key ? 'text-white' : 'text-slate-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-lg">{config.title}</div>
                              <div className={`text-sm mt-1 ${
                                selectedConfig === config.key ? 'text-white/80' : 'text-slate-500'
                              }`}>
                                {config.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {useCustom && (
                  <JsonEditor
                    value={customJson}
                    onChange={setCustomJson}
                    placeholder="Enter your JSON configuration here..."
                  />
                )}

                {/* Submitted Data Display */}
                {submittedData && (
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-emerald-600 rounded-xl mr-4 shadow-lg">
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-emerald-800">Form Submitted!</h4>
                        <p className="text-sm text-emerald-600 font-medium">JSON output from form data</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border-2 border-emerald-200 shadow-inner">
                      <pre className="text-sm text-slate-800 overflow-auto max-h-64 font-mono leading-relaxed">
                        {JSON.stringify(submittedData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl mr-4 shadow-lg">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Generated Form</h3>
                    <p className="text-sm text-slate-600 font-medium">Dynamic rendering from JSON</p>
                  </div>
                </div>
                
                {getCurrentConfig() && (
                  <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full border border-emerald-200">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
                    <span className="text-sm font-bold text-emerald-700 tracking-wide">LIVE</span>
                  </div>
                )}
              </div>

              {getCurrentConfig() ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-violet-500/5 rounded-2xl -m-6"></div>
                  <div className="relative">
                    <FormRenderer
                      config={getCurrentConfig()}
                      onSubmit={handleFormSubmit}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center shadow-inner">
                    <Code2 className="w-16 h-16 text-slate-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-700 mb-3">Invalid JSON Configuration</h4>
                  <p className="text-slate-500 max-w-md mx-auto font-medium leading-relaxed">
                    Please provide a valid JSON configuration that matches the schema to render the form
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Zap,
              title: "Real-time Validation",
              description: "Instant feedback with regex patterns and constraint checking for better user experience",
              color: "from-amber-500 to-orange-600",
              bgColor: "from-amber-50 to-orange-50",
              borderColor: "border-amber-200"
            },
            {
              icon: FileText,
              title: "Dynamic Rendering",
              description: "Fully configurable forms from JSON with no hardcoded fields or limitations",
              color: "from-blue-500 to-cyan-600",
              bgColor: "from-blue-50 to-cyan-50",
              borderColor: "border-blue-200"
            },
            {
              icon: Database,
              title: "Nested Forms",
              description: "Recursive card support for complex multi-level forms with unlimited depth",
              color: "from-emerald-500 to-teal-600",
              bgColor: "from-emerald-50 to-teal-50",
              borderColor: "border-emerald-200"
            },
            {
              icon: Shield,
              title: "Secure Uploads",
              description: "Custom endpoint support with progress indication and secure file handling",
              color: "from-violet-500 to-purple-600",
              bgColor: "from-violet-50 to-purple-50",
              borderColor: "border-violet-200"
            }
          ].map((feature, index) => (
            <div key={index} className="group">
              <div className={`bg-gradient-to-br ${feature.bgColor} rounded-2xl p-8 border-2 ${feature.borderColor} hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-full`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed font-medium">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;