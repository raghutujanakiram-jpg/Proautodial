
import React from 'react';

const ExecutiveDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Calls Initiated', value: '142,892', sub: '+12% from yesterday', icon: 'fa-phone-volume', color: 'text-blue-500' },
    { label: 'Leads Qualified (Hot)', value: '8,412', sub: '99.8% Analysis Accuracy', icon: 'fa-fire-flame-curved', color: 'text-brand' },
    { label: 'Active Concurrency', value: '482/1000', sub: 'Tier 1 Carrier Uplink', icon: 'fa-bolt-lightning', color: 'text-amber-500' },
    { label: 'Cost Savings (Est)', value: '$24,102', sub: 'v/s Human Labor Cost', icon: 'fa-circle-dollar-to-slot', color: 'text-emerald-500' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-950 text-white transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter">Strategic Command <span className="text-brand">Center</span></h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Real-time MCSP Performance Monitoring</p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
               <i className="fas fa-download"></i> Export Reports
             </button>
             <button className="px-6 py-3 bg-brand rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-brand/20 transition-all">
               Initialize New Engine
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] hover:border-brand/50 transition-all group">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${s.color} mb-6 transition-transform group-hover:scale-110`}>
                <i className={`fas ${s.icon} text-xl`}></i>
              </div>
              <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">{s.label}</h3>
              <p className="text-4xl font-black tracking-tighter mb-2">{s.value}</p>
              <p className="text-[11px] text-slate-500 font-medium">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Visualization Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-brand/20">
               <i className="fas fa-chart-line text-[12rem] opacity-5"></i>
            </div>
            <div className="relative z-10 space-y-8">
               <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-black">Live Traffic Density</h2>
                 <div className="flex gap-4">
                   <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500"><span className="w-2 h-2 bg-brand rounded-full"></span> Outbound</span>
                   <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Inbound</span>
                 </div>
               </div>
               {/* Mock Chart Placeholder */}
               <div className="h-64 flex items-end gap-2 border-b border-slate-800 pb-2">
                 {[40, 60, 45, 80, 55, 90, 70, 85, 40, 60, 100, 80].map((h, i) => (
                   <div key={i} className="flex-1 bg-brand/10 hover:bg-brand rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
                 ))}
               </div>
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                 <span>08:00 AM</span>
                 <span>12:00 PM</span>
                 <span>04:00 PM</span>
                 <span>08:00 PM</span>
               </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 flex flex-col">
            <h2 className="text-2xl font-black mb-8">ROI Analysis</h2>
            <div className="space-y-8 flex-1">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                 <p className="text-[10px] font-black uppercase text-slate-500">Cost of Human Team (50 Agents)</p>
                 <p className="text-2xl font-black">$62,500 <span className="text-xs text-slate-600">/mo</span></p>
              </div>
              <div className="p-6 bg-brand/10 rounded-2xl border border-brand/20 space-y-3">
                 <p className="text-[10px] font-black uppercase text-brand">ProAutoDial Neural Cost</p>
                 <p className="text-2xl font-black text-brand">$4,820 <span className="text-xs text-brand/60">/mo</span></p>
              </div>
              <div className="pt-6 border-t border-slate-800 flex justify-between items-end">
                 <div>
                   <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Total Monthly Profit Boost</p>
                   <p className="text-4xl font-black text-emerald-500">$57,680</p>
                 </div>
                 <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl">
                   <i className="fas fa-up-long"></i>
                 </div>
              </div>
            </div>
            <button className="mt-10 w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-90 transition-all">
              Optimize Efficiency Settings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExecutiveDashboard;
