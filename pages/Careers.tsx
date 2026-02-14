
import React from 'react';

const Careers: React.FC = () => {
  const openings = [
    { title: 'Neural Designer', type: 'Full-Time', location: 'Hyderabad / Remote' },
    { title: 'VoIP Protocol Lead', type: 'Full-Time', location: 'Remote' },
    { title: 'AI Ethics & Content Specialist', type: 'Contract', location: 'Remote' }
  ];

  return (
    <div className="pt-40 pb-32 px-6 bg-slate-950 text-white min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-12 sticky top-40">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20">Recruiting Pioneers</div>
           <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85]">Forge <br /> the <br /> <span className="text-brand">Future.</span></h1>
           <p className="text-2xl text-slate-400 font-medium max-w-md">We value innovation, collaboration, and rapid growth. Join a team building the communication layer of the future.</p>
        </div>

        <div className="space-y-8">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-10">Active Neural Openings</h3>
           {openings.map((job, i) => (
             <div key={i} className="group p-10 bg-slate-900 border border-slate-800 rounded-[3rem] hover:border-brand/40 transition-all cursor-pointer flex justify-between items-center relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="space-y-2 relative z-10">
                 <h4 className="text-2xl font-black group-hover:text-brand transition-colors">{job.title}</h4>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{job.type} • {job.location}</p>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all group-hover:rotate-12">
                 <i className="fas fa-chevron-right"></i>
               </div>
             </div>
           ))}
           
           <div className="p-16 border-2 border-dashed border-slate-800 rounded-[4rem] text-center space-y-6 group hover:border-brand/50 transition-all">
              <p className="text-xl font-black italic text-slate-500">Don't see your node?</p>
              <p className="text-sm text-slate-600 font-medium">We're always looking for talented individuals for spontaneous collaboration.</p>
              <button className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand hover:text-white transition-all shadow-xl">Apply Spontaneously</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
