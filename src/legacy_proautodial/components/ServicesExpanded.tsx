
import React from 'react';

const ServicesExpanded: React.FC = () => {
  const services = [
    {
      title: 'Vicidial Excellence',
      desc: 'Expert optimization and hosting for the world\'s leading open-source contact center suite. We support v9 through v11 clusters.',
      icon: 'fa-headset',
      features: ['Cluster Installation', 'Agent Training', 'Predictive Tuning', 'List Management']
    },
    {
      title: 'Goautodial v4/v5',
      desc: 'Complete migration and upgrade paths for Goautodial users. Modernize your UI and database architecture with zero downtime.',
      icon: 'fa-rocket',
      features: ['Legacy Migrations', 'Custom UI Skinning', 'WebRTC Softphones', 'v4 Performance Tuning']
    },
    {
      title: 'Neural AI Bridge',
      desc: 'Integration of Proautodial AI voice agents (Elicia & Mark) with your existing legacy open-source telephony clusters.',
      icon: 'fa-brain-circuit',
      features: ['Intent Recognition', 'Sub-350ms Latency', 'Autonomous Closing', 'CRM Sync']
    },
    {
      title: 'Managed VoIP Hosting',
      desc: 'Dedicated cloud infrastructure optimized for SIP traffic and massive concurrent dialing. 99.99% uptime guaranteed.',
      icon: 'fa-cloud-binary',
      features: ['LCR Optimization', 'Daily Backups', 'Dynamic Firewall', 'Global Termination']
    }
  ];

  return (
    <section className="py-40 bg-slate-50 dark:bg-[#0B0E14] relative overflow-hidden transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">Global Operational Scope</h3>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter dark:text-white leading-none italic">Elite <br /> <span className="text-gradient not-italic">Telephony Services.</span></h2>
            <p className="text-xl text-slate-500 font-medium">From Vicidial clusters to Proautodial neural nodes, we provide the full spectrum of telephony innovation.</p>
          </div>
          <div className="flex gap-4">
             <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 text-center space-y-2">
                <p className="text-3xl font-black text-brand">15+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Years Field Exp</p>
             </div>
             <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 text-center space-y-2">
                <p className="text-3xl font-black text-brand">200+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Strategic Personnel</p>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {services.map((s, i) => (
            <div key={i} className="group p-10 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 text-brand/5 group-hover:text-brand/10 transition-colors duration-700">
                  <i className={`fas ${s.icon} text-[10rem]`}></i>
               </div>
               <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand text-2xl group-hover:bg-brand group-hover:text-white transition-all">
                    <i className={`fas ${s.icon}`}></i>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-3xl font-black dark:text-white">{s.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {s.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-xs font-bold text-slate-400 dark:text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand"></span> {f}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesExpanded;
