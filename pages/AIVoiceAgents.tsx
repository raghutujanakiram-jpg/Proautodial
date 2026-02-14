
import React, { useState } from 'react';
import AIImage from '../components/AIImage';
import { AppView } from '../types';

interface AIVoiceAgentsProps {
  onNavigate?: (view: AppView) => void;
}

const AIVoiceAgents: React.FC<AIVoiceAgentsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'support'>('sales');

  const useCases = {
    sales: {
      title: "Mark: High-Velocity Outreach",
      desc: "Turn cold lists into warm pipelines with autonomous outbound dialing and intent-based qualifying.",
      features: ["Predictive Dialing Ratios", "Real-time Objection Handling", "Automated CRM Lead Scoring", "Zero-Latency Handover"],
      icon: "fa-bolt-auto"
    },
    support: {
      title: "Elicia: Empathetic Inbound",
      desc: "Handle 100% of Level-1 support calls with neural-native empathy and instant ticket resolution.",
      features: ["Natural Language IVR", "Sentiment-Based Routing", "Instant Technical Debugging", "Multilingual Support (22+ Indian Dialects)"],
      icon: "fa-headset"
    }
  };

  return (
    <div className="pt-24 animate-fade-in bg-white dark:bg-[#0B0E14] transition-all duration-500 overflow-x-hidden">
      
      {/* 1. THE VOISO-STYLE HERO: High Impact, Global Context */}
      <section className="relative min-h-[85vh] flex items-center px-6 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand/10 rounded-full blur-[180px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full glass border border-brand/20 text-brand text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
              <span className="w-2 h-2 bg-brand rounded-full"></span>
              Neural Operating System
            </div>
            <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.9] tracking-tighter uppercase text-white">
              The AI <br /> <span className="text-gradient">Engine</span> <br /> for Growth.
            </h1>
            <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">
              Scale your contact center with Gemini-powered Voice Agents that close deals and resolve tickets 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button className="px-14 py-6 bg-brand text-white rounded-2xl font-black text-xl hover:scale-105 active:scale-95 shadow-2xl shadow-brand/40 transition-all uppercase tracking-widest">
                Start Free Trial
              </button>
              <button className="px-14 py-6 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xl hover:bg-white/10 transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                <i className="fas fa-play text-xs text-brand"></i> Watch Demo
              </button>
            </div>
            <div className="pt-10 flex items-center gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Integrates with</span>
               <i className="fab fa-salesforce text-3xl text-white"></i>
               <i className="fab fa-hubspot text-3xl text-white"></i>
               <i className="fab fa-zendesk text-3xl text-white"></i>
            </div>
          </div>

          <div className="relative">
             <div className="absolute -inset-10 bg-brand/5 blur-[120px] rounded-full animate-float"></div>
             <div className="relative rounded-[4rem] overflow-hidden border-[12px] border-white/5 shadow-2xl glossy-glow group">
                <AIImage prompt="High-end Contact Center Interface with glowing 3D metrics, autonomous agent dashboard, sleek professional UI, orange and blue lighting" className="h-[600px] w-full object-cover group-hover:scale-110 transition-transform duration-[4s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                <div className="absolute top-10 left-10 p-6 glass rounded-[2rem] animate-float shadow-2xl">
                   <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg"><i className="fas fa-chart-line"></i></div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-500">Live ROI</p>
                        <p className="text-xl font-black text-emerald-500">+142%</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. THE INFRASTRUCTURE STRIP: Global Reliability */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-12 grayscale opacity-60">
            {['Tier-1 Global Carriers', '99.99% Uptime SLA', 'Sub-350ms Latency', 'GDPR/TCPA Secure', 'ISO 27001 Certified'].map(label => (
              <div key={label} className="flex items-center gap-3">
                 <i className="fas fa-shield-check text-brand"></i>
                 <span className="text-[10px] font-black uppercase tracking-widest dark:text-white">{label}</span>
              </div>
            ))}
         </div>
      </section>

      {/* 3. INTERACTIVE TABS: Sales vs Support (Voiso-Inspired Use Cases) */}
      <section className="py-40 px-6 bg-slate-50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-6xl font-black dark:text-white tracking-tighter uppercase italic">Engineered for <span className="text-brand not-italic">Closer.</span></h2>
              <div className="flex justify-center gap-4">
                 {['sales', 'support'].map((tab) => (
                   <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-brand text-white shadow-xl scale-105' : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-brand shadow-sm'}`}
                   >
                     {tab} Optimization
                   </button>
                 ))}
              </div>
           </div>

           <div className="grid lg:grid-cols-2 gap-20 items-center bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-100 dark:border-slate-800 animate-fade-in-up">
              <div className="space-y-10">
                 <div className="w-20 h-20 bg-brand/10 text-brand rounded-3xl flex items-center justify-center text-4xl shadow-sm"><i className={`fas ${useCases[activeTab].icon}`}></i></div>
                 <h3 className="text-4xl font-black dark:text-white leading-none uppercase">{useCases[activeTab].title}</h3>
                 <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{useCases[activeTab].desc}</p>
                 <ul className="space-y-5">
                    {useCases[activeTab].features.map(f => (
                      <li key={f} className="flex items-center gap-5 text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">
                         <i className="fas fa-circle-check text-brand text-xl"></i> {f}
                      </li>
                    ))}
                 </ul>
                 <button className="text-brand font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:gap-6 transition-all pt-6">
                    Technical Specifications <i className="fas fa-arrow-right"></i>
                 </button>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-10 bg-brand/5 blur-[80px] rounded-full"></div>
                 <div className="relative rounded-[3rem] overflow-hidden border-8 border-slate-50 dark:border-slate-800 shadow-2xl">
                    <AIImage prompt={`High-tech dashboard for ${activeTab} contact center, 3d render, professional`} className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. PERFORMANCE GRID: The "Voiso AI" Features */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: "Sentiment Matrix", icon: "fa-face-smile-wink", desc: "Instantly detect caller mood and pivot the conversation strategy based on neural intent.", color: "bg-amber-500" },
                { title: "Smart Transcription", icon: "fa-waveform", desc: "100% accurate, sub-second transcription of every call with automated summary generation.", color: "bg-blue-500" },
                { title: "Infinite Concurrency", icon: "fa-rocket-launch", desc: "Scale from 1 to 1,000 simultaneous calls in seconds with our cloud-native SIP cluster.", color: "bg-brand" }
              ].map((feat, i) => (
                <div key={i} className="group p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] hover:border-brand/40 transition-all duration-700 shadow-sm hover:shadow-2xl">
                   <div className={`w-16 h-16 ${feat.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-10 group-hover:rotate-12 transition-transform shadow-xl`}>
                      <i className={`fas ${feat.icon}`}></i>
                   </div>
                   <h4 className="text-2xl font-black dark:text-white uppercase tracking-tight mb-4">{feat.title}</h4>
                   <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feat.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. THE COMPARISON SECTION: Proautodial vs Legacy */}
      <section className="py-40 bg-slate-950 text-white relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-brand/30"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
               <h3 className="text-5xl font-black tracking-tighter uppercase italic leading-none">Upgrade to <br /><span className="text-gradient not-italic">Neural Power.</span></h3>
               <p className="text-xl text-slate-400 font-medium leading-relaxed">Stop wasting budget on legacy VoIP outages and human error. Proautodial AI delivers deterministic performance at 70% lower cost.</p>
               <div className="space-y-6">
                  {[
                    { label: "Neural Latency", val: "Under 350ms", icon: "fa-bolt-lightning" },
                    { label: "Intent Recognition", val: "98.4% Accuracy", icon: "fa-microchip-ai" },
                    { label: "Deployment Speed", val: "Instant Cloud Provision", icon: "fa-cloud-binary" }
                  ].map(stat => (
                    <div key={stat.label} className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
                       <div className="w-12 h-12 rounded-xl bg-brand/20 text-brand flex items-center justify-center text-xl"><i className={`fas ${stat.icon}`}></i></div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{stat.label}</p>
                          <p className="text-lg font-black">{stat.val}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-[4rem] p-12 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
               <h4 className="text-2xl font-black uppercase tracking-tight mb-12 text-center">Cost Comparison Node</h4>
               <div className="space-y-12">
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        <span>Legacy Call Center (Human)</span>
                        <span>$62,000 / mo</span>
                     </div>
                     <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-600 w-full"></div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase text-brand tracking-widest">
                        <span>Proautodial AI Node</span>
                        <span>$4,800 / mo</span>
                     </div>
                     <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-brand/20 p-0.5">
                        <div className="h-full bg-brand rounded-full w-[8%] shadow-[0_0_15px_rgba(219,93,67,0.6)]"></div>
                     </div>
                  </div>
                  <div className="pt-10 border-t border-slate-800 text-center">
                     <p className="text-4xl font-black text-emerald-500">92% Savings</p>
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-2">Verified Enterprise Benchmark</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. FINAL VOISO-STYLE CTA */}
      <section className="py-40 bg-brand text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
           <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">Empower your <br /> Enterprise.</h2>
           <p className="text-xl text-white/90 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
             Join 1,100+ global industry architects leveraging the Proautodial neural fabric.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
             <button className="px-16 py-8 bg-slate-950 text-white rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl shadow-black/40">
                Book Strategic Demo
             </button>
             <button className="px-16 py-8 bg-white text-brand rounded-[2.5rem] font-black text-2xl hover:bg-slate-50 transition-all shadow-2xl">
                Consult Architect
             </button>
           </div>
        </div>
      </section>

    </div>
  );
};

export default AIVoiceAgents;
