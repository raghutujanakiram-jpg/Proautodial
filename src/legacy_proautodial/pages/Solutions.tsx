
import React, { useState } from 'react';
import AIImage from '../components/AIImage';
import { AppView } from '../types';

interface SolutionsProps {
  onNavigate: (view: AppView) => void;
}

const Solutions: React.FC<SolutionsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Managed Dialers');

  const categories = {
    "Managed Dialers": [
      { label: 'Cloud Hosting Basic', view: AppView.MANAGED_HOSTING, icon: 'fa-cloud', desc: 'Managed node with 4 vCPU / 8GB RAM. Perfect for small teams.' },
      { label: 'Cloud Hosting Pro', view: AppView.MANAGED_HOSTING, icon: 'fa-server', desc: '6 vCPU / 12GB RAM instance optimized for 25+ agents.' },
      { label: 'Enterprise Cluster', view: AppView.MANAGED_HOSTING, icon: 'fa-network-wired', desc: 'Multi-server architecture with load balancing and failover.' },
      { label: 'Robo-Dialer Node', view: AppView.ROBO_DIALER, icon: 'fa-bullhorn', desc: 'Broadcast mass notifications with zero agent interaction required.' },
    ],
    "Vicidial Mastery": [
      { label: 'Vicidial Installation', view: AppView.VICIDIAL_MASTERY, icon: 'fa-headset', desc: 'Professional setup of v9/v11 clusters with custom dialplans.' },
      { label: 'White-Label Branding', view: AppView.VICIDIAL_MASTERY, icon: 'fa-palette', desc: 'Complete UI skinning and corporate identity integration.' },
      { label: 'Agent Training Node', view: AppView.VICIDIAL_MASTERY, icon: 'fa-graduation-cap', desc: 'Strategic coaching for supervisors and high-velocity agents.' },
      { label: 'Carrier Integration', view: AppView.VICIDIAL_MASTERY, icon: 'fa-signal-stream', desc: 'Optimization for Plivo, Twilio, and global VoIP endpoints.' },
    ],
    "Call Center Flows": [
      // Fixing error: Property 'OUTBOUND_DIALER' does not exist on type 'typeof AppView'. Changed to AUTO_DIALER.
      { label: 'Outbound High-Velocity', view: AppView.AUTO_DIALER, icon: 'fa-bolt', desc: 'Predictive algorithms to maximize talk time and closings.' },
      { label: 'Inbound Reactive Flow', view: AppView.VIRTUAL_CALL_CENTER, icon: 'fa-phone-arrow-down-left', desc: 'Intelligent IVR and ACD routing for support environments.' },
      { label: 'Blended Hub', view: AppView.VIRTUAL_CALL_CENTER, icon: 'fa-layer-group', desc: 'Unified agents handling both inbound support and outbound sales.' },
      { label: 'Virtual Infrastructure', view: AppView.VIRTUAL_PHONE_SYSTEM, icon: 'fa-microchip', desc: 'Zero-hardware telephony accessible from any global browser.' },
    ],
    "Tech Personnel": [
      { label: 'Hourly Support Node', view: AppView.HOURLY_SUPPORT, icon: 'fa-clock', desc: 'Instant tactical support for server bugs and configuration fixes.' },
      { label: 'Dedicated Architect', view: AppView.DEDICATED_TECH, icon: 'fa-user-gear', desc: 'Permanent solution architect assigned to your enterprise account.' },
      { label: 'Migration Specialist', view: AppView.SERVICES, icon: 'fa-truck-fast', desc: 'FREE migration services from legacy providers to Proautodial.' },
      { label: 'Ethics & Compliance', view: AppView.RESOURCES, icon: 'fa-shield-check', desc: 'Consulting on DNC compliance and global regulatory standards.' },
    ]
  };

  return (
    <div className="pt-24 animate-fade-in transition-all duration-500 bg-slate-50 dark:bg-slate-950">
      
      {/* Dynamic Header Section */}
      <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[140px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20 mx-auto">
             Strategic Operational Architectures
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">Proautodial <span className="text-gradient not-italic">Solutions.</span></h1>
          <p className="text-2xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed">
            From managed cloud clusters to legacy Vicidial mastery, we provide the world's most robust hybrid telephony stack.
          </p>
        </div>
      </section>

      {/* Main Solutions Hub */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:rotate-6 transition-transform duration-[2s]">
               <i className="fas fa-server text-[20rem] text-brand"></i>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-16 relative z-10">
              {/* Sidebar Category Selectors */}
              <div className="lg:col-span-4 space-y-4">
                 {Object.keys(categories).map((cat) => (
                   <button 
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`w-full text-left px-8 py-6 rounded-[2rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-all duration-500 border ${activeTab === cat ? 'bg-brand/5 text-brand border-brand shadow-xl scale-105' : 'bg-slate-50 dark:bg-slate-950 text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                   >
                     {cat} <i className={`fas fa-arrow-right text-[10px] transition-transform ${activeTab === cat ? 'translate-x-1' : ''}`}></i>
                   </button>
                 ))}
              </div>

              {/* Dynamic Content Grid */}
              <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
                 {categories[activeTab as keyof typeof categories].map((item, i) => (
                   <button 
                    key={i}
                    onClick={() => onNavigate(item.view)}
                    className="flex flex-col gap-6 p-10 bg-slate-50 dark:bg-slate-950 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-brand transition-all text-left group/item shadow-sm hover:shadow-2xl"
                   >
                      <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center text-3xl group-hover/item:bg-brand group-hover/item:text-white transition-all shadow-md">
                         <i className={`fas ${item.icon}`}></i>
                      </div>
                      <div className="space-y-3">
                         <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.label}</h4>
                         <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[9px] font-black uppercase text-brand tracking-widest flex items-center gap-2 group-hover/item:gap-4 transition-all">
                        Technical Specs <i className="fas fa-arrow-right"></i>
                      </div>
                   </button>
                 ))}
              </div>
            </div>

            {/* Tactical CTA Bar */}
            <div className="mt-20 p-10 bg-slate-900 dark:bg-slate-950 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-brand/20 relative overflow-hidden group/cta shadow-2xl">
              <div className="absolute inset-0 bg-brand opacity-0 group-hover/cta:opacity-5 transition-opacity"></div>
              <div className="relative z-10 space-y-2">
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight">Need a Dedicated Technical Person?</h3>
                 <p className="text-slate-400 text-sm font-medium">Assign a permanent architect to your node for zero-downtime operations.</p>
              </div>
              <button onClick={() => onNavigate(AppView.DEDICATED_TECH)} className="px-12 py-5 bg-brand text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all relative z-10 border border-brand/20">Assign Personnel</button>
            </div>
          </div>
        </div>
      </section>

      {/* Managed Hosting Tier Section */}
      <section className="py-32 px-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
         <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-4">
               <h2 className="text-4xl font-black dark:text-white uppercase tracking-tighter">Managed <span className="text-brand">Dialer Hosting</span></h2>
               <p className="text-slate-500 font-medium">Enterprise uptime with local India & International billing.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-10">
               {[
                 { name: 'Managed Dialer S', price: '₹4,999', specs: ['4 vCPU / 8GB RAM', 'Managed OS & Backups', '1 Public IP Node', 'Standard Firewall'] },
                 { name: 'Managed Dialer M', price: '₹14,999', specs: ['6 vCPU / 12GB RAM', 'Load Balanced Uplink', 'Daily Data Snapshots', 'Priority Tech Access'], popular: true },
                 { name: 'Managed Dialer L', price: '₹24,999', specs: ['8 vCPU / 16GB RAM', 'Custom Dynamic Firewall', 'Hybrid Neural Sync', 'Dedicated Tech assigned'] }
               ].map((plan, i) => (
                 <div key={i} className={`p-12 rounded-[4rem] border transition-all duration-700 ${plan.popular ? 'bg-slate-950 border-brand shadow-2xl scale-105 relative z-10' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'}`}>
                    <h3 className={`text-xl font-black uppercase tracking-widest mb-6 ${plan.popular ? 'text-white' : 'dark:text-white'}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-10">
                       <span className={`text-5xl font-black ${plan.popular ? 'text-brand' : 'text-slate-900 dark:text-white'}`}>{plan.price}</span>
                       <span className="text-slate-500 font-black text-[10px] uppercase">/ Monthly</span>
                    </div>
                    <ul className="space-y-6 flex-1 mb-12">
                       {plan.specs.map(s => (
                         <li key={s} className="flex items-center gap-4 text-xs font-bold text-slate-500">
                           <i className="fas fa-circle-check text-brand"></i> {s}
                         </li>
                       ))}
                    </ul>
                    <button className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${plan.popular ? 'bg-brand text-white shadow-xl' : 'bg-slate-900 text-white hover:bg-brand'}`}>Provision Node</button>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Final Tactical CTA */}
      <section className="py-40 relative overflow-hidden bg-brand">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase italic">Scale your <br /> Excellence.</h2>
          <p className="text-xl text-white/80 font-bold uppercase tracking-widest max-w-2xl mx-auto">Access 24/7 dedicated tactical support for Proautodial Enterprise accounts.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <button onClick={() => onNavigate(AppView.BOOK_DEMO)} className="px-16 py-7 bg-slate-950 text-white rounded-[2.5rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-black/40">Request Poc Node</button>
            <button onClick={() => onNavigate(AppView.CONTACT)} className="px-16 py-7 bg-white text-brand rounded-[2.5rem] font-black text-xl hover:bg-slate-50 transition-all shadow-2xl">Talk to Architect</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
