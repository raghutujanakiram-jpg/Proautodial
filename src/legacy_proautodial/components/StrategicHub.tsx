
import React from 'react';
import { AppView } from '../types';

interface StrategicHubProps {
  onNavigate: (view: AppView) => void;
}

const StrategicHub: React.FC<StrategicHubProps> = ({ onNavigate }) => {
  const actions = [
    { 
      id: AppView.PORTAL_VOICE_LAB, 
      title: 'Neural Lab', 
      desc: 'Test Ring-LLM voice personas & real-time synthesis.', 
      icon: 'fa-waveform-lines', 
      color: 'bg-brand', 
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=60'
    },
    { 
      id: AppView.PORTAL_HUB, 
      title: 'Assistant Hub', 
      desc: 'Deploy and manage live autonomous voice agents.', 
      icon: 'fa-robot', 
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1551288049-bbbda546697a?w=800&auto=format&fit=crop&q=60'
    },
    { 
      id: AppView.PORTAL_CAMPAIGNS, 
      title: 'Outreach', 
      desc: 'Orchestrate massive outbound predictive dialers.', 
      icon: 'fa-rocket', 
      color: 'bg-emerald-600',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
    },
    { 
      id: AppView.PORTAL_KNOWLEDGE, 
      title: 'Brain Forge', 
      desc: 'Train your agents on your enterprise data docs.', 
      icon: 'fa-brain', 
      color: 'bg-indigo-600',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <div className="p-10 space-y-12 animate-fade-in max-w-[1600px] mx-auto">
      <div className="space-y-2">
        <h1 className="text-5xl font-black tracking-tighter">Strategic <span className="text-brand">Hub</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Operational Control Interface</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {actions.map((act) => (
          <button 
            key={act.id}
            onClick={() => onNavigate(act.id)}
            className="group relative h-[450px] rounded-[3rem] overflow-hidden border border-slate-800 bg-slate-900 text-left transition-all hover:scale-[1.02] hover:border-brand/40 shadow-2xl"
          >
            <img src={act.image} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={act.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-10 space-y-4">
              <div className={`w-14 h-14 ${act.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl group-hover:rotate-12 transition-transform`}>
                <i className={`fas ${act.icon}`}></i>
              </div>
              <h3 className="text-3xl font-black text-white">{act.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">{act.desc}</p>
              <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase text-brand tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Engage Subsystem <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 text-brand/5 pointer-events-none group-hover:text-brand/10 transition-colors">
            <i className="fas fa-shield-halved text-[12rem]"></i>
         </div>
         <div className="space-y-4 relative z-10">
           <h2 className="text-3xl font-black">System Status: <span className="text-emerald-500 italic">Optimal</span></h2>
           <p className="text-slate-400 font-medium max-w-xl">All global nodes are functioning with under 350ms latency. Your neural encryption keys are validated for the next 24 hours.</p>
         </div>
         <button onClick={() => onNavigate(AppView.BOOK_DEMO)} className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand hover:text-white transition-all shadow-xl relative z-10">
           Request Architect Sync
         </button>
      </div>
    </div>
  );
};

export default StrategicHub;
