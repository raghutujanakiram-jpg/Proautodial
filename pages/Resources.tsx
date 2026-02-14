
import React from 'react';
import { AppView } from '../types';

interface ResourcesProps {
  onNavigate: (view: AppView) => void;
}

const Resources: React.FC<ResourcesProps> = ({ onNavigate }) => {
  const cats = [
    { title: 'Knowledge Base', icon: 'fa-books', desc: 'Guides, tutorials and troubleshooting for all systems.', view: AppView.SUPPORT_CENTER },
    { title: 'Documentation', icon: 'fa-file-code', desc: 'API references and technical architecture specs.', view: AppView.SERVICES },
    { title: 'Blog', icon: 'fa-newspaper', desc: 'Latest industry news and neural identity updates.', view: AppView.BLOG },
    { title: 'Download Center', icon: 'fa-cloud-arrow-down', desc: 'Whitepapers, brochures and strategy datasheets.', view: AppView.CONTACT }
  ];

  return (
    <div className="pt-40 pb-32 px-6 bg-slate-50 dark:bg-[#0B0E14] animate-fade-in min-h-screen">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-6">
           <h1 className="text-6xl md:text-8xl font-black tracking-tighter dark:text-white leading-none">Strategic <span className="text-gradient">Manuals.</span></h1>
           <p className="text-xl text-slate-500 font-medium">Comprehensive intelligence for architects and operators.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {cats.map(cat => (
             <div key={cat.title} className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] space-y-8 group hover:border-brand/40 transition-all shadow-sm">
                <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:rotate-6"><i className={`fas ${cat.icon}`}></i></div>
                <div className="space-y-3">
                   <h4 className="text-2xl font-black dark:text-white leading-none">{cat.title}</h4>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">{cat.desc}</p>
                </div>
                <button 
                  onClick={() => onNavigate(cat.view)}
                  className="text-[10px] font-black uppercase text-brand tracking-widest hover:underline"
                >
                  Access Library
                </button>
             </div>
           ))}
        </div>

        <div className="bg-slate-900 p-20 rounded-[4rem] text-center border border-slate-800 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
           <h3 className="text-4xl font-black text-white relative z-10">Search Local Knowledge Node</h3>
           <div className="max-w-2xl mx-auto mt-10 relative z-10">
              <input className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-10 py-6 text-white font-bold outline-none focus:ring-4 focus:ring-brand/10" placeholder="Global system search..." />
              <button 
                onClick={() => onNavigate(AppView.SUPPORT_CENTER)}
                className="fas fa-search absolute right-8 top-1/2 -translate-y-1/2 text-slate-600 hover:text-brand transition-colors"
              ></button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
