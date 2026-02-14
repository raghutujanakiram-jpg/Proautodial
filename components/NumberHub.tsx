
import React, { useState } from 'react';

const NumberHub: React.FC = () => {
  const [provider, setProvider] = useState('Plivo');
  
  const numbers = [
    { phone: '+91 2268095884', region: 'Maharashtra, IN', rate: '₹1497.00 / 3 Months' },
    { phone: '+91 2268095849', region: 'Maharashtra, IN', rate: '₹1497.00 / 3 Months' },
    { phone: '+91 2268095853', region: 'Maharashtra, IN', rate: '₹1497.00 / 3 Months' },
    { phone: '+91 2268095762', region: 'Maharashtra, IN', rate: '₹1497.00 / 3 Months' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-white animate-fade-in">
      <header className="h-24 border-b border-slate-800 flex items-center justify-between px-10">
        <div>
          <h2 className="text-4xl font-black tracking-tighter">Global Dialing Nodes</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tier-1 Telephony Provisioning</p>
        </div>
      </header>

      <main className="p-10 space-y-10">
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Carrier Integration</label>
              <select 
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-6 py-3 text-xs font-bold focus:border-brand outline-none transition-all"
              >
                <option>Plivo</option>
                <option>Twilio</option>
                <option>Vobiz</option>
                <option>Exotel</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Global Endpoint</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-6 py-3 text-xs font-bold focus:border-brand outline-none transition-all">
                <option>India 🇮🇳</option>
                <option>United States 🇺🇸</option>
                <option>UAE 🇦🇪</option>
                <option>Germany 🇩🇪</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">
                  <th className="pb-6 px-4">Node Address</th>
                  <th className="pb-6 px-4">Operational Region</th>
                  <th className="pb-6 px-4">Periodic Rate</th>
                  <th className="pb-6 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                {numbers.map((n, i) => (
                  <tr key={i} className="border-b border-slate-900/50 hover:bg-white/5 transition-all group">
                    <td className="py-6 px-4 font-black">{n.phone}</td>
                    <td className="py-6 px-4 text-slate-400 font-medium">{n.region}</td>
                    <td className="py-6 px-4 text-brand">{n.rate}</td>
                    <td className="py-6 px-4 text-right">
                      <button className="px-6 py-2.5 bg-brand text-white rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-brand/20">Provision Node</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NumberHub;
