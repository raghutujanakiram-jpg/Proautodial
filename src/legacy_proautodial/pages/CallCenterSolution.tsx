
import React from 'react';
import AIImage from '../components/AIImage';
import { AppView } from '../types';

interface CallCenterSolutionProps {
  onNavigate: (view: AppView) => void;
}

const CallCenterSolution: React.FC<CallCenterSolutionProps> = ({ onNavigate }) => {
  const coreFeatures = [
    {
      title: "Omnichannel Synergy",
      desc: "Seamless integration of Voice, SMS, Email, and WhatsApp into a single unified agent node.",
      icon: "fa-layer-group",
      benefits: ["Unified Identity", "History Persistence", "Cross-Platform Routing"]
    },
    {
      title: "Intelligent IVR",
      desc: "Neural-powered speech recognition that detects intent before a human even says 'hello'.",
      icon: "fa-brain-circuit",
      benefits: ["98% Intent Accuracy", "Self-Service Loops", "Dynamic Greeting Nodes"]
    },
    {
      title: "Global Distribution",
      desc: "Deploy regional nodes anywhere. Ensure sub-300ms latency for agents from Hyderabad to Seattle.",
      icon: "fa-earth-americas",
      benefits: ["Edge Computing", "Local Gateway Sync", "Carrier-Grade SLAs"]
    }
  ];

  const modules = [
    { title: "Standard Cloud Center", category: "Efficiency", items: ["Basic ACD Routing", "WebRTC Softphone", "Real-time Reporting", "Call Recording"] },
    { title: "Neural Enterprise Center", category: "Performance", items: ["Gemini AI Intent", "Sentiment Tracking", "Automated QA", "CRM Deep Link"] },
    { title: "Specialized Node Center", category: "Compliance", items: ["DNC Guardrail", "GDPR/TCPA Module", "Custom Scripting", "White-Label UI"] }
  ];

  return (
    <div className="pt-24 animate-fade-in bg-white dark:bg-[#0B0E14] transition-all duration-500">
      
      {/* Hero Section: Cloopen Aesthetic */}
      <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden bg-slate-950 text-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[160px] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl glass border border-brand/20 text-brand text-[10px] font-black uppercase tracking-[0.4em]">
              Strategic Omni-Channel Hub
            </div>
            <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.9] tracking-tighter uppercase italic">
              Future-Proof <br /> <span className="text-gradient not-italic">Call Center.</span>
            </h1>
            <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">
              Proautodial Telephony Services delivers a high-performance, neural-native communication layer designed for the world's most demanding enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button 
                onClick={() => onNavigate(AppView.BOOK_DEMO)}
                className="px-12 py-6 bg-brand text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all"
              >
                Provision POC Node
              </button>
              <button 
                onClick={() => onNavigate(AppView.CONTACT)}
                className="px-12 py-6 bg-white/5 border border-white/10 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                Contact Sales
              </button>
            </div>
          </div>
          
          <div className="relative group perspective-1000">
             <div className="absolute -inset-10 bg-brand/20 rounded-[4rem] blur-[100px] group-hover:bg-brand/30 transition-all duration-1000"></div>
             <div className="relative rounded-[4.5rem] overflow-hidden border-[12px] border-white/5 glossy-glow shadow-2xl transform group-hover:rotate-1 transition-transform duration-[3s]">
                <AIImage 
                  prompt="Futuristic high-tech command center interface, holographic agent metrics, cinematic blue and coral lighting, professional corporate aesthetic, 8k render" 
                  className="h-[650px] w-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                   <div>
                     <p className="text-xs font-black uppercase text-brand tracking-[0.4em] mb-2">Live Status</p>
                     <p className="text-2xl font-black italic">Operational Excellence.</p>
                   </div>
                   <div className="flex -space-x-4">
                      {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-xl" alt="Agent" />)}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Feature Section: Intelligent Routing & Management */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-32">
             <h2 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter leading-none">Intelligent <span className="text-brand italic">Interaction</span> Layers.</h2>
             <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">Integrated architecture providing full-lifecycle communication management.</p>
             <div className="w-24 h-1 bg-brand mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {coreFeatures.map((f, i) => (
              <div key={i} className="group p-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[4rem] hover:border-brand/40 transition-all duration-700 shadow-sm hover:shadow-2xl hover:-translate-y-4">
                 <div className="w-20 h-20 bg-brand/10 text-brand rounded-[2rem] flex items-center justify-center text-4xl mb-12 shadow-sm group-hover:bg-brand group-hover:text-white transition-all shadow-brand/10">
                    <i className={`fas ${f.icon}`}></i>
                 </div>
                 <h3 className="text-3xl font-black dark:text-white leading-tight mb-6">{f.title}</h3>
                 <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">{f.desc}</p>
                 <ul className="space-y-4">
                    {f.benefits.map(b => (
                      <li key={b} className="flex items-center gap-4 text-xs font-black uppercase text-slate-400 dark:text-slate-500">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> {b}
                      </li>
                    ))}
                 </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Overview: Product Matrix */}
      <section className="py-40 bg-slate-50 dark:bg-slate-950/50 border-y border-slate-100 dark:border-slate-900 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand">Technical Prowess</h3>
                  <h2 className="text-5xl md:text-6xl font-black dark:text-white tracking-tighter leading-none italic uppercase">Beyond <br /><span className="text-gradient not-italic">Standard.</span></h2>
               </div>
               <p className="text-xl text-slate-500 font-medium leading-relaxed">
                 From lightweight startups to massive global clusters, our Call Center solutions scale with your ambition. Operated by <strong>Proautodial Telephony Services Pvt Ltd</strong>, we guarantee consistency across every packet.
               </p>
               <div className="grid grid-cols-2 gap-8 pt-6 border-t dark:border-slate-800">
                  <div>
                    <p className="text-4xl font-black text-brand tracking-tighter">99.99%</p>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">Uptime Node Cluster</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-brand tracking-tighter">Under 350ms</p>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">Neural Intent Sync</p>
                  </div>
               </div>
            </div>
            <div className="grid gap-6">
               {modules.map((m, i) => (
                 <div key={i} className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all group flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 text-center md:text-left">
                       <p className="text-[9px] font-black uppercase tracking-widest text-brand bg-brand/5 px-3 py-1 rounded-full inline-block">{m.category}</p>
                       <h4 className="text-2xl font-black dark:text-white">{m.title}</h4>
                       <div className="flex flex-wrap justify-center md:justify-start gap-4">
                          {m.items.map(item => <span key={item} className="text-[10px] font-bold text-slate-500 uppercase">{item} •</span>)}
                       </div>
                    </div>
                    <button onClick={() => onNavigate(AppView.CONTACT)} className="w-14 h-14 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl flex items-center justify-center hover:bg-brand hover:text-white transition-all shadow-xl active:scale-90">
                       <i className="fas fa-arrow-right"></i>
                    </button>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Node Visual (Abstract Network) */}
      <section className="py-40 px-6 overflow-hidden bg-white dark:bg-[#0B0E14] relative">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
         <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="absolute -inset-10 bg-brand/5 blur-[100px] rounded-full"></div>
               <div className="relative rounded-[4rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl group/img">
                  <AIImage 
                    prompt="Abstract glowing network of interconnected nodes, orange and blue neural light trails, global connectivity theme, high fidelity 3D" 
                    className="h-[550px] w-full object-cover group-hover:scale-110 transition-transform duration-[3s]" 
                  />
                  <div className="absolute top-10 left-10 p-6 glass rounded-3xl animate-float">
                     <p className="text-[10px] font-black uppercase text-brand mb-1">Node Synchronization</p>
                     <p className="text-lg font-black dark:text-white">Active in 220+ Regions</p>
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2 space-y-10">
               <h3 className="text-5xl font-black tracking-tighter uppercase italic leading-none">The <span className="text-gradient not-italic">Global Fabric.</span></h3>
               <p className="text-xl text-slate-500 font-medium leading-relaxed italic">"Our architecture bridges legacy clusters like Vicidial with modern AI, ensuring your global team is always connected via the most optimal routing path."</p>
               <ul className="space-y-6">
                  {[
                    { title: "Direct Carrier Uplink", desc: "Tier-1 global voice termination with no middle-man latency." },
                    { title: "Zero-Downtime Migration", desc: "Switch your existing center to Proautodial with FREE tactical engineering." },
                    { title: "Deterministic Compliance", desc: "Automatic TCPA/GDPR filtering nodes enabled at the gateway." }
                  ].map(li => (
                    <li key={li.title} className="flex gap-6 items-start group">
                       <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-all shadow-sm"><i className="fas fa-check"></i></div>
                       <div>
                          <h4 className="text-lg font-black dark:text-white uppercase tracking-tight">{li.title}</h4>
                          <p className="text-sm text-slate-500 font-medium mt-1">{li.desc}</p>
                       </div>
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>

      {/* CTA: Provision Cluster */}
      <section className="py-40 bg-brand text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
           <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">Scale your <br /> Excellence.</h2>
           <p className="text-xl text-white/90 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
             Deploy your custom Call Center cluster at www.proautodial.in — Validated by 1100+ global nodes.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
             <button 
                onClick={() => onNavigate(AppView.BOOK_DEMO)}
                className="px-16 py-8 bg-slate-950 text-white rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl shadow-black/40"
             >
                Initialize POC Node
             </button>
             <button 
                onClick={() => onNavigate(AppView.CONTACT)}
                className="px-16 py-8 bg-white text-brand rounded-[2.5rem] font-black text-2xl hover:bg-slate-50 transition-all shadow-2xl"
             >
                Consult Architect
             </button>
           </div>
        </div>
      </section>

    </div>
  );
};

export default CallCenterSolution;
