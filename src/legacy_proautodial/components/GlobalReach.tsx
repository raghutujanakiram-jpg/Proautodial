
import React from 'react';

const GlobalReach: React.FC = () => {
  const regions = [
    { title: 'Indian Subcontinent', countries: ['Andaman', 'Lakshadweep', 'Nepal', 'Maldives', 'Sri Lanka'], icon: 'fa-earth-asia' },
    { title: 'Islands & Emerging', countries: ['Mauritius', 'Maldives', 'Seychelles'], icon: 'fa-umbrella-beach' },
    { title: 'Eurasia & Balkans', countries: ['Armenia', 'Romania', 'Russia', 'Turkey'], icon: 'fa-earth-europe' },
    { title: 'Global Overlooked', countries: ['South Africa', 'Japan', 'Ireland', 'Middle East (Gulf)'], icon: 'fa-earth-africa' },
  ];

  return (
    <section className="py-40 bg-[#0B0E14] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-brand/10 text-brand font-black text-xs uppercase tracking-[0.3em] border border-brand/20">
              Democratic AI Mission
            </div>
            <h2 className="text-6xl font-black tracking-tighter leading-tight">
              Elite Neural Tech <br />
              <span className="text-gradient">For Every Nation.</span>
            </h2>
            <p className="text-2xl text-slate-400 font-medium leading-relaxed">
              We bridge the digital divide. ProAutoDial is built for the small businesses and overlooked nations that MNCs ignore. 
              <strong> High-performance telephony shouldn't be a luxury.</strong>
            </p>
            <div className="flex gap-10 pt-6">
              <div className="space-y-2">
                <p className="text-4xl font-black">20+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tier-3 Friendly Nodes</p>
              </div>
              <div className="w-px h-16 bg-slate-800"></div>
              <div className="space-y-2">
                <p className="text-4xl font-black">70%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Lower Than MNC Price</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-10 bg-brand/20 rounded-full blur-[100px] opacity-30 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-[3rem] p-12 grid grid-cols-2 gap-8 shadow-2xl">
              {regions.map((r, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
                    <i className={`fas ${r.icon} text-lg`}></i>
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-widest">{r.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {r.countries.map(c => (
                      <span key={c} className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-slate-500 hover:text-white hover:bg-brand/20 transition-all cursor-default">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
