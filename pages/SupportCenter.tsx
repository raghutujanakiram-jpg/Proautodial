
import React, { useState } from 'react';
import { AppView } from '../types';
import { getFastResponse } from '../services/geminiService';

interface SupportCenterProps {
  onNavigate: (view: AppView) => void;
}

const SupportCenter: React.FC<SupportCenterProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const res = await getFastResponse(`As the Proautodial Strategic Support Architect, provide a technical 1-sentence solution for: "${searchQuery}". Focus on Vicidial multi-server clusters, Goautodial v4 UI, Asterisk AGI, or MariaDB optimization.`);
      setAiAnswer(res.replace('[⚡ Flash Lite Response]: ', ''));
    } catch (err) {
      setAiAnswer("Connecting to technical node... please specify if your query relates to Vicidial partitioning, Goautodial v4 WebRTC, or carrier SIP authentication.");
    } finally {
      setIsSearching(false);
    }
  };

  const categories = [
    {
      title: 'Vicidial Mastery',
      icon: 'fa-headset',
      desc: 'v9/v11 Installation, Multi-Server Clustering & DB Tuning',
      folders: ['MariaDB Performance Buffering', 'HTTP/HTTPS Secure Agent Link', 'Archive & Backup Automation', 'Dynamic List Loading Protocol']
    },
    {
      title: 'Goautodial Upgrades',
      icon: 'fa-rocket-launch',
      desc: 'Migrating v2/v3 to Secure v4/v5 Responsive Nodes',
      folders: ['v4 UI Skinning & Branding', 'Just-Dial Configuration', 'Integrated WebPhone Debugging', 'SIP Trunk LCR Optimization']
    },
    {
      title: 'Asterisk Logic',
      icon: 'fa-asterisk',
      desc: 'Custom AGI Scripts, IVR Design & SIP Protocol Handshakes',
      folders: ['Custom Dialplan Programming', 'MeetMe/ConfBridge Setup', 'Failover Trunking Logic', 'NAT & Firewall Port Mapping']
    },
    {
      title: 'CRM Strategy',
      icon: 'fa-link-horizontal',
      desc: 'Integrating vTiger, Zoho, & Salesforce with Dialer Nodes',
      folders: ['API Data Synchronization', 'WebHook Event Triggers', 'Click-to-Dial Integration', 'Lead Status Mapping']
    },
    {
      title: 'Global Telephony',
      icon: 'fa-tower-broadcast',
      desc: 'SIP Termination, GSM Gateways & Bandwidth Management',
      folders: ['Tier-1 Carrier Provisioning', 'Dinstar/GoIP Hardware Setup', 'GSM to SIP Bridge Config', 'Traffic Encryption (TLS/SRTP)']
    },
    {
      title: 'Neural Lab Support',
      icon: 'fa-brain-circuit',
      desc: 'Integrating Proautodial AI Voice Agents with Legacy Hubs',
      folders: ['AI Intent Handshake Setup', 'Transcription Stream Link', 'Neural Identity Synthesis', 'Autonomous Agent Feedback Loops']
    }
  ];

  return (
    <div className="pt-24 animate-fade-in bg-slate-50 dark:bg-slate-950 min-h-screen transition-all duration-500 selection:bg-brand/30">
      
      {/* Hero Section with Search */}
      <section className="relative py-32 px-6 bg-slate-950 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20 mx-auto">
             Enterprise Knowledge Node
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic">Support <span className="text-gradient not-italic">Center.</span></h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">Expert technical documentation for the world's most robust telephony clusters.</p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
            <i className={`fas ${isSearching ? 'fa-circle-notch fa-spin text-brand' : 'fa-search text-slate-600'} absolute left-6 top-1/2 -translate-y-1/2 text-lg group-focus-within:text-brand transition-colors`}></i>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Vicidial DB locks, Goautodial WebRTC, or AGI scripts..."
              className="w-full bg-slate-900 border border-slate-800 rounded-[2rem] pl-16 pr-24 py-6 text-white font-bold outline-none focus:border-brand/40 focus:ring-8 focus:ring-brand/5 shadow-2xl transition-all"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-3 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">Resolve</button>
          </form>

          {aiAnswer && (
            <div className="max-w-2xl mx-auto p-8 bg-brand/5 border border-brand/20 rounded-[2.5rem] animate-fade-in-up text-left relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-brand"></div>
               <div className="flex items-center gap-3 mb-4">
                 <i className="fas fa-microchip-ai text-brand text-sm"></i>
                 <span className="text-[11px] font-black uppercase tracking-widest text-brand">Strategic Support Logic</span>
               </div>
               <p className="text-base text-slate-200 font-bold italic leading-relaxed">"{aiAnswer}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <div key={i} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 text-brand group-hover:rotate-12 group-hover:opacity-10 transition-all duration-700">
                  <i className={`fas ${cat.icon} text-8xl`}></i>
               </div>
               
               <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center text-2xl shadow-sm border border-brand/20 group-hover:bg-brand group-hover:text-white transition-all">
                    <i className={`fas ${cat.icon}`}></i>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight mb-2">{cat.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{cat.desc}</p>
                  </div>

                  <ul className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                     {cat.folders.map(folder => (
                       <li key={folder} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-brand cursor-pointer transition-colors group/item">
                          <i className="fas fa-folder-open text-[10px] text-slate-700 group-hover/item:text-brand transition-colors"></i> {folder}
                       </li>
                     ))}
                  </ul>

                  <button className="text-brand font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group/btn pt-4 hover:gap-5 transition-all">
                    Access Documentation <i className="fas fa-arrow-right"></i>
                  </button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promoted Technical Manuals */}
      <section className="py-24 bg-slate-100 dark:bg-slate-950/50 px-6 border-y border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 space-y-6">
             <h3 className="text-3xl font-black dark:text-white tracking-tighter">Strategic <br /><span className="text-brand">Engineering</span> Manuals</h3>
             <p className="text-slate-500 font-medium">Expert-curated guides for multi-server Vicidial setups, Goautodial migrations, and database partitioning.</p>
             <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-brand hover:text-white transition-all">View All Manuals</button>
          </div>
          <div className="flex-1 grid sm:grid-cols-2 gap-8">
             {[
               { title: 'Scaling Vicidial Clusters to 1000+ Agents', icon: 'fa-server' },
               { title: 'Migrating Goautodial v2 to v4 Secure Nodes', icon: 'fa-rocket' },
               { title: 'High-Capacity MariaDB Clustering for VOIP', icon: 'fa-database' },
               { title: 'WebRTC SSL Termination for Dialer UI', icon: 'fa-shield-halved' }
             ].map((art, i) => (
               <div key={i} className="flex items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-brand/30 cursor-pointer shadow-sm transition-all group">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-950 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-brand transition-colors">
                     <i className={`fas ${art.icon} text-xl`}></i>
                  </div>
                  <span className="text-sm font-bold dark:text-slate-200 leading-tight group-hover:text-brand transition-colors">{art.title}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final Tactical CTA */}
      <section className="py-40 relative overflow-hidden bg-brand text-white">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
         <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">Need Strategic <br /> Support?</h2>
            <p className="text-xl text-white/90 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto">Access 24/7 dedicated tactical support for Proautodial Enterprise accounts.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <button onClick={() => onNavigate(AppView.CONTACT)} className="px-16 py-7 bg-slate-950 text-white rounded-[2.5rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-black/40">Submit Tactical Ticket</button>
              <button className="px-16 py-7 bg-white text-brand rounded-[2.5rem] font-black text-xl hover:bg-slate-50 transition-all shadow-2xl">Consult an Architect</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default SupportCenter;
