
import React from 'react';
import { AppView } from '../types';
import AIImage from '../components/AIImage';
import ClientWall from '../components/ClientWall';
import Features from '../components/Features';
import IndustriesSection from '../components/IndustriesSection';

interface HomeProps {
  onNavigate: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
      {/* BRS 6.1.1: Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20">
              <span className="w-2 h-2 bg-brand rounded-full animate-ping"></span>
              The Future of Telephony
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] dark:text-white">
              AI-Powered <br /> Contact <br /> <span className="text-gradient">Mastery.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
              Transform your customer interactions with ProAutoDial's AI Voice Agents while we continue supporting the global open-source community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate(AppView.AI_VOICE_AGENTS)}
                className="px-10 py-5 bg-brand text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-brand/40 hover:brightness-110 transition-all active:scale-95"
              >
                Request AI Demo
              </button>
              <button 
                onClick={() => onNavigate(AppView.SOLUTIONS)}
                className="px-10 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Explore Solutions
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 glossy-glow">
              <AIImage 
                prompt="Futuristic clean corporate AI command center, coral and slate colors, professional aesthetic, 3D render, high-end" 
                className="w-full h-[600px] group-hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BRS 6.1.4: Open Source Roots (Gratitude Section) */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950/50 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">Gratitude to our Roots</h3>
            <h2 className="text-4xl font-black dark:text-white tracking-tight">Supporting the Open-Source Community</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center grayscale hover:grayscale-0 transition-all duration-700 opacity-50 hover:opacity-100">
             {['VICIdial', 'Asterisk', 'GoAutoDial', 'FreePBX', 'Issabel'].map(brand => (
               <button 
                key={brand} 
                onClick={() => onNavigate(AppView.VICIDIAL_MASTERY)}
                className="text-2xl font-black text-slate-400 hover:text-brand transition-colors cursor-pointer"
               >
                 {brand}
               </button>
             ))}
          </div>
          <p className="text-slate-500 font-medium">Expert installation and migration services. <strong>Many services offered FREE.</strong></p>
        </div>
      </section>

      <IndustriesSection />
      <Features />
      <ClientWall />

      {/* BRS 6.1.11: Final CTA */}
      <section className="py-40 relative overflow-hidden bg-brand">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">Ready to Transform Your Call Center?</h2>
          <p className="text-xl text-white/80 font-bold uppercase tracking-widest">Deploy custom neural identities in minutes.</p>
          <div className="flex justify-center gap-6">
            <button onClick={() => onNavigate(AppView.AI_VOICE_AGENTS)} className="px-14 py-6 bg-slate-950 text-white rounded-3xl font-black text-xl hover:brightness-125 transition-all shadow-2xl">Request Demo</button>
            <button onClick={() => onNavigate(AppView.CONTACT)} className="px-14 py-6 bg-white text-brand rounded-3xl font-black text-xl hover:bg-slate-100 transition-all shadow-2xl">Talk to Sales</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
