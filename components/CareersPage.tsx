
import React from 'react';

const CareersPage: React.FC = () => {
  const openings = [
    { title: 'Neural Designer', type: 'Remote (Global)', level: 'Senior', color: 'text-brand' },
    { title: 'VoIP Protocol Engineer', type: 'Hybrid (San Jose)', level: 'Expert', color: 'text-blue-500' },
    { title: 'AI Ethics Lead', type: 'Remote', level: 'Director', color: 'text-emerald-500' },
    { title: 'Closer - Enterprise Ops', type: 'Hybrid (Dubai)', level: 'Mid-Senior', color: 'text-amber-500' },
  ];

  return (
    <div className="pt-48 pb-40 px-6 bg-slate-950 text-white selection:bg-brand selection:text-white min-h-screen overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 relative z-10">
        <div className="space-y-12">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20">
            Join the Machine
          </div>
          <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter">
            Forge <br /> the <br /> <span className="text-brand">Future.</span>
          </h1>
          <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-md">
            We are building the world's most sophisticated neural communication layer. We don't hire employees; we recruit pioneers.
          </p>
          <div className="flex gap-12 pt-8">
             <div className="space-y-2">
               <p className="text-4xl font-black">100%</p>
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Remote Culture</p>
             </div>
             <div className="w-px h-16 bg-slate-800"></div>
             <div className="space-y-2">
               <p className="text-4xl font-black">Equity</p>
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Stake in Neural IP</p>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-10">Active Neural Openings</p>
          {openings.map((job, i) => (
            <div key={i} className="group p-10 bg-slate-900/50 border border-slate-900 rounded-[3rem] hover:border-brand/40 transition-all duration-700 cursor-pointer flex justify-between items-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 space-y-2">
                <h3 className={`text-2xl font-black ${job.color} group-hover:text-white transition-colors`}>{job.title}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{job.type} • {job.level}</p>
              </div>
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-brand group-hover:text-white transition-all group-hover:rotate-12">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          ))}
          
          <div className="p-12 border-2 border-dashed border-slate-900 rounded-[4rem] text-center mt-12 space-y-6 group hover:border-brand/50 transition-all">
             <p className="text-xl font-black italic text-slate-500">Don't see your node?</p>
             <button className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-brand hover:text-white transition-all shadow-xl">Send Strategic CV</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
