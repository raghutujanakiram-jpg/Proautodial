
import React from 'react';
import AIImage from './AIImage';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-48 pb-40 px-6 overflow-hidden dark:bg-[#0B0E14] transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
        <div className="text-center lg:text-left space-y-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl glass text-brand text-[10px] font-black uppercase tracking-[0.3em] shadow-sm border-brand/20">
            <span className="w-2.5 h-2.5 bg-brand rounded-full animate-ping"></span>
            Global Enterprise Hub
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.95] tracking-tighter">
            Smart Dialing <br />
            <span className="text-gradient">Redefined.</span>
          </h1>
          
          <p className="text-2xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Fusion of enterprise-grade VoIP with the world's most capable Gemini AI. Built for the modern closer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
            <button 
              onClick={onStart}
              className="group px-12 py-6 bg-brand text-white rounded-[1.5rem] font-black text-xl shadow-[0_25px_50px_-10px_rgba(219,93,67,0.4)] hover:shadow-[0_30px_60px_-10px_rgba(219,93,67,0.6)] transition-all hover:-translate-y-2 flex items-center justify-center gap-4 active:scale-95"
            >
              Start Free Demo
              <i className="fas fa-arrow-right text-sm transition-transform group-hover:translate-x-2"></i>
            </button>
            <button className="px-12 py-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-[1.5rem] font-black text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
              View Solutions
            </button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-12 pt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             {['google', 'aws', 'microsoft', 'salesforce'].map(p => (
               <i key={p} className={`fab fa-${p} text-3xl`}></i>
             ))}
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative z-10 group">
            {/* AI Generated Main Visual */}
            <div className="relative rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] border-[12px] border-white dark:border-slate-800 transition-transform duration-1000 group-hover:scale-[1.01]">
               <AIImage 
                 prompt="Futuristic clean corporate AI command center, cinematic lighting, coral and slate colors, enterprise dashboard interface, professional aesthetic, high-end 3D render"
                 className="w-full h-[650px] object-cover group-hover:scale-110 transition-transform duration-[2s]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand/50 via-transparent to-transparent opacity-40"></div>
            </div>

            {/* Glossy Infographic Cards */}
            <div className="absolute -top-12 -right-8 glass p-8 rounded-[2.5rem] shadow-2xl animate-float z-20 max-w-[220px] glossy-glow">
               <div className="flex items-center gap-4 mb-3">
                 <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                   <i className="fas fa-arrow-trend-up text-sm"></i>
                 </div>
                 <span className="text-xl font-black dark:text-white">+62%</span>
               </div>
               <p className="text-[11px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest leading-tight">Growth in <br/>Agent Efficiency</p>
            </div>

            <div className="absolute -bottom-10 -left-12 glass p-8 rounded-[2.5rem] shadow-2xl animate-float z-20 max-w-[280px] glossy-glow" style={{ animationDelay: '2s' }}>
               <div className="flex items-center gap-5">
                 <div className="flex -space-x-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-12 h-12 rounded-2xl border-2 border-white dark:border-slate-800 overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                     </div>
                   ))}
                 </div>
                 <div>
                   <p className="text-base font-black dark:text-white">Active Global Nodes</p>
                   <p className="text-[10px] text-brand font-black uppercase tracking-widest">Enterprise Ready</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
