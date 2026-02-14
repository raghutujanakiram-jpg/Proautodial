
import React, { useState } from 'react';

const IntegrationsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'telephony' | 'zapier'>('telephony');

  const telephonyProviders = [
    { name: 'Twilio', icon: 'fa-signal-stream', color: 'text-rose-500', desc: 'Enterprise cloud communications.' },
    { name: 'Plivo', icon: 'fa-phone-office', color: 'text-blue-500', desc: 'Premium voice API for scale.' },
    { name: 'Vobiz', icon: 'fa-network-wired', color: 'text-amber-500', desc: 'Specialized low-latency routing.' },
    { name: 'Razorpay', icon: 'fa-credit-card', color: 'text-blue-600', desc: 'Seamless payments for INR nodes.' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-white animate-fade-in">
      <header className="h-24 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-[60]">
        <div>
          <h2 className="text-4xl font-black tracking-tighter">Integrations</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Synergize Strategic Toolstack</p>
        </div>
        <div className="flex gap-2 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800">
           {['telephony', 'zapier'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-500 hover:text-white'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </header>

      <main className="p-10 space-y-12">
        {activeTab === 'telephony' ? (
          <div className="space-y-8 animate-fade-in">
             <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black">Bring Your Own Telephony</h3>
               <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                 <i className="fas fa-plus"></i> Add New Provider
               </button>
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {telephonyProviders.map((p, i) => (
                 <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] hover:border-brand/40 transition-all group relative overflow-hidden shadow-2xl">
                   <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ${p.color} mb-6 transition-transform group-hover:scale-110`}>
                     <i className={`fas ${p.icon} text-2xl`}></i>
                   </div>
                   <h4 className="text-lg font-black mb-2">{p.name}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{p.desc}</p>
                   <button className="w-full py-3 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:border-brand transition-all">Configure</button>
                 </div>
               ))}
             </div>
          </div>
        ) : (
          <div className="bg-white rounded-[4rem] p-16 text-slate-950 flex flex-col md:flex-row items-center gap-16 animate-fade-in shadow-2xl overflow-hidden relative group">
             <div className="absolute -inset-20 bg-brand/5 opacity-0 group-hover:opacity-100 blur-[100px] transition-all duration-1000"></div>
             <div className="flex-1 space-y-8 relative z-10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Zapier_logo.svg" className="h-10" alt="Zapier" />
                <h3 className="text-5xl font-black tracking-tighter leading-tight">Automate workflows <br /> without writing code.</h3>
                <p className="text-lg text-slate-600 font-medium">Connect ProAutoDial to 6,000+ apps like Google Sheets, Salesforce, and Slack to trigger calls from any event.</p>
                <div className="flex gap-4">
                  <button className="px-10 py-4 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand transition-all shadow-xl">Log In to Zapier</button>
                  <button className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-200 transition-all">Learn More</button>
                </div>
             </div>
             <div className="flex-1 grid gap-4 w-full relative z-10">
                {[
                  { icon: 'fa-sheet-plastic', label: 'Trigger calls from new Sheet rows' },
                  { icon: 'fa-shopify', label: 'Call customers on new Shopify orders' },
                  { icon: 'fa-calendar-days', label: 'Qualify Calendly bookings automatically' }
                ].map((w, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:shadow-2xl transition-all cursor-pointer group/item">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500 border border-slate-100">
                        <i className={`fas ${w.icon} text-xl`}></i>
                     </div>
                     <span className="font-black text-sm uppercase tracking-tight group-hover/item:text-brand transition-colors">{w.label}</span>
                     <i className="fas fa-plus text-[10px] text-slate-300 ml-auto group-hover/item:text-brand"></i>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default IntegrationsHub;
