
import React, { useState } from 'react';
import * as gemini from '../services/geminiService';

const AIPersonaBuilder: React.FC = () => {
  const [activeVoice, setActiveVoice] = useState('ElevenLabs - Josh');
  const [objective, setObjective] = useState('');
  const [processing, setProcessing] = useState(false);
  const [kbSummary, setKbSummary] = useState('');
  
  const voices = [
    { name: 'Kore (Neural Native)', gender: 'Male', tone: 'Professional', accent: 'Indian English' },
    { name: 'ElevenLabs - Josh', gender: 'Male', tone: 'Deep/Smooth', accent: 'US Global' },
    { name: 'Fenrir (Native)', gender: 'Male', tone: 'Authoritative', accent: 'UK' },
    { name: 'Zephyr (Neural)', gender: 'Female', tone: 'Empathetic', accent: 'Global' }
  ];

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProcessing(true);
      // Simulating text extraction for the demo logic
      const mockText = "Company Policy: We offer 15% discount for annual contracts. Standard lead time is 48 hours. Support is 24/7.";
      try {
        const summary = await gemini.processKnowledgeDoc(mockText, objective || "Sales Representative");
        setKbSummary(summary || '');
      } catch (err) {
        alert("Processing error");
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-950 text-white transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* Settings Form */}
        <div className="space-y-12">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter">AI Persona <span className="text-brand">Architect</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No-Code Neural Identity Builder</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">1. Core Identity</label>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="Persona Objective (e.g. Retention Expert)" 
                  className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-brand transition-all font-bold" 
                />
                <select className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-brand transition-all font-bold">
                  <option>English (Global)</option>
                  <option>Hindi (Standard)</option>
                  <option>Hinglish (Hybrid)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">2. Vocal Selection</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {voices.map((v) => (
                  <button 
                    key={v.name}
                    onClick={() => setActiveVoice(v.name)}
                    className={`p-6 rounded-2xl border transition-all text-left group ${activeVoice === v.name ? 'bg-brand/10 border-brand shadow-lg shadow-brand/20' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-black text-sm">{v.name}</p>
                      <i className={`fas fa-volume-high ${activeVoice === v.name ? 'text-brand' : 'text-slate-700'}`}></i>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{v.accent} • {v.tone}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">3. Knowledge Synthesis</label>
              <div className="relative p-10 border-2 border-dashed border-slate-800 rounded-[2.5rem] bg-slate-900/50 text-center hover:border-brand transition-all cursor-pointer group overflow-hidden">
                {processing && <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center z-20"><i className="fas fa-spinner fa-spin text-3xl text-brand"></i></div>}
                <i className="fas fa-file-pdf text-4xl text-brand mb-4 opacity-50 group-hover:opacity-100 transition-opacity"></i>
                <p className="font-bold text-slate-400">Upload Training Docs (PDF/TXT)</p>
                <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-2">Maximum 50MB / File</p>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleDocUpload} />
              </div>
              {kbSummary && (
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl animate-fade-in">
                  <p className="text-[10px] font-black uppercase text-emerald-500 mb-2">Knowledge Injected successfully</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{kbSummary}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Preview / Logic */}
        <div className="bg-slate-900 rounded-[4rem] border border-slate-800 p-12 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 text-brand/5">
             <i className="fas fa-brain-circuit text-[20rem]"></i>
          </div>
          <div className="relative z-10 flex-1 flex flex-col gap-10">
            <div>
              <h2 className="text-3xl font-black mb-2">Neural Guardrails</h2>
              <p className="text-slate-400 text-sm font-medium">Define the operational constraints of the agent.</p>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                   <span>Creativity Level</span>
                   <span>Precision Mode</span>
                 </div>
                 <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-brand w-2/3"></div>
                 </div>
               </div>
               <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                   <span>Response Latency</span>
                   <span>Under 400ms</span>
                 </div>
                 <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-brand w-1/5"></div>
                 </div>
               </div>
            </div>

            <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-inner">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">AI Simulation Stream</p>
               </div>
               <div className="space-y-4">
                 <p className="text-xs italic text-slate-500">"Namaste, my name is {activeVoice.split(' - ')[1] || 'Agent'}. I am calling from ProAutoDial regarding your recent {objective || 'inquiry'}. How can I assist you today?"</p>
               </div>
            </div>

            <button className="mt-auto w-full py-6 bg-brand text-white rounded-3xl font-black text-xl hover:brightness-110 shadow-2xl shadow-brand/30 transition-all flex items-center justify-center gap-4">
              Deploy Neural Engine
              <i className="fas fa-rocket"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPersonaBuilder;
