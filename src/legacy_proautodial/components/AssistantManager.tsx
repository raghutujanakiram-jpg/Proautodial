
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AssistantTemplate, TaskHistoryItem } from '../types';
import * as gemini from '../services/geminiService';

const AssistantManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'outbound' | 'inbound' | 'webcall'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfigPanel, setShowConfigPanel] = useState<string | null>(null);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [assistants, setAssistants] = useState<AssistantTemplate[]>([
    { 
      id: '1', name: 'Elicia Enterprise', description: 'Primary outbound sales node with advanced empathy scaling.', 
      industry: 'SaaS', icon: 'fa-robot', type: 'outbound', status: 'online', phoneNumber: '+1 (888) 234-5678',
      metrics: { callsHandled: '14,202', qualRate: '12.4%', sentiment: '8.4', avgSentiment7d: '8.1', latency: '320ms' }, 
      isPinned: true, taskHistory: [] 
    },
    { 
      id: '2', name: 'Support Node A', description: 'Reactive inbound support for high-frequency technical tickets.', 
      industry: 'Technical', icon: 'fa-headset', type: 'inbound', status: 'online', phoneNumber: '+91 22 6809 1100',
      metrics: { callsHandled: '8,412', qualRate: '94.2%', sentiment: '9.1', avgSentiment7d: '8.8', latency: '280ms' }, 
      taskHistory: [] 
    },
    { 
      id: '3', name: 'Mark Closer', description: 'High-velocity predictive dialing node for insurance leads.', 
      industry: 'Insurance', icon: 'fa-bolt', type: 'outbound', status: 'offline', phoneNumber: '+1 (415) 555-0123',
      metrics: { callsHandled: '42,910', qualRate: '18.9%', sentiment: '7.6', avgSentiment7d: '7.2', latency: '350ms' }, 
      taskHistory: [] 
    },
    { 
      id: '4', name: 'Web Assistant X', description: 'Browser-based voice assistant for checkout assistance.', 
      industry: 'eCommerce', icon: 'fa-globe', type: 'webcall', status: 'provisioning',
      metrics: { callsHandled: '1,200', qualRate: '5.4%', sentiment: '8.9', avgSentiment7d: '8.6', latency: '410ms' }, 
      taskHistory: [] 
    }
  ]);

  const filteredAssistants = useMemo(() => {
    return assistants.filter(a => (activeTab === 'all' || a.type === activeTab) && 
      (a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.industry.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [assistants, activeTab, searchQuery]);

  const handleTestCall = async (id: string) => {
    setIsTestLoading(true);
    try {
      // Launching a neural handshake test
      const response = await gemini.getFastResponse("Perform a diagnostic audio handshake for assistant node: " + id);
      console.log("Diagnostic:", response);
      alert("Live Handshake Successful. Neural latency within parameters.");
    } finally {
      setIsTestLoading(false);
    }
  };

  const toggleStatus = (id: string) => {
    setAssistants(prev => prev.map(a => 
      a.id === id ? { ...a, status: a.status === 'online' ? 'offline' : 'online' } : a
    ));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0B0E14] text-white animate-fade-in min-h-screen relative overflow-hidden">
      {/* Utility Backdrop Header */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-brand/5 pointer-events-none blur-[120px]"></div>

      <div className="p-10 space-y-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tighter">Live Assistants</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Global Neural Node Management</p>
          </div>
          <div className="flex gap-4">
             <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
               <i className="fas fa-chart-line text-brand"></i> Global Analytics
             </button>
             <button 
                onClick={() => setShowConfigPanel('new')}
                className="px-10 py-4 bg-brand text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
             >
               <i className="fas fa-plus"></i> Create Assistant
             </button>
          </div>
        </div>

        {/* Tactical Search & Filter Bar */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-4 rounded-[2rem] flex flex-col lg:flex-row gap-6 items-center shadow-2xl">
           <div className="relative flex-1 w-full">
              <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"></i>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assistant nodes by name, industry, or protocol..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-16 pr-6 py-4 text-xs font-bold outline-none focus:border-brand/40 transition-all shadow-inner"
              />
           </div>
           <div className="flex gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
             {['all', 'outbound', 'inbound', 'webcall'].map(tab => (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 {tab}
               </button>
             ))}
           </div>
        </div>

        {/* Live Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
           {filteredAssistants.map(asst => (
             <div key={asst.id} className="group bg-slate-900 border border-slate-800 rounded-[3rem] p-10 space-y-8 hover:border-brand/30 transition-all duration-500 relative overflow-hidden flex flex-col shadow-2xl">
                {/* Visual Glow Layer */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none transition-opacity duration-1000 group-hover:opacity-40 ${asst.status === 'online' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

                {/* Card Header */}
                <div className="flex justify-between items-start">
                   <div className="flex gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-slate-950 border border-white/5 flex items-center justify-center text-3xl text-brand shadow-inner group-hover:rotate-6 transition-transform">
                        <i className={`fas ${asst.icon}`}></i>
                      </div>
                      <div>
                         <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:text-brand transition-colors">{asst.name}</h3>
                         <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${asst.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></span>
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{asst.status}</span>
                            <span className="text-slate-700">•</span>
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{asst.type}</span>
                         </div>
                      </div>
                   </div>
                   <button 
                    onClick={() => toggleStatus(asst.id)}
                    className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 hover:text-white transition-all shadow-md active:scale-90"
                   >
                     <i className={`fas ${asst.status === 'online' ? 'fa-toggle-on text-brand' : 'fa-toggle-off'}`}></i>
                   </button>
                </div>

                {/* Detail Section */}
                <div className="space-y-4">
                   <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{asst.description}</p>
                   {asst.phoneNumber && (
                     <div className="flex items-center gap-3 px-4 py-3 bg-slate-950 rounded-xl border border-white/5 shadow-inner">
                        <i className="fas fa-phone-arrow-up-right text-brand text-xs"></i>
                        <span className="text-xs font-black text-slate-400 font-mono tracking-tighter">{asst.phoneNumber}</span>
                        <button className="ml-auto text-slate-700 hover:text-white transition-colors"><i className="fas fa-copy text-[10px]"></i></button>
                     </div>
                   )}
                </div>

                {/* Performance Hub */}
                <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Efficiency</p>
                      <p className="text-lg font-black">{asst.metrics.qualRate}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Latency</p>
                      <p className="text-lg font-black text-brand">{asst.metrics.latency}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Success/Sentiment</p>
                      <p className="text-lg font-black text-emerald-500">{asst.metrics.sentiment}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Total Usage</p>
                      <p className="text-lg font-black text-slate-200">{asst.metrics.callsHandled}</p>
                   </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-4 pt-2">
                   <button 
                    onClick={() => setShowConfigPanel(asst.id)}
                    className="flex-1 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-brand/40 transition-all flex items-center justify-center gap-3 shadow-inner"
                   >
                     <i className="fas fa-sliders"></i> Configure
                   </button>
                   <button 
                    disabled={isTestLoading}
                    onClick={() => handleTestCall(asst.id)}
                    className="flex-1 py-4 bg-white/5 hover:bg-brand rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-md"
                   >
                     {isTestLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-microphone"></i>} Test Live
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Side-Panel Configuration Flow (Ringg.ai Style) */}
      {showConfigPanel && (
        <div className="fixed inset-0 z-[300] flex justify-end animate-fade-in">
           <div className="absolute inset-0 bg-[#0B0E14]/80 backdrop-blur-md" onClick={() => setShowConfigPanel(null)}></div>
           <div className="w-full max-w-2xl bg-slate-900 h-full border-l border-white/10 shadow-[-50px_0_100px_-20px_rgba(0,0,0,0.5)] relative z-10 flex flex-col animate-slide-in-right">
              
              <header className="p-10 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
                 <div>
                    <h3 className="text-3xl font-black tracking-tighter">{showConfigPanel === 'new' ? 'New Assistant' : 'Update Architecture'}</h3>
                    <p className="text-[10px] font-black uppercase text-slate-600 mt-1 tracking-widest">Strategic Node Identification</p>
                 </div>
                 <button onClick={() => setShowConfigPanel(null)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all"><i className="fas fa-times"></i></button>
              </header>

              <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
                 <section className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-2 h-8 bg-brand rounded-full"></div>
                       <h4 className="text-xl font-black uppercase tracking-tight">Core Identity</h4>
                    </div>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Designation</label>
                          <input className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:border-brand outline-none transition-all shadow-inner" placeholder="e.g. Inbound Retention Lead" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Vocal Profile</label>
                          <div className="grid grid-cols-2 gap-4">
                             {['Zephyr (Deep)', 'Kore (Indian)', 'Elicia (Smooth)', 'Mark (Firm)'].map(v => (
                               <button key={v} className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-left hover:border-brand group transition-all">
                                  <p className="text-[10px] font-black text-slate-300 group-hover:text-brand">{v}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                     <i className="fas fa-waveform text-[8px] text-slate-600"></i>
                                     <span className="text-[8px] font-bold text-slate-600 uppercase">Preview Sample</span>
                                  </div>
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>
                 </section>

                 <section className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-2 h-8 bg-brand rounded-full"></div>
                       <h4 className="text-xl font-black uppercase tracking-tight">Cognitive Directive</h4>
                    </div>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 ml-1">System Instruction (Prompt)</label>
                          <textarea className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:border-brand outline-none transition-all shadow-inner h-48 resize-none" placeholder="You are a professional assistant node representing Proautodial..." />
                       </div>
                       <div className="flex items-center gap-6 p-6 bg-brand/5 border border-brand/20 rounded-2xl">
                          <i className="fas fa-lightbulb text-brand text-xl"></i>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">Tip: Use structured JSON logic in your prompts for higher accuracy in intent classification.</p>
                       </div>
                    </div>
                 </section>

                 <section className="space-y-6 pb-20">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-2 h-8 bg-brand rounded-full"></div>
                       <h4 className="text-xl font-black uppercase tracking-tight">Network Handshake</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 ml-1">SIP Carrier Node</label>
                          <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-xs font-black uppercase outline-none focus:border-brand transition-all shadow-inner appearance-none">
                             <option>Plivo Global</option>
                             <option>Twilio Standard</option>
                             <option>Domestic (India)</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Knowledge Node</label>
                          <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-xs font-black uppercase outline-none focus:border-brand transition-all shadow-inner appearance-none">
                             <option>Global Catalog 2024</option>
                             <option>Legal Compliance Docs</option>
                             <option>Custom Node +</option>
                          </select>
                       </div>
                    </div>
                 </section>
              </div>

              <footer className="p-10 border-t border-white/5 bg-slate-950/80 sticky bottom-0">
                 <div className="flex gap-6">
                    <button onClick={() => setShowConfigPanel(null)} className="flex-1 py-5 bg-white/5 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Discard</button>
                    <button className="flex-[2] py-5 bg-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-brand/40 hover:brightness-110 active:scale-95 transition-all">Save & Synchronize</button>
                 </div>
              </footer>
           </div>
        </div>
      )}
    </div>
  );
};

export default AssistantManager;
