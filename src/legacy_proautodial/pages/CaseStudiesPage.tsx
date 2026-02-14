
import React from 'react';
import AIImage from '../components/AIImage';
import { CASE_STUDIES, CaseStudy } from '../data/caseStudies';

const CaseStudiesPage: React.FC = () => {
  const cases: CaseStudy[] = CASE_STUDIES;

  return (
    <div className="pt-24 animate-fade-in transition-all duration-500 bg-slate-50 dark:bg-[#0B0E14]">
      {/* Header Section */}
      <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20 mx-auto">
             Validated Tactical Implementations
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">Customer <span className="text-gradient italic">Success.</span></h1>
          <p className="text-2xl text-slate-400 font-medium max-w-4xl leading-relaxed">
            From Ranigunj to Australia: ProAutoDial architecture powers domestic hubs and international corridors with 99%+ uptime.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {cases.map((c, i) => (
            <div key={i} className={`grid lg:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`space-y-10 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                   <div className="w-40 h-20 rounded-[2rem] bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center p-4 border border-slate-100 dark:border-slate-800 overflow-hidden group/logo">
                      <img 
                        src={c.logoUrl} 
                        alt={`${c.company} logo`} 
                        className="max-w-full max-h-full object-contain grayscale group-hover/logo:grayscale-0 transition-all duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.company)}&background=DB5D43&color=fff`;
                        }}
                      />
                   </div>
                   <div>
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">{c.company}</h2>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand bg-brand/10 px-3 py-1 rounded-full">{c.scenario}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"><i className="fas fa-location-dot mr-1"></i> {c.location}</span>
                      </div>
                   </div>
                </div>
                
                <div className="p-10 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden group/card">
                   <div className="absolute top-0 right-0 p-10 text-brand/5 group-hover/card:text-brand/10 transition-colors">
                     <i className={`fas ${c.icon} text-8xl`}></i>
                   </div>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="px-4 py-2 bg-brand text-white rounded-full text-xs font-black shadow-lg shadow-brand/30">
                        {c.metric}
                      </div>
                   </div>
                   <p className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight mb-4">{c.description}</p>
                   <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic text-lg mb-8">"{c.story}"</p>
                   
                   <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Strategic Coordination</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{c.coordination}</p>
                   </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand hover:text-white transition-all shadow-xl active:scale-95">
                    View Technical Architecture
                  </button>
                  {c.website !== "#" && (
                    <a 
                      href={c.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-10 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:border-brand hover:text-brand transition-all shadow-sm flex items-center justify-center gap-3"
                    >
                      Visit Client <i className="fas fa-external-link text-[10px]"></i>
                    </a>
                  )}
                </div>
              </div>
              
              <div className={`relative ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                 <div className="absolute -inset-10 bg-brand/5 blur-[100px] rounded-full"></div>
                 <div className="relative rounded-[4rem] overflow-hidden glossy-glow border-8 border-white dark:border-slate-800 shadow-2xl group/img">
                   <AIImage 
                    prompt={c.prompt} 
                    className="w-full h-[600px] object-cover group-hover/img:scale-105 transition-transform duration-[3s]" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-12">
                      <p className="text-white text-xs font-black uppercase tracking-widest">Operational Visualization • {c.company}</p>
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Impact CTA */}
      <section className="py-40 relative overflow-hidden bg-brand text-white">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
         <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">Join the <br /> Excellence.</h2>
            <p className="text-xl text-white/90 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto">Scaling your Story with 1100+ global industry architects.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <button className="px-16 py-7 bg-slate-950 text-white rounded-[2.5rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-black/40">Start Transformation</button>
              <button className="px-16 py-7 bg-white text-brand rounded-[2.5rem] font-black text-xl hover:bg-slate-50 transition-all shadow-2xl">Talk to Architect</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
