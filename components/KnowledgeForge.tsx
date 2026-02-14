
import React, { useState } from 'react';

const KnowledgeForge: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [kbName, setKbName] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-white animate-fade-in">
      <header className="h-24 border-b border-slate-800 flex items-center justify-between px-10">
        <div>
          <h2 className="text-4xl font-black tracking-tighter">Knowledge Base</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Deterministic Neural Ingestion</p>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all">Edit Schema</button>
          <button className="px-8 py-3 bg-brand text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand/20">Train AI</button>
        </div>
      </header>

      <main className="flex-1 p-10 grid lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Base Identifier</label>
            <input 
              value={kbName}
              onChange={(e) => setKbName(e.target.value)}
              placeholder="e.g. 2024 Product Catalog"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-brand transition-all text-sm font-bold shadow-inner"
            />
          </div>

          <div 
            className={`border-2 border-dashed rounded-[3rem] p-20 text-center transition-all ${dragActive ? 'border-brand bg-brand/5 scale-[0.98]' : 'border-slate-800 bg-slate-900/20 hover:border-slate-600'}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
          >
            <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
              <i className="fas fa-cloud-arrow-up text-3xl text-slate-500 group-hover:text-brand transition-colors"></i>
            </div>
            <h3 className="text-xl font-black mb-2">Drag 'n' Drop Intelligence</h3>
            <p className="text-xs text-slate-500 font-medium">PDF, TXT, JSON, DOCX up to 512MB each.</p>
            <button className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Choose Files</button>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-[3rem] flex items-center justify-center p-12 text-center overflow-hidden relative shadow-2xl">
           <div className="absolute inset-0 bg-brand/5 opacity-50 blur-[100px] pointer-events-none"></div>
           <div className="relative z-10 space-y-6">
              <i className="fas fa-folder-open text-6xl text-slate-800"></i>
              <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Upload files to preview structure</p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default KnowledgeForge;
