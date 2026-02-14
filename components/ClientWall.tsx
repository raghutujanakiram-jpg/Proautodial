
import React from 'react';

const ClientWall: React.FC = () => {
  const clients = [
    { name: "Agarwal Packers", focus: "IVR & Dialer Hub" },
    { name: "AplusA IT Services", focus: "International Ops" },
    { name: "Apna Loan Bazaar", focus: "Predictive Dialer" },
    { name: "Best Tax Filer", focus: "USA Support Center" },
    { name: "Career Doctor", focus: "Counseling IVR" },
    { name: "LTW", focus: "Multi-City Routing" },
    { name: "PMC", focus: "Religious NGO Hub" },
    { name: "Square India", focus: "Missed Call API" },
    { name: "Squircle IT", focus: "AU Campaign Ops" },
    { name: "DevForce Labs", focus: "Enterprise IP PBX" },
    { name: "DRS International", focus: "Education Node" },
    { name: "Edify School", focus: "Voice Logging" },
    { name: "Spice FM", focus: "Interactive Voice" },
    { name: "Vegetable Basket", focus: "Supply Chain Comms" },
    { name: "UST Services", focus: "Multi-Service Hub" }
  ];

  return (
    <section className="py-32 bg-white dark:bg-slate-950 overflow-hidden relative border-y border-slate-100 dark:border-slate-900 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 animate-fade-in-up">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">Strategic Implementation Base</h3>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white leading-none">Trusted by <br /><span className="text-gradient">Industry Architects.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
            Powering high-fidelity communications for domestic giants and international corridor leaders.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-1000">
          {clients.map((c, i) => (
            <div key={i} className="group relative flex flex-col items-center text-center space-y-3 hover:scale-110 transition-all duration-500">
               <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] flex items-center justify-center p-6 border border-slate-100 dark:border-slate-800 shadow-sm group-hover:border-brand/40 group-hover:shadow-2xl transition-all">
                  <span className="text-xs md:text-sm font-black text-slate-400 group-hover:text-brand uppercase tracking-tighter leading-tight">{c.name}</span>
               </div>
               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-brand text-white text-[8px] font-black px-3 py-1.5 rounded-full whitespace-nowrap z-10 shadow-xl border border-brand/50">
                  {c.focus}
               </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default ClientWall;
