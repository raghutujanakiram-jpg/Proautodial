
import React from 'react';
import { AppView } from '../types';

interface ServicesProps {
  onNavigate: (view: AppView) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const categories = [
    { title: 'Installation & Setup', icon: 'fa-server', items: ['4-Minute Automated Delivery', 'Zero-Downtime Migration (FREE)', 'Secure Server Configuration', 'Global Infrastructure Tuning'] },
    { title: 'Custom Development', icon: 'fa-code', items: ['White-Labeling & Branding', 'CRM Deep Integration', 'Custom Reporting & Dashboards', 'Third-Party API Bridge'] },
    { title: 'Hosting & Infra', icon: 'fa-cloud', items: ['Managed VICIdial Hosting', 'Cloud-Native Scalability', 'Daily Automated Backups', 'Dynamic Firewall Portal'] },
    { title: 'Support & Ops', icon: 'fa-headset', items: ['24/7 Phone & Skype Support', 'Real-Time Server Monitoring', 'Critical Security Patches', 'Performance Optimization'] }
  ];

  return (
    <div className="pt-40 pb-32 px-6 bg-slate-50 dark:bg-[#0B0E14] animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="max-w-3xl space-y-6">
           <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">Global Operational Scope</h3>
           <h1 className="text-6xl md:text-8xl font-black tracking-tighter dark:text-white leading-none">Engineering <br /> <span className="text-gradient">Excellence.</span></h1>
           <p className="text-xl text-slate-500 font-medium">Comprehensive support for legacy clusters and neural-native nodes.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
           {categories.map(cat => (
             <div key={cat.title} className="p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] space-y-10 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                <div className="w-20 h-20 bg-brand/10 text-brand rounded-[2rem] flex items-center justify-center text-3xl shadow-sm"><i className={`fas ${cat.icon}`}></i></div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-black dark:text-white leading-none">{cat.title}</h3>
                  <div className="grid grid-cols-1 gap-4">
                     {cat.items.map(item => (
                       <div key={item} className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> {item}
                       </div>
                     ))}
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate(AppView.CONTACT)}
                  className="text-brand font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:gap-6 transition-all"
                >
                  Service Details <i className="fas fa-arrow-right"></i>
                </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
